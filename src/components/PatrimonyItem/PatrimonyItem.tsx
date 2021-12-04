import type { FC } from 'react'
import { Link } from 'react-router-dom'

import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'

import styles from './PatrimonyItem.module.scss'

interface PatrimonyItemProps {
  patrimony: PatrimonyGeneral
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
    <span className={styles.tag}>{conservationLevel}</span>
    <div>
      <div className={styles.patrimonyHeading}>
        <h2>{denomination}</h2>
        <span className={styles.street}>{addressStreet}</span>
      </div>
      <span className={styles.comment}>{conservationLevelComment}</span>
    </div>
    <Link to={`/patrimonios/${id}`}>Ver mais</Link>
  </li>
)

export default PatrimonyItem
