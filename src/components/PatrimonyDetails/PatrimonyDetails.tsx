import { FC } from 'react'

import { IconButton, Modal } from '@mui/material'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import Carousel from 'react-material-ui-carousel'

import Tag, { TagLevel } from '../Tag/Tag'
import Loading from '../Loading/Loading'
import usePageFetch from '../../hooks/usePageFetch'
import { Graphic, PatrimonyDetails } from '../../types/PatrimonyDetails'

import styles from './PatrimonyDetails.module.scss'

interface PatrimonyDetailsProps {
  id: string
  onCloseRequested: () => void
}

type PatrimonyConservationLevel =
  | 'preservado'
  | 'alterado'
  | 'descaracterizado'
  | string

const tagLevelDict: { [key in PatrimonyConservationLevel]: TagLevel } = {
  preservado: 'success',
  alterado: 'warning',
  descaracterizado: 'danger',
}

const PatrimonyDetailsPage: FC<PatrimonyDetailsProps> = ({
  id,
  onCloseRequested,
}) => {
  const { data, isLoading, error } = usePageFetch<PatrimonyDetails>(
    `patrimony/${id}`
  )

  const getImagePairs = (arr: Graphic[]): Array<Array<Graphic>> => {
    const initial: Array<Array<Graphic>> = []
    return arr
      .filter(image => image.image > ' ')
      .reduce((result, _, index, array) => {
        if (index % 2 === 0) result.push(array.slice(index, index + 2))
        return result
      }, initial)
  }

  if (isLoading) return <Loading />

  if (error || !data) return null

  return (
    <Modal open>
      <Box className={styles.modalBox}>
        <div className={styles.header}>
          <h2>Dados do tombamento</h2>
          <IconButton onClick={onCloseRequested}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.PatrimonyDetails}>
          <div className={styles.patrimonyHeading}>
            <img
              src={
                data.data.photographicDocumentation[0]?.image
                  ? data.data.photographicDocumentation[0].image
                  : 'https://via.placeholder.com/152'
              }
              loading="lazy"
              alt="patrimony-main"
              width="150px"
            />
            <div className={styles.patrimonyHeadingDescr}>
              <h2 className={styles.patrimonyName}>
                {data.data.denomination || '--'}
              </h2>
              <div className={styles.patrimonyHeadingMetadata}>
                <div className={styles.item}>
                  <h4>Respons??vel pelo preenchimento</h4>
                  <p>{data.data.createdBy || '--'}</p>
                </div>
                <div className={styles.item}>
                  <h4>Grupo</h4>
                  <p>{data.data.userGroup || '--'}</p>
                </div>
              </div>
              <Tag
                text={data.data.construction.modificationLevel ?? '--'}
                level={
                  tagLevelDict[
                    data.data.construction.modificationLevel.toLowerCase() ?? ''
                  ]
                }
              />
            </div>
          </div>
          <section className={styles.generalData}>
            <h3>Dados Gerais</h3>
            <div>
              <div>
                <h4>Item na resolu????o</h4>
                <p>{data.data.resolutionItem ?? '--'}</p>
              </div>
              <div>
                <h4>Denomina????o</h4>
                <p>{data.data.denomination ?? '--'}</p>
              </div>
              <div>
                <h4>Classifica????o</h4>
                <p>{data.data.classification ?? '--'}</p>
              </div>
              <div>
                <h4>Propriedade</h4>
                <p>{data.data.type ?? '--'}</p>
              </div>
              <div>
                <h4>Uso atual</h4>
                <p>{data.data.currentUsage ?? '--'}</p>
              </div>
              <div>
                <h4>Uso original</h4>
                <p>{data.data.originalUsage ?? '--'}</p>
              </div>
            </div>
          </section>
          <h3>Tombamento</h3>
          {data.data.heritageResolutions.map(resolutionInfo => (
            <section>
              <div className={styles.resolutionItem}>
                <div className={styles.grayBgTitle}>
                  {resolutionInfo.institution}
                </div>
                <div className={styles.resolutionItemDesc}>
                  <div>
                    <h4>Resolu????o</h4>
                    <p>{resolutionInfo.resolution}</p>
                  </div>
                  <div>
                    <h4>Ano do Tombamento</h4>
                    <p>{resolutionInfo.year}</p>
                  </div>
                </div>
              </div>
            </section>
          ))}
          <section className={styles.locationData}>
            <h3>Localiza????o</h3>
            <div className={styles.address}>
              <h4>Endere??o</h4>
              <p>{`${data.data.addressLot.address}, ${data.data.addressLot.number}`}</p>
            </div>
            <div className={styles.addressItens}>
              <div>
                <h4>Tipo</h4>
                <p>{data.data.addressLot.type ?? '--'}</p>
              </div>
              <div>
                <h4>T??tulo</h4>
                <p>{data.data.addressLot.title ?? '--'}</p>
              </div>
              <div>
                <h4>Logradouro</h4>
                <p>{data.data.addressLot.street ?? '--'}</p>
              </div>
              <div>
                <h4>N??mero</h4>
                <p>{data.data.addressLot.number ?? '--'}</p>
              </div>
              <div>
                <h4>Distrito</h4>
                <p>{data.data.addressLot.district ?? '--'}</p>
              </div>
              <div>
                <h4>Prefeitura Regional</h4>
                <p>{data.data.addressLot.regionalHall ?? '--'}</p>
              </div>
              <div>
                <h4>Setor</h4>
                <p>{data.data.addressLot.sector ?? '--'}</p>
              </div>
              <div>
                <h4>Quadra</h4>
                <p>{data.data.addressLot.block ?? '--'}</p>
              </div>
              <div>
                <h4>Lote</h4>
                <p>{data.data.addressLot.lot ?? '--'}</p>
              </div>
            </div>
          </section>
          <section className={styles.technicalData}>
            <h3>Ficha t??cnica</h3>
            <div className={styles.technicalItens}>
              <div>
                <h4>Autor do projeto original</h4>
                <p>{data.data.construction.author || '--'}</p>
              </div>
              <div>
                <h4>Construtor</h4>
                <p>{data.data.construction.constructor || '--'}</p>
              </div>
              <div>
                {data.data.construction.approximateDate ? (
                  <div>
                    <h4>Data de Constru????o (aproximada)</h4>
                    <p>{data.data.construction.constructionYear || '--'}</p>
                  </div>
                ) : (
                  <div>
                    <h4>Data de Constru????o</h4>
                    <p>{data.data.construction.constructionYear || '--'}</p>
                  </div>
                )}
              </div>
              <div>
                <h4>Estilo Arquitet??nico</h4>
                <p>{data.data.construction.architecturalStyle || '--'}</p>
              </div>
              <div>
                <h4>T??cnica Construtiva</h4>
                <p>{data.data.construction.constructiveTechnique || '--'}</p>
              </div>
              <div>
                <h4>N??mero de Pavimentos</h4>
                <p>{data.data.construction.floorQuantity || '--'}</p>
              </div>
              <div>
                <h4>??rea do lote (m2)</h4>
                <p>{data.data.construction.areaLot || '--'}</p>
              </div>
              <div>
                <h4>??rea constru??da(m2)</h4>
                <p>{data.data.construction.constructedArea || '--'}</p>
              </div>
              <div>
                <h4>Grau de tombamento</h4>
                <p>{data.data.construction.heritageLevel || '--'}</p>
              </div>
              <div>
                <h4>Grau de altera????o</h4>
                <p>{data.data.construction.modificationLevel || '--'}</p>
              </div>
              <div>
                <h4>Estado de conserva????o</h4>
                <p>{data.data.construction.conservationLevel || '--'}</p>
              </div>
            </div>
            <div>
              <h4>Coment??rio do Grau de Altera????o</h4>
              <p>{data.data.construction.modificationLevelComment || '--'}</p>
            </div>
            <div>
              <h4>Coment??rio do Estado de Conserva????o</h4>
              <p>{data.data.construction.conservationLevelComment || '--'}</p>
            </div>
            <div>
              <h4>Observa????es (pavimentos)</h4>
              <p>{data.data.construction.floorObservation || '--'}</p>
            </div>
          </section>
          <section className={styles.descriptionData}>
            <h3>Descri????o</h3>
            <div>
              <h4>dados hist??ricos</h4>
              <p>{data.data.description.historicalData || '--'}</p>
            </div>
            <div>
              <h4>dados arquitet??nicos</h4>
              <p>{data.data.description.architecturalData || '--'}</p>
            </div>
            <div>
              <h4>dados de ambi??ncia</h4>
              <p>{data.data.description.ambienceData || '--'}</p>
            </div>
            <div>
              <h4>fontes bibliogr??ficas</h4>
              <p>{data.data.description.bibliographicSource || '--'}</p>
            </div>
            <div>
              <h4>outras informa????es</h4>
              <p>{data.data.description.otherInfo || '--'}</p>
            </div>
            <div>
              <h4>oberva????es</h4>
              <p>{data.data.description.observation || '--'}</p>
            </div>
          </section>
          <section>
            <h3>Documenta????o Gr??fica</h3>
            {data.data.graphic.length > 0 && (
              <Carousel animation="slide">
                {getImagePairs(data.data.graphic).map(pair => (
                  <div className={styles.imageCarouselPair}>
                    {pair.map(image => (
                      <img
                        src={`${image.image}`}
                        alt={image.imageName}
                        loading="lazy"
                      />
                    ))}
                  </div>
                ))}
              </Carousel>
            )}
          </section>
          <section>
            <h3>Documenta????o fotogr??fica</h3>
            {data.data.photographicDocumentation.length > 0 && (
              <Carousel animation="slide">
                {getImagePairs(data.data.photographicDocumentation).map(
                  pair => (
                    <div className={styles.imageCarouselPair}>
                      {pair.map(image => (
                        <img
                          src={`${image.image}`}
                          alt={image.imageName}
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )
                )}
              </Carousel>
            )}
          </section>
        </div>
      </Box>
    </Modal>
  )
}

export default PatrimonyDetailsPage
