import type { FC } from 'react'
import { Link } from 'react-router-dom'

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
    conservationLevel,
    denomination,
    addressStreet,
    conservationLevelComment,
  },
}) => (
  <li className={styles.PatrimonyItem}>
    <Link
      className={styles.tag}
      to={`/patrimonios?conservationLevel=${conservationLevel}`}
    >
      <Tag
        text={conservationLevel}
        level={tagLevelDict[conservationLevel.toLowerCase()]}
      />
    </Link>
    <div>
      <div className={styles.patrimonyHeading}>
        <h2>{denomination}</h2>
        <span className={styles.street}>{addressStreet}</span>
      </div>
      <span className={styles.comment}>{conservationLevelComment}</span>
    </div>
    <Link to={`/patrimonios/${id}`} className={styles.seeMore}>
      Ver mais
    </Link>
  </li>
)

export default PatrimonyItem
