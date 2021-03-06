import { useMutation, useQuery } from 'react-query'
import { FC, FormEvent, useState } from 'react'
import { Button } from '@mui/material'

import { useHistory } from 'react-router-dom'

import Select from '../../components/Select/Select'
import copyIcon from '../../assets/copy_24px.svg'
import { UserDetails } from '../../types/UserDetails'
import Loading from '../../components/Loading/Loading'
import useSession from '../../hooks/useSession'
import api from '../../apis/default'

import ModalDialog from '../../components/ModalDialog/ModalDialog'

import styles from './NewPatrimony.module.scss'
import { CreatePatrimony, Graphic } from '../../types/CreatePatrimony'

interface Image {
  image: string
  name?: string
}

const NewPatrimony: FC = () => {
  const [photographicDocumentation, setPhotographicDocumentation] = useState<
    Image[]
  >([])
  const [graphicDocumentation, setGraphicDocumentation] = useState<Image[]>([])

  const {
    session: { token, type, isAuthenticated, profile },
  } = useSession()

  const history = useHistory()
  const [dialogSuccess, setDialogSuccess] = useState(false)
  const [errorDialog, setErrorDialog] = useState(false)

  const { isLoading, data } = useQuery(
    'users/user-info',
    () =>
      api.get<UserDetails>('users/user-info', {
        headers: { Authorization: `${type} ${token}` },
      }),
    {
      refetchOnWindowFocus: false,
      refetchInterval: 0,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      retry: false,
      retryOnMount: false,
      retryDelay: 0,
    }
  )
  const { mutate: fireCreatePatrimonyRequest } = useMutation(
    'create patrimony',
    (requestBody: CreatePatrimony) =>
      api
        .post<CreatePatrimony>('/patrimony', requestBody, {
          headers: { Authorization: `${type} ${token}` },
        })
        .then(() => {
          setDialogSuccess(true)
        })
        .catch(() => {
          setErrorDialog(true)
        })
  )
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const {
      currentTarget: { elements },
    } = e

    const requestBody: CreatePatrimony = {
      resolutionItem: (elements.namedItem('resolutionItem') as HTMLInputElement)
        .value,
      denomination: (elements.namedItem('denomination') as HTMLInputElement)
        .value,
      classification: (elements.namedItem('classification') as HTMLInputElement)
        .value,
      currentUsage: (elements.namedItem('currentUsage') as HTMLInputElement)
        .value,
      type: (elements.namedItem('type') as HTMLInputElement).value,
      originalUsage: (elements.namedItem('originalUsage') as HTMLInputElement)
        .value,
      heritageResolutions: [
        {
          resolution: (
            elements.namedItem('conprespResolution') as HTMLInputElement
          ).value,
          institution: 'CONPRESP',
          year: Number(
            (elements.namedItem('conprespResolutionYear') as HTMLInputElement)
              .value
          ),
        },
        {
          resolution: (
            elements.namedItem('condepaatResolution') as HTMLInputElement
          ).value,
          institution: 'CONDEPAAT',
          year: Number(
            (elements.namedItem('condepaatResolutionYear') as HTMLInputElement)
              .value
          ),
        },
        {
          resolution: (
            elements.namedItem('iphanResolution') as HTMLInputElement
          ).value,
          institution: 'IPHAN',
          year: Number(
            (elements.namedItem('iphanResolutionYear') as HTMLInputElement)
              .value
          ),
        },
      ],
      addressLot: {
        type: (elements.namedItem('addressType') as HTMLInputElement).value,
        title: (elements.namedItem('addressTitle') as HTMLInputElement).value,
        street: (elements.namedItem('street') as HTMLInputElement).value,
        number: (elements.namedItem('number') as HTMLInputElement).value,
        district: (elements.namedItem('district') as HTMLInputElement).value,
        regionalHall: (elements.namedItem('regionalHall') as HTMLInputElement)
          .value,
        sector: (elements.namedItem('sector') as HTMLInputElement).value,
        block: (elements.namedItem('block') as HTMLInputElement).value,
        lot: (elements.namedItem('lot') as HTMLInputElement).value,
      },
      construction: {
        author: (elements.namedItem('author') as HTMLInputElement).value,
        constructor: (elements.namedItem('constructor') as HTMLInputElement)
          .value,
        approximateDate: (
          elements.namedItem('approximateDate') as HTMLInputElement
        ).checked,
        constructionYear: (
          elements.namedItem('constructionYear') as HTMLInputElement
        ).value,
        architecturalStyle: (
          elements.namedItem('architecturalStyle') as HTMLInputElement
        ).value,
        constructiveTechnique: (
          elements.namedItem('constructiveTechnique') as HTMLInputElement
        ).value,
        floorQuantity: Number(
          (elements.namedItem('floorQuantity') as HTMLInputElement).value
        ),
        areaLot: Number(
          (elements.namedItem('areaLot') as HTMLInputElement).value
        ),
        constructedArea: Number(
          (elements.namedItem('constructedArea') as HTMLInputElement).value
        ),
        heritageLevel: (elements.namedItem('heritageLevel') as HTMLInputElement)
          .value,
        modificationLevel: (
          elements.namedItem('modificationLevel') as HTMLInputElement
        ).value,
        modificationLevelComment: (
          elements.namedItem('modificationLevelComment') as HTMLInputElement
        ).value,
        conservationLevel: (
          elements.namedItem('conservationLevel') as HTMLInputElement
        ).value,
        conservationLevelComment: (
          elements.namedItem('conservationLevelComment') as HTMLInputElement
        ).value,
        floorObservation: (
          elements.namedItem('floorObservation') as HTMLInputElement
        ).value,
      },
      description: {
        historicalData: (
          elements.namedItem('historicalData') as HTMLInputElement
        ).value,
        architecturalData: (
          elements.namedItem('architecturalData') as HTMLInputElement
        ).value,
        ambienceData: (elements.namedItem('ambienceData') as HTMLInputElement)
          .value,
        bibliographicSource: (
          elements.namedItem('bibliographicSource') as HTMLInputElement
        ).value,
        otherInfo: (elements.namedItem('otherInfo') as HTMLInputElement).value,
        observation: (elements.namedItem('observation') as HTMLInputElement)
          .value,
      },
      graphic: graphicDocumentation.map<Graphic>(image => ({
        image: image.image,
        imageName: image.name ?? '',
      })),
      photographicDocumentation: photographicDocumentation.map<Graphic>(
        image => ({ image: image.image, imageName: image.name ?? '' })
      ),
    }
    fireCreatePatrimonyRequest(requestBody)
  }

  const getBase64Graphic = async (fileList: FileList | null) => {
    if (!fileList) return

    const filesPromises = Array.from(fileList).map<Promise<any>>(
      file =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)

          reader.onload = resolve

          reader.onerror = reject
        })
    )

    const files = await Promise.all(filesPromises)

    setGraphicDocumentation(
      files.map<Image>(file => ({ image: file?.currentTarget?.result }))
    )
  }

  const getBase64Photographic = async (fileList: FileList | null) => {
    if (!fileList) return

    const filesPromises = Array.from(fileList).map<Promise<any>>(
      file =>
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)

          reader.onload = resolve

          reader.onerror = reject
        })
    )

    const files = await Promise.all(filesPromises)

    setPhotographicDocumentation(
      files.map<Image>(file => ({ image: file?.currentTarget?.result }))
    )
  }

  if (!isAuthenticated || profile === 'COMMON') {
    history.push('/login')
  }

  if (isLoading) return <Loading />

  return (
    <>
      <ModalDialog
        open={dialogSuccess}
        messageType="success"
        title="Sucesso."
        message="O Patrimônio foi cadastrado com sucesso"
        buttonMessage="Confirmar"
        onCloseRequest={() => {
          setDialogSuccess(false)
        }}
        closeFunction={() => {}}
        refetch={() => {}}
      />

      <ModalDialog
        open={errorDialog}
        messageType="error"
        title="Erro."
        message="Houve um erro inesperado, por favor verifique os campos e tente novamente."
        buttonMessage="Confirmar"
        onCloseRequest={() => setErrorDialog(false)}
        closeFunction={() => {}}
        refetch={() => {}}
      />

      <section className={styles.mainContent}>
        <h1>Adicionar novo</h1>
        <span className={styles.pageDescr}>
          Página dedicada exclusivamente para a criação dos registros do
          patrimônio, aqui você pode preencher e adicionar imagens para que o
          bem fique cadastrado no sistema.
        </span>
        <hr />
      </section>
      <form className={styles.patrimonyForm} onSubmit={handleSubmit}>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Responsável Técnico</h2>
            <span>
              Informações básicas do técnico responsável pelo preenchimento
            </span>
          </div>
          <label>
            <h4>Responsável pelo preenchimento</h4>
            <input
              disabled
              value={`${data?.data.firstName} ${data?.data.lastName}`}
            />
          </label>
          <label>
            <h4>Grupo</h4>
            <Select disabled>
              <option defaultValue={data?.data.userGroup}>
                {data?.data.userGroup}
              </option>
            </Select>
          </label>
        </section>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Dados Gerais</h2>
            <span>Dados gerais do tombamento</span>
          </div>
          <div className={styles.flexbox}>
            <label style={{ flexBasis: '149px', flexGrow: 0 }}>
              <h4>Item na resolução</h4>
              <input placeholder="Número do bem" name="resolutionItem" />
            </label>
            <label>
              <h4>Denominação</h4>
              <input placeholder="Nome do bem" name="denomination" />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Classificação</h4>
              <Select name="classification" placeholder="Label">
                <option value="Imóvel"> Imóvel </option>
                <option value="Móvel"> Móvel </option>
                <option value="Sítio Urbano"> Sítio Urbano </option>
                <option value="Natural"> Natural </option>
              </Select>
            </label>
            <label>
              <h4>Propriedade</h4>
              <Select name="type" placeholder="Label">
                <option value="Pública"> Pública </option>
                <option value="Particular"> Particular </option>
                <option value="Religiosa"> Religiosa </option>
              </Select>
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Uso atual</h4>
              <Select name="currentUsage" placeholder="Label">
                <option value="Religioso"> Religioso </option>
                <option value="Cemitério, Mausoléus e Túmulos">
                  {' '}
                  Cemitério, Mausoléus e Túmulos{' '}
                </option>
                <option value="Comercial"> Comercial </option>
                <option value="Cultural"> Cultural </option>
                <option value="Educacional"> Educacional </option>
                <option value="Espaço Público"> Espaço Público </option>
                <option value="Industrial"> Industrial </option>
                <option value="Instituição de Saúde">
                  {' '}
                  Instituição de Saúde{' '}
                </option>
                <option value="Misto (Comercial e Serviço)">
                  {' '}
                  Misto (Comercial e Serviço){' '}
                </option>
                <option value="Monumento e Obras de Arte">
                  {' '}
                  Monumento e Obras de Arte{' '}
                </option>
                <option value="Natural"> Natural </option>
                <option value="Residencial"> Residencial </option>
                <option value="Serviço"> Serviço </option>
              </Select>
            </label>
            <label>
              <h4>Uso original</h4>
              <Select name="originalUsage" placeholder="Label">
                <option value="Religioso"> Religioso </option>
                <option value="Cemitério, Mausoléus e Túmulos">
                  {' '}
                  Cemitério, Mausoléus e Túmulos{' '}
                </option>
                <option value="Comercial"> Comercial </option>
                <option value="Cultural"> Cultural </option>
                <option value="Educacional"> Educacional </option>
                <option value="Espaço Público"> Espaço Público </option>
                <option value="Industrial"> Industrial </option>
                <option value="Instituição de Saúde">
                  {' '}
                  Instituição de Saúde{' '}
                </option>
                <option value="Misto (Comercial e Serviço)">
                  {' '}
                  Misto (Comercial e Serviço){' '}
                </option>
                <option value="Monumento e Obras de Arte">
                  {' '}
                  Monumento e Obras de Arte{' '}
                </option>
                <option value="Natural"> Natural </option>
                <option value="Residencial"> Residencial </option>
                <option value="Serviço"> Serviço </option>
              </Select>
            </label>
          </div>
        </section>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Tombamento</h2>
            <span>Dados gerais do tombamento</span>
          </div>
          <div className={styles.resolutionItem}>
            <div className={styles.grayBgTitle}>Conpresp</div>
            <div className={styles.resolutionItemDesc}>
              <div style={{ flex: 3 }}>
                <h4>Resolução</h4>
                <input name="conprespResolution" placeholder="05/91" />
              </div>
              <div>
                <h4>Ano do Tombamento</h4>
                <input
                  name="conprespResolutionYear"
                  placeholder="0000"
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className={styles.resolutionItem}>
            <div className={styles.grayBgTitle}>Condepaat</div>
            <div className={styles.resolutionItemDesc}>
              <div style={{ flex: 3 }}>
                <h4>Resolução</h4>
                <input
                  name="condepaatResolution"
                  placeholder="RES. SC SN/70 ou RES. SC 67/82"
                />
              </div>
              <div>
                <h4>Ano do Tombamento</h4>

                <input
                  name="condepaatResolutionYear"
                  placeholder="0000"
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className={styles.resolutionItem}>
            <div className={styles.grayBgTitle}>Iphan</div>
            <div className={styles.resolutionItemDesc}>
              <div style={{ flex: 3 }}>
                <h4>Resolução</h4>
                <input name="iphanResolution" placeholder="nº 253 Ano 1951" />
              </div>
              <div>
                <h4>Ano do Tombamento</h4>
                <input
                  name="iphanResolutionYear"
                  placeholder="0000"
                  type="number"
                />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Localização</h2>
            <span>
              Preencher os dados de localização do bem, utilizando as
              ferramentas disponíveis em:{' '}
              <a
                href="http://geosampa.prefeitura.sp.gov.br/PaginasPublicas/_SBC.aspx"
                target="_blank"
                rel="noreferrer"
              >
                GEOSAMPA
              </a>{' '}
              e{' '}
              <a
                href="http://www3.prefeitura.sp.gov.br/cit/Forms/frmPesquisaGeral.aspx"
                target="_blank"
                rel="noreferrer"
              >
                CADASTRO DE IMÓVEIS TOMBADOS
              </a>
            </span>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Tipo</h4>
              <input name="addressType" placeholder="Praça" />
            </label>
            <label>
              <h4>Título</h4>
              <input name="addressTitle" placeholder="..." />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label style={{ flex: 3 }}>
              <h4>Logradouro</h4>
              <input name="street" placeholder="Do Patriarca" />
            </label>
            <label>
              <h4>Número</h4>
              <input name="number" placeholder="49" />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Distrito</h4>
              <Select name="district" placeholder="Label">
                <option value="Alto de Pinheiros">Alto de Pinheiros</option>
                <option value="Anhanguera">Anhanguera</option>
                <option value="Água Rasa">Água Rasa</option>
                <option value="Aricanduva">Aricanduva</option>
                <option value="Artur Alvim">Artur Alvim</option>
                <option value="Barra Funda">Barra Funda</option>
                <option value="Bela Vista">Bela Vista</option>
                <option value="Belém">Belém</option>
                <option value="Bom Retiro">Bom Retiro</option>
                <option value="Brás">Brás</option>
                <option value="Brasilândia">Brasilândia</option>
                <option value="Butantã">Butantã</option>
                <option value="Cachoeirinha">Cachoeirinha</option>
                <option value="Cambuci">Cambuci</option>
                <option value="Campo Belo">Campo Belo</option>
                <option value="Campo Grande">Campo Grande</option>
                <option value="Campo Limpo">Campo Limpo</option>
                <option value="Cangaíba">Cangaíba</option>
                <option value="Capão Redondo">Capão Redondo</option>
                <option value="Carrão">Carrão</option>
                <option value="Casa Verde">Casa Verde</option>
                <option value="Cidade Ademar">Cidade Ademar</option>
                <option value="Cidade Dutra">Cidade Dutra</option>
                <option value="Cidade Líder">Cidade Líder</option>
                <option value="Cidade Tiradentes">Cidade Tiradentes</option>
                <option value="Consolação">Consolação</option>
                <option value="Cursino">Cursino</option>
                <option value="Ermelino Matarazzo">Ermelino Matarazzo</option>
                <option value="Freguesia do Ó">Freguesia do Ó</option>
                <option value="Grajaú">Grajaú</option>
                <option value="Guaianases">Guaianases</option>
                <option value="Iguatemi">Iguatemi</option>
                <option value="Ipiranga">Ipiranga</option>
                <option value="Itaim Bibi">Itaim Bibi</option>
                <option value="Itaim Paulista">Itaim Paulista</option>
                <option value="Itaquera">Itaquera</option>
                <option value="Jabaquara">Jabaquara</option>
                <option value="Jaçanã">Jaçanã</option>
                <option value="Jaraguá">Jaraguá</option>
                <option value="Jaguaré">Jaguaré</option>
                <option value="Jaraguá">Jaraguá</option>
                <option value="Jardim Ângela">Jardim Ângela</option>
                <option value="Jardim Helena">Jardim Helena</option>
                <option value="Jardim Paulista">Jardim Paulista</option>
                <option value="Jardim São Luís">Jardim São Luís</option>
                <option value="José Bonifácio">José Bonifácio</option>
                <option value="Lajeado">Lajeado</option>
                <option value="Lapa">Lapa</option>
                <option value="Liberdade">Liberdade</option>
                <option value="Limão">Limão</option>
                <option value="Mandaqui">Mandaqui</option>
                <option value="Marsilac">Marsilac</option>
                <option value="Moema">Moema</option>
                <option value="Mooca">Mooca</option>
                <option value="Morumbi">Morumbi</option>
                <option value="Parelheiros">Parelheiros</option>
                <option value="Pari">Pari</option>
                <option value="Parque do Carmo">Parque do Carmo</option>
                <option value="Pedreira">Pedreira</option>
                <option value="Penha">Penha</option>
                <option value="Perdizes">Perdizes</option>
                <option value="Perus">Perus</option>
                <option value="Pinheiros">Pinheiros</option>
                <option value="Pirituba">Pirituba</option>
                <option value="Ponte Rasa">Ponte Rasa</option>
                <option value="Raposo Tavares">Raposo Tavares</option>
                <option value="República">República</option>
                <option value="Rio Pequeno"> Rio Pequeno</option>
                <option value="Sacomã">Sacomã</option>
                <option value="Santa Cecília">Santa Cecília</option>
                <option value="Santana">Santana</option>
                <option value="Santo Amaro">Santo Amaro</option>
                <option value="São Domingos">São Domingos</option>
                <option value="São Lucas">São Lucas</option>
                <option value="São Mateus">São Mateus</option>
                <option value="São Miguel">São Miguel</option>
                <option value="São Rafael">São Rafael</option>
                <option value="Sapopemba">Sapopemba</option>
                <option value="Saúde">Saúde</option>
                <option value="Sé">Sé</option>
                <option value="Socorro">Socorro</option>
                <option value="Tatuapé">Tatuapé</option>
                <option value="Tremembé">Tremembé</option>
                <option value="Tucuruvi">Tucuruvi</option>
                <option value="Vila Andrade">Vila Andrade</option>
                <option value="Vila Curuçá">Vila Curuçá</option>
                <option value="Vila Formosa">Vila Formosa</option>
                <option value="Vila Guilherme">Vila Guilherme</option>
                <option value="Vila Jacuí">Vila Jacuí</option>
                <option value="Vila Leopoldina">Vila Leopoldina</option>
                <option value="Vila Maria">Vila Maria</option>
                <option value="Vila Mariana">Vila Mariana</option>
                <option value="Vila Matilde">Vila Matilde</option>
                <option value="Vila Medeiros">Vila Medeiros</option>
                <option value="Vila Prudente">Vila Prudente</option>
                <option value="Vila Sônia">Vila Sônia</option>
              </Select>
            </label>
            <label>
              <h4>Prefeitura Regional</h4>
              <Select name="regionalHall" placeholder="Label">
                <option value="Aricanduva/Vila Formosa">
                  Aricanduva/Vila Formosa
                </option>
                <option value="Butantã">Butantã</option>
                <option value="Campo Limpo"> Campo Limpo</option>
                <option value="Capela do Socorro">Capela do Socorro</option>
                <option value="Casa Verde">Casa Verde</option>
                <option value="Cidade Ademar">Cidade Ademar</option>
                <option value="Cidade Tiradentes">Cidade Tiradentes</option>
                <option value="Ermelino Matarazzo">Ermelino Matarazzo</option>
                <option value="Freguesia do Ó/Brasilândia">
                  Freguesia do Ó/Brasilândia
                </option>
                <option value="Guaianases">Guaianases</option>
                <option value="Ipiranga">Ipiranga</option>
                <option value="Itaim Paulista">Itaim Paulista</option>
                <option value="Itaquera">Itaquera</option>
                <option value="Jabaquara">Jabaquara</option>
                <option value="Jaçanã/Temembé">Jaçanã/Temembé</option>
                <option value="Lapa">Lapa</option>
                <option value="M Boi Mirim">M Boi Mirim</option>
                <option value="Mooca">Mooca</option>
                <option value="Parelheiros">Parelheiros</option>
                <option value="Penha">Penha</option>
                <option value="Perus">Perus</option>
                <option value="Pinheiros">Pinheiros</option>
                <option value="Pirituba/Jaraguá">Pirituba/Jaraguá</option>
                <option value="Santana/Tucuruvi">Santana/Tucuruvi</option>
                <option value="Santo Amaro">Santo Amaro</option>
                <option value="São Mateus">São Mateus</option>
                <option value="São Miguel Paulista">São Miguel Paulista</option>
                <option value="Sapobemba">Sapobemba</option>
                <option value="Sé">Sé</option>
                <option value="Vila Maria/Vila Guilherme">
                  Vila Maria/Vila Guilherme
                </option>
                <option value="Vila Mariana">Vila Mariana</option>
                <option value="Vila Prudente">Vila Prudente</option>
              </Select>
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Setor</h4>
              <input name="sector" placeholder="0" />
            </label>
            <label>
              <h4>Quadra</h4>
              <input name="block" placeholder="0" />
            </label>
            <label>
              <h4>Lote</h4>
              <input name="lot" placeholder="0" />
            </label>
          </div>
        </section>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Ficha técnica</h2>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Autor do projeto original</h4>
              <input name="author" placeholder="Fiéis Anônimos " />
            </label>
            <label>
              <h4>Construtor</h4>
              <input name="constructor" placeholder="Fiéis Anônimos" />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Data de construção</h4>
              <label className={styles.radioSet}>
                <input type="checkbox" name="approximateDate" />
                <span> Data aproximada?</span>
              </label>
            </label>
            <label>
              <h4>&nbsp;</h4>
              <input type="number" placeholder="1590" name="constructionYear" />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Estilo arquitetônico</h4>
              <Select name="architecturalStyle" placeholder="Label">
                <option value="Art Deco">Art Deco</option>
                <option value="Art Nouveau">Art Nouveau</option>
                <option value="Bandeirista">Bandeirista</option>
                <option value="Colonial">Colonial</option>
                <option value="Eclético">Eclético</option>
                <option value="Moderno">Moderno</option>
                <option value="Neoclássico">Neoclássico</option>
                <option value="Neocolonial">Neocolonial</option>
                <option value="Neogótico">Neogótico</option>
              </Select>
            </label>
            <label>
              <h4>Técnica Construtiva</h4>
              <Select name="constructiveTechnique" placeholder="Label">
                <option value="Adobe">Adobe</option>
                <option value="Alvenaria de tijolos">
                  Alvenaria de tijolos
                </option>
                <option value="Concreto armado">Concreto armado</option>
                <option value="Taipa-de-mão | Pau-a-pique">
                  Taipa-de-mão | Pau-a-pique
                </option>
                <option value="Taipa-de-pilão">Taipa-de-pilão</option>
                <option value="Técnica Mista">Técnica Mista</option>
              </Select>
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Número de pavimentos</h4>
              <input name="floorQuantity" placeholder="3" type="number" />
            </label>
            <label>
              <h4>Área do lote (m2)</h4>
              <input name="areaLot" placeholder="0.00" type="number" />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Área construída (m2)</h4>
              <input name="constructedArea" placeholder="0.00" type="number" />
            </label>
            <label>
              <h4>Grau de tombamento</h4>
              <input name="heritageLevel" placeholder="NP-2" />
            </label>
            <label>
              <h4>Grau de alteração</h4>
              <Select name="modificationLevel" placeholder="Label">
                <option value="Preservado"> Preservado</option>
                <option value="Alterado"> Alterado </option>
                <option value="Descaracterizado"> Descaracterizado</option>
              </Select>
            </label>
          </div>
          <label>
            <h4>Comentário do grau de alteração</h4>
            <textarea
              name="modificationLevelComment"
              placeholder="Além da reconstrução da fachada, em 1899, verifica-se a construção de um anexo conjugado no fundo do lote..."
            />
          </label>
          <label>
            <h4>Estado de conservação</h4>
            <Select name="conservationLevel" placeholder="Label">
              <option value="Bom">Bom</option>
              <option value="Regular">Regular</option>
              <option value="Ruim">Ruim</option>
            </Select>
          </label>
          <label>
            <h4>Comentário do estado de conservação</h4>
            <textarea
              name="conservationLevelComment"
              placeholder="A fachada apresenta patologias como desagregação da argamassa de revestimento..."
            />
          </label>
          <label>
            <h4>Observações (pavimentos)</h4>
            <textarea
              name="floorObservation"
              placeholder="Térreo, Coro e Torre"
            />
          </label>
        </section>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Descrição</h2>
          </div>
          <label>
            <h4>Dados históricos</h4>
            <textarea
              name="historicalData"
              placeholder="A Igreja de Santo Antônio foi construída pelos primeiros povoadores"
            />
          </label>
          <label>
            <h4>Dados arquitetônicos</h4>
            <textarea
              name="architecturalData"
              placeholder="Inicialmente um ermida de característica colonial, passou por diversas"
            />
          </label>
          <label>
            <h4>Dados de ambiência</h4>
            <textarea
              name="ambienceData"
              placeholder="FUPAM Situada em meio de quadra na Praça do Patriarca"
            />
          </label>
          <label>
            <h4>Fontes bibliográficas</h4>
            <textarea
              name="bibliographicSource"
              placeholder="Base de dados FUPAM/DPH"
            />
          </label>
          <label>
            <h4>Outras informações</h4>
            <textarea
              name="otherInfo"
              placeholder="O motivo de seu tombamento se deu principalmente pelo fato da Igreja"
            />
          </label>
          <label>
            <h4>Observações</h4>
            <textarea name="observation" placeholder="..." />
          </label>
        </section>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Documentação gráfica</h2>
          </div>
          {graphicDocumentation.length > 0 ? (
            <div className={styles.insertedImageWrapper}>
              {graphicDocumentation.map((image, index) => (
                <img
                  key={index}
                  src={image.image}
                  alt="inserted"
                  className={styles.insertedImage}
                />
              ))}
            </div>
          ) : (
            <label className={styles.inputFile}>
              <input
                name="graphicDocumentation"
                type="file"
                accept="image/*"
                multiple
                onChange={e => getBase64Graphic(e.target.files)}
              />
              <img src={copyIcon} alt="File icon" />
              <span className={styles.fileDesc}>
                Clique aqui para selecionar suas fotos
              </span>
            </label>
          )}
        </section>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Documentação fotográfica</h2>
          </div>
          {photographicDocumentation.length > 0 ? (
            <div className={styles.insertedImageWrapper}>
              {photographicDocumentation.map((image, index) => (
                <img
                  key={index}
                  src={image.image}
                  alt="inserted"
                  className={styles.insertedImage}
                />
              ))}
            </div>
          ) : (
            <label className={styles.inputFile}>
              <input
                name="photographicDocumentation"
                type="file"
                accept="image/*"
                multiple
                onChange={e => getBase64Photographic(e.target.files)}
              />
              <img src={copyIcon} alt="File icon" />
              <span className={styles.fileDesc}>
                Clique aqui para selecionar suas fotos
              </span>
            </label>
          )}
        </section>
        <div className={styles.foatingButtonBar}>
          <Button
            type="button"
            variant="outlined"
            sx={{ borderColor: '#1DA6D1', color: '#1DA6D1', width: '148px' }}
            onClick={() => {
              history.push('/patrimonios-admin')
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: '#1DA6D1', width: '148px' }}
          >
            Salvar
          </Button>
        </div>
      </form>
    </>
  )
}

export default NewPatrimony
