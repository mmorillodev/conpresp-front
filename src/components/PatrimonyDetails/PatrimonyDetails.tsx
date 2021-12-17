import { FC } from 'react'

import { IconButton, Modal } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'

import Tag from '../Tag/Tag'
import usePageFetch from '../../hooks/usePageFetch'
import { PatrimonyDetails } from '../../types/PatrimonyDetails'

import styles from './PatrimonyDetails.module.scss'

interface PatrimonyDetailsProps {
  id: string
  open: boolean
  onCloseRequested: () => void
}

const PatrimonyDetailsPage: FC<PatrimonyDetailsProps> = ({
  id,
  open,
  onCloseRequested,
}) => {
  const { data, isLoading } = usePageFetch<PatrimonyDetails>(`patrimony/${id}`)

  console.log(data?.data)

  if (isLoading) <p>Carregando...</p>

  return (
    <Modal open={open}>
      <Box className={styles.modalBox}>
        <div className={styles.header}>
          <h2>Dados do tombamento</h2>
          <IconButton onClick={onCloseRequested}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.PatrimonyDetails}>
          <div className={styles.patrimonyHeading}>
            <img src="https://via.placeholder.com/152" alt="patrimony-main" />
            <div className={styles.patrimonyHeadingDescr}>
              <h2 className={styles.patrimonyName}>
                Laboratório de Preservação do Patrimônio Cultural
              </h2>
              <div className={styles.patrimonyHeadingMetadata}>
                <div className={styles.item}>
                  <h4>Responsável pelo preenchimento</h4>
                  <p>Gary Rubio Fernandez</p>
                </div>
                <div className={styles.item}>
                  <h4>Grupo</h4>
                  <p>Equipe UAM</p>
                </div>
              </div>
              <Tag text="Preservado" level="success" />
            </div>
          </div>
          <section className={styles.generalData}>
            <h3>Dados Gerais</h3>
            <div>
              <div>
                <h4>Item na resolução</h4>
                <p>02</p>
              </div>
              <div>
                <h4>Denominação</h4>
                <p>Equipe UAM</p>
              </div>
              <div>
                <h4>Classificação</h4>
                <p>Equipe UAM</p>
              </div>
              <div>
                <h4>Propriedade</h4>
                <p>Equipe UAM</p>
              </div>
              <div>
                <h4>Uso atual</h4>
                <p>Religioso</p>
              </div>
              <div>
                <h4>Uso original</h4>
                <p>Religioso</p>
              </div>
            </div>
          </section>
          <section>
            <h3>Tombamento</h3>
            {/* react for */}
            <div className={styles.resolutionItem}>
              <div className={styles.grayBgTitle}>CONPRESP</div>
              <div className={styles.resolutionItemDesc}>
                <div>
                  <h4>Resolução</h4>
                  <p>02</p>
                </div>
                <div>
                  <h4>Ano do tombamento</h4>
                  <p>0</p>
                </div>
              </div>
            </div>
            <div className={styles.resolutionItem}>
              <div className={styles.grayBgTitle}>CONDEPHAAT</div>
              <div className={styles.resolutionItemDesc}>
                <div>
                  <h4>Resolução</h4>
                  <p>Res. SC SN/70 de 9/4/70</p>
                </div>
                <div>
                  <h4>Ano do tombamento</h4>
                  <p>0</p>
                </div>
              </div>
            </div>
            <div className={styles.resolutionItem}>
              <div className={styles.grayBgTitle}>IPHAN</div>
              <div className={styles.resolutionItemDesc}>
                <div>
                  <h4>Resolução</h4>
                  <p>Res. SC SN/70 de 9/4/70</p>
                </div>
                <div>
                  <h4>Ano do tombamento</h4>
                  <p>0</p>
                </div>
              </div>
            </div>
            {/* end react for */}
          </section>
          <section className={styles.locationData}>
            <h3>Localização</h3>
            <div className={styles.grayBgTitle}>Título</div>
            <div className={styles.address}>
              <h4>Endereço</h4>
              <p>Praca do Patriarca, 49 - Sé, Sé</p>
            </div>
            <div className={styles.addressItens}>
              <div>
                <h4>Setor</h4>
                <p>5</p>
              </div>
              <div>
                <h4>Quadra</h4>
                <p>3</p>
              </div>
              <div>
                <h4>Lote</h4>
                <p>3</p>
              </div>
            </div>
          </section>
          <section className={styles.technicalData}>
            <h3>Ficha técnica</h3>
            <div className={styles.technicalItens}>
              <div>
                <h4>Autor do projeto original</h4>
                <p>Fiéis Anônimos</p>
              </div>
              <div>
                <h4>Construtor</h4>
                <p>Fiéis Anônimos</p>
              </div>
              <div>
                <h4>Data de Construção (aproximada)</h4>
                <p>1590</p>
              </div>
              <div>
                <h4>Estilo Arquitetônico</h4>
                <p>––</p>
              </div>
              <div>
                <h4>Técnica Construtiva</h4>
                <p>Alvenaria de Tijolos</p>
              </div>
              <div>
                <h4>Número de Pavimentos</h4>
                <p>03</p>
              </div>
              <div>
                <h4>Área do lote (m2)</h4>
                <p>0.00</p>
              </div>
              <div>
                <h4>área construída(m2)</h4>
                <p>0.00</p>
              </div>
              <div>
                <h4>Grau de tombamento</h4>
                <p>NP-2</p>
              </div>
              <div>
                <h4>Grau de alteração</h4>
                <p>Alterado</p>
              </div>
              <div>
                <h4>Estado de conservação</h4>
                <p>Regular</p>
              </div>
            </div>
          </section>
          <section className={styles.descriptionData}>
            <h3>Descrição</h3>
            <div>
              <h4>dados históricos</h4>
              <p>
                Nisl gravida cursus sed id quam dictum. Morbi nunc ipsum in
                facilisis aenean sapien facilisi amet. Nulla nunc, ultrices
                proin cursus sed sed. Netus enim risus quisque sagittis montes,
                bibendum augue egestas purus. Ac et augue maecenas tempor nisl
                mauris.
              </p>
            </div>
            <div>
              <h4>dados arquitetônicos</h4>
              <p>
                Aliquet malesuada ligula in sed lectus et vel egestas
                adipiscing. Bibendum tempor nisl porttitor duis et metus,
                facilisis congue. Ornare nibh neque vitae praesent ornare
                ultricies malesuada imperdiet. Tortor habitasse egestas nascetur
                faucibus vel. Iaculis orci lobortis at sed tempor velit. Ante
                morbi aliquet sit hendrerit suscipit eros, mollis dolor. Nulla
                arcu, urna a sollicitudin. Nullam sed amet ut vel vitae feugiat.
              </p>
            </div>
            <div>
              <h4>dados de ambiência</h4>
              <p>
                Egestas sapien molestie tincidunt magna facilisis. Diam erat
                posuere eget enim tortor. Tempor consequat sed amet dolor
                aliquam lacus. Mattis facilisis dui quisque ac donec pharetra
                auctor turpis
              </p>
            </div>
            <div>
              <h4>fontes bibliográficas</h4>
              <p>
                Penatibus ornare non amet aenean dignissim augue id dui sed.
                Elit, eu purus cras nunc sed velit proin ac arcu. Bibendum
                tortor, aliquam netus fames pulvinar ornare. Varius amet,
                habitant amet egestas vel. Enim, a nulla cras lectus gravida
                cursus nulla aliquam. Integer sed amet, faucibus leo. Adipiscing{' '}
              </p>
            </div>
            <div>
              <h4>outras informações</h4>
              <p>
                Suspendisse nunc sed tellus dictum egestas vitae mauris turpis
                aenean. Netus nulla euismod vitae, vel neque, in egestas amet.
                Turpis nullam egestas eu malesuada ut. Adipiscing rutrum eros,
                in nunc pellentesque laoreet mauris lectus diam. Mi laoreet eget
                praesent mi elit felis turpis ultricies. Iaculis diam vitae
                vitae fringilla sapien vitae tincidunt nec pharetra. In interdum
                sed vitae aliquam arcu lectus.
              </p>
            </div>
            <div>
              <h4>obervações</h4>
              <p>Térreo, Coro e Torre</p>
            </div>
          </section>
          <section>
            <h3>Documentação Gráfica</h3>
          </section>
          <section>
            <h3>Documentação fotográfica</h3>
          </section>
        </div>
      </Box>
    </Modal>
  )
}

export default PatrimonyDetailsPage
