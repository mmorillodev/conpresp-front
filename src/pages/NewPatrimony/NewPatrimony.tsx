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
        message="O Patrim??nio foi cadastrado com sucesso"
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
          P??gina dedicada exclusivamente para a cria????o dos registros do
          patrim??nio, aqui voc?? pode preencher e adicionar imagens para que o
          bem fique cadastrado no sistema.
        </span>
        <hr />
      </section>
      <form className={styles.patrimonyForm} onSubmit={handleSubmit}>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Respons??vel T??cnico</h2>
            <span>
              Informa????es b??sicas do t??cnico respons??vel pelo preenchimento
            </span>
          </div>
          <label>
            <h4>Respons??vel pelo preenchimento</h4>
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
              <h4>Item na resolu????o</h4>
              <input placeholder="N??mero do bem" name="resolutionItem" />
            </label>
            <label>
              <h4>Denomina????o</h4>
              <input placeholder="Nome do bem" name="denomination" />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Classifica????o</h4>
              <Select name="classification" placeholder="Label">
                <option value="Im??vel"> Im??vel </option>
                <option value="M??vel"> M??vel </option>
                <option value="S??tio Urbano"> S??tio Urbano </option>
                <option value="Natural"> Natural </option>
              </Select>
            </label>
            <label>
              <h4>Propriedade</h4>
              <Select name="type" placeholder="Label">
                <option value="P??blica"> P??blica </option>
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
                <option value="Cemit??rio, Mausol??us e T??mulos">
                  {' '}
                  Cemit??rio, Mausol??us e T??mulos{' '}
                </option>
                <option value="Comercial"> Comercial </option>
                <option value="Cultural"> Cultural </option>
                <option value="Educacional"> Educacional </option>
                <option value="Espa??o P??blico"> Espa??o P??blico </option>
                <option value="Industrial"> Industrial </option>
                <option value="Institui????o de Sa??de">
                  {' '}
                  Institui????o de Sa??de{' '}
                </option>
                <option value="Misto (Comercial e Servi??o)">
                  {' '}
                  Misto (Comercial e Servi??o){' '}
                </option>
                <option value="Monumento e Obras de Arte">
                  {' '}
                  Monumento e Obras de Arte{' '}
                </option>
                <option value="Natural"> Natural </option>
                <option value="Residencial"> Residencial </option>
                <option value="Servi??o"> Servi??o </option>
              </Select>
            </label>
            <label>
              <h4>Uso original</h4>
              <Select name="originalUsage" placeholder="Label">
                <option value="Religioso"> Religioso </option>
                <option value="Cemit??rio, Mausol??us e T??mulos">
                  {' '}
                  Cemit??rio, Mausol??us e T??mulos{' '}
                </option>
                <option value="Comercial"> Comercial </option>
                <option value="Cultural"> Cultural </option>
                <option value="Educacional"> Educacional </option>
                <option value="Espa??o P??blico"> Espa??o P??blico </option>
                <option value="Industrial"> Industrial </option>
                <option value="Institui????o de Sa??de">
                  {' '}
                  Institui????o de Sa??de{' '}
                </option>
                <option value="Misto (Comercial e Servi??o)">
                  {' '}
                  Misto (Comercial e Servi??o){' '}
                </option>
                <option value="Monumento e Obras de Arte">
                  {' '}
                  Monumento e Obras de Arte{' '}
                </option>
                <option value="Natural"> Natural </option>
                <option value="Residencial"> Residencial </option>
                <option value="Servi??o"> Servi??o </option>
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
                <h4>Resolu????o</h4>
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
                <h4>Resolu????o</h4>
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
                <h4>Resolu????o</h4>
                <input name="iphanResolution" placeholder="n?? 253 Ano 1951" />
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
            <h2>Localiza????o</h2>
            <span>
              Preencher os dados de localiza????o do bem, utilizando as
              ferramentas dispon??veis em:{' '}
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
                CADASTRO DE IM??VEIS TOMBADOS
              </a>
            </span>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Tipo</h4>
              <input name="addressType" placeholder="Pra??a" />
            </label>
            <label>
              <h4>T??tulo</h4>
              <input name="addressTitle" placeholder="..." />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label style={{ flex: 3 }}>
              <h4>Logradouro</h4>
              <input name="street" placeholder="Do Patriarca" />
            </label>
            <label>
              <h4>N??mero</h4>
              <input name="number" placeholder="49" />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Distrito</h4>
              <Select name="district" placeholder="Label">
                <option value="Alto de Pinheiros">Alto de Pinheiros</option>
                <option value="Anhanguera">Anhanguera</option>
                <option value="??gua Rasa">??gua Rasa</option>
                <option value="Aricanduva">Aricanduva</option>
                <option value="Artur Alvim">Artur Alvim</option>
                <option value="Barra Funda">Barra Funda</option>
                <option value="Bela Vista">Bela Vista</option>
                <option value="Bel??m">Bel??m</option>
                <option value="Bom Retiro">Bom Retiro</option>
                <option value="Br??s">Br??s</option>
                <option value="Brasil??ndia">Brasil??ndia</option>
                <option value="Butant??">Butant??</option>
                <option value="Cachoeirinha">Cachoeirinha</option>
                <option value="Cambuci">Cambuci</option>
                <option value="Campo Belo">Campo Belo</option>
                <option value="Campo Grande">Campo Grande</option>
                <option value="Campo Limpo">Campo Limpo</option>
                <option value="Canga??ba">Canga??ba</option>
                <option value="Cap??o Redondo">Cap??o Redondo</option>
                <option value="Carr??o">Carr??o</option>
                <option value="Casa Verde">Casa Verde</option>
                <option value="Cidade Ademar">Cidade Ademar</option>
                <option value="Cidade Dutra">Cidade Dutra</option>
                <option value="Cidade L??der">Cidade L??der</option>
                <option value="Cidade Tiradentes">Cidade Tiradentes</option>
                <option value="Consola????o">Consola????o</option>
                <option value="Cursino">Cursino</option>
                <option value="Ermelino Matarazzo">Ermelino Matarazzo</option>
                <option value="Freguesia do ??">Freguesia do ??</option>
                <option value="Graja??">Graja??</option>
                <option value="Guaianases">Guaianases</option>
                <option value="Iguatemi">Iguatemi</option>
                <option value="Ipiranga">Ipiranga</option>
                <option value="Itaim Bibi">Itaim Bibi</option>
                <option value="Itaim Paulista">Itaim Paulista</option>
                <option value="Itaquera">Itaquera</option>
                <option value="Jabaquara">Jabaquara</option>
                <option value="Ja??an??">Ja??an??</option>
                <option value="Jaragu??">Jaragu??</option>
                <option value="Jaguar??">Jaguar??</option>
                <option value="Jaragu??">Jaragu??</option>
                <option value="Jardim ??ngela">Jardim ??ngela</option>
                <option value="Jardim Helena">Jardim Helena</option>
                <option value="Jardim Paulista">Jardim Paulista</option>
                <option value="Jardim S??o Lu??s">Jardim S??o Lu??s</option>
                <option value="Jos?? Bonif??cio">Jos?? Bonif??cio</option>
                <option value="Lajeado">Lajeado</option>
                <option value="Lapa">Lapa</option>
                <option value="Liberdade">Liberdade</option>
                <option value="Lim??o">Lim??o</option>
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
                <option value="Rep??blica">Rep??blica</option>
                <option value="Rio Pequeno"> Rio Pequeno</option>
                <option value="Sacom??">Sacom??</option>
                <option value="Santa Cec??lia">Santa Cec??lia</option>
                <option value="Santana">Santana</option>
                <option value="Santo Amaro">Santo Amaro</option>
                <option value="S??o Domingos">S??o Domingos</option>
                <option value="S??o Lucas">S??o Lucas</option>
                <option value="S??o Mateus">S??o Mateus</option>
                <option value="S??o Miguel">S??o Miguel</option>
                <option value="S??o Rafael">S??o Rafael</option>
                <option value="Sapopemba">Sapopemba</option>
                <option value="Sa??de">Sa??de</option>
                <option value="S??">S??</option>
                <option value="Socorro">Socorro</option>
                <option value="Tatuap??">Tatuap??</option>
                <option value="Trememb??">Trememb??</option>
                <option value="Tucuruvi">Tucuruvi</option>
                <option value="Vila Andrade">Vila Andrade</option>
                <option value="Vila Curu????">Vila Curu????</option>
                <option value="Vila Formosa">Vila Formosa</option>
                <option value="Vila Guilherme">Vila Guilherme</option>
                <option value="Vila Jacu??">Vila Jacu??</option>
                <option value="Vila Leopoldina">Vila Leopoldina</option>
                <option value="Vila Maria">Vila Maria</option>
                <option value="Vila Mariana">Vila Mariana</option>
                <option value="Vila Matilde">Vila Matilde</option>
                <option value="Vila Medeiros">Vila Medeiros</option>
                <option value="Vila Prudente">Vila Prudente</option>
                <option value="Vila S??nia">Vila S??nia</option>
              </Select>
            </label>
            <label>
              <h4>Prefeitura Regional</h4>
              <Select name="regionalHall" placeholder="Label">
                <option value="Aricanduva/Vila Formosa">
                  Aricanduva/Vila Formosa
                </option>
                <option value="Butant??">Butant??</option>
                <option value="Campo Limpo"> Campo Limpo</option>
                <option value="Capela do Socorro">Capela do Socorro</option>
                <option value="Casa Verde">Casa Verde</option>
                <option value="Cidade Ademar">Cidade Ademar</option>
                <option value="Cidade Tiradentes">Cidade Tiradentes</option>
                <option value="Ermelino Matarazzo">Ermelino Matarazzo</option>
                <option value="Freguesia do ??/Brasil??ndia">
                  Freguesia do ??/Brasil??ndia
                </option>
                <option value="Guaianases">Guaianases</option>
                <option value="Ipiranga">Ipiranga</option>
                <option value="Itaim Paulista">Itaim Paulista</option>
                <option value="Itaquera">Itaquera</option>
                <option value="Jabaquara">Jabaquara</option>
                <option value="Ja??an??/Tememb??">Ja??an??/Tememb??</option>
                <option value="Lapa">Lapa</option>
                <option value="M Boi Mirim">M Boi Mirim</option>
                <option value="Mooca">Mooca</option>
                <option value="Parelheiros">Parelheiros</option>
                <option value="Penha">Penha</option>
                <option value="Perus">Perus</option>
                <option value="Pinheiros">Pinheiros</option>
                <option value="Pirituba/Jaragu??">Pirituba/Jaragu??</option>
                <option value="Santana/Tucuruvi">Santana/Tucuruvi</option>
                <option value="Santo Amaro">Santo Amaro</option>
                <option value="S??o Mateus">S??o Mateus</option>
                <option value="S??o Miguel Paulista">S??o Miguel Paulista</option>
                <option value="Sapobemba">Sapobemba</option>
                <option value="S??">S??</option>
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
            <h2>Ficha t??cnica</h2>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Autor do projeto original</h4>
              <input name="author" placeholder="Fi??is An??nimos " />
            </label>
            <label>
              <h4>Construtor</h4>
              <input name="constructor" placeholder="Fi??is An??nimos" />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>Data de constru????o</h4>
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
              <h4>Estilo arquitet??nico</h4>
              <Select name="architecturalStyle" placeholder="Label">
                <option value="Art Deco">Art Deco</option>
                <option value="Art Nouveau">Art Nouveau</option>
                <option value="Bandeirista">Bandeirista</option>
                <option value="Colonial">Colonial</option>
                <option value="Ecl??tico">Ecl??tico</option>
                <option value="Moderno">Moderno</option>
                <option value="Neocl??ssico">Neocl??ssico</option>
                <option value="Neocolonial">Neocolonial</option>
                <option value="Neog??tico">Neog??tico</option>
              </Select>
            </label>
            <label>
              <h4>T??cnica Construtiva</h4>
              <Select name="constructiveTechnique" placeholder="Label">
                <option value="Adobe">Adobe</option>
                <option value="Alvenaria de tijolos">
                  Alvenaria de tijolos
                </option>
                <option value="Concreto armado">Concreto armado</option>
                <option value="Taipa-de-m??o | Pau-a-pique">
                  Taipa-de-m??o | Pau-a-pique
                </option>
                <option value="Taipa-de-pil??o">Taipa-de-pil??o</option>
                <option value="T??cnica Mista">T??cnica Mista</option>
              </Select>
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>N??mero de pavimentos</h4>
              <input name="floorQuantity" placeholder="3" type="number" />
            </label>
            <label>
              <h4>??rea do lote (m2)</h4>
              <input name="areaLot" placeholder="0.00" type="number" />
            </label>
          </div>
          <div className={styles.flexbox}>
            <label>
              <h4>??rea constru??da (m2)</h4>
              <input name="constructedArea" placeholder="0.00" type="number" />
            </label>
            <label>
              <h4>Grau de tombamento</h4>
              <input name="heritageLevel" placeholder="NP-2" />
            </label>
            <label>
              <h4>Grau de altera????o</h4>
              <Select name="modificationLevel" placeholder="Label">
                <option value="Preservado"> Preservado</option>
                <option value="Alterado"> Alterado </option>
                <option value="Descaracterizado"> Descaracterizado</option>
              </Select>
            </label>
          </div>
          <label>
            <h4>Coment??rio do grau de altera????o</h4>
            <textarea
              name="modificationLevelComment"
              placeholder="Al??m da reconstru????o da fachada, em 1899, verifica-se a constru????o de um anexo conjugado no fundo do lote..."
            />
          </label>
          <label>
            <h4>Estado de conserva????o</h4>
            <Select name="conservationLevel" placeholder="Label">
              <option value="Bom">Bom</option>
              <option value="Regular">Regular</option>
              <option value="Ruim">Ruim</option>
            </Select>
          </label>
          <label>
            <h4>Coment??rio do estado de conserva????o</h4>
            <textarea
              name="conservationLevelComment"
              placeholder="A fachada apresenta patologias como desagrega????o da argamassa de revestimento..."
            />
          </label>
          <label>
            <h4>Observa????es (pavimentos)</h4>
            <textarea
              name="floorObservation"
              placeholder="T??rreo, Coro e Torre"
            />
          </label>
        </section>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Descri????o</h2>
          </div>
          <label>
            <h4>Dados hist??ricos</h4>
            <textarea
              name="historicalData"
              placeholder="A Igreja de Santo Ant??nio foi constru??da pelos primeiros povoadores"
            />
          </label>
          <label>
            <h4>Dados arquitet??nicos</h4>
            <textarea
              name="architecturalData"
              placeholder="Inicialmente um ermida de caracter??stica colonial, passou por diversas"
            />
          </label>
          <label>
            <h4>Dados de ambi??ncia</h4>
            <textarea
              name="ambienceData"
              placeholder="FUPAM Situada em meio de quadra na Pra??a do Patriarca"
            />
          </label>
          <label>
            <h4>Fontes bibliogr??ficas</h4>
            <textarea
              name="bibliographicSource"
              placeholder="Base de dados FUPAM/DPH"
            />
          </label>
          <label>
            <h4>Outras informa????es</h4>
            <textarea
              name="otherInfo"
              placeholder="O motivo de seu tombamento se deu principalmente pelo fato da Igreja"
            />
          </label>
          <label>
            <h4>Observa????es</h4>
            <textarea name="observation" placeholder="..." />
          </label>
        </section>
        <section>
          <div className={styles.sectionTitle}>
            <h2>Documenta????o gr??fica</h2>
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
            <h2>Documenta????o fotogr??fica</h2>
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
