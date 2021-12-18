import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import PatrimonyDetails from '../PatrimonyDetails/PatrimonyDetails'
import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'
import Tag, { TagLevel } from '../Tag/Tag'

import styles from './PatrimonyItem.module.scss'

interface PatrimonyItemProps {
  patrimony: PatrimonyGeneral
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

const PatrimonyItem: FC<PatrimonyItemProps> = ({
  patrimony: {
    id,
    modificationLevel,
    denomination,
    type,
    address,
    conservationLevelComment,
    resolutions,
  },
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <PatrimonyDetails id={id} onCloseRequested={() => setOpen(false)} />
      )}
      <li className={styles.PatrimonyItem}>
        <Link
          className={styles.tag}
          data-tooltip="Filtrar por:"
          to={`/patrimonios?modificationLevel=${modificationLevel}`}
        >
          <Tag
            text={modificationLevel}
            level={tagLevelDict[modificationLevel.toLowerCase()]}
          />
        </Link>
        <div>
          <div className={styles.patrimonyHeading}>
            <h2>{denomination}</h2>
            <span className={styles.street}>{address}</span>
          </div>
          <p className={styles.comment}>{conservationLevelComment}</p>
        </div>
        <div className={styles.patrimonyAdditionalInfo}>
          <div>
            <h5>Resolução</h5>
            <span>
              {
                resolutions.find(
                  resolution =>
                    resolution.institution.toLowerCase() === 'conpresp'
                )?.resolution
              }
            </span>
          </div>
          <div>
            <h5>Tipo Imóvel</h5>
            <span>{type}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={styles.seeMore}
        >
          Ver mais
        </button>
      </li>
    </>
  )
}

export default PatrimonyItem
