import type { FC } from 'react'

import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'
import PatrimonyItem from '../PatrimonyItem/PatrimonyItem'

import styles from './PatrimonyList.module.scss'

interface PatrimonyListProps {
  patrimonies: PatrimonyGeneral[]
}

const PatrimonyList: FC<PatrimonyListProps> = ({ patrimonies }) => (
  <ul className={styles.PatrimonyList}>
    {patrimonies.length <= 0 && <span>Sem resultado</span>}
    {patrimonies.map(patrimony => (
      <PatrimonyItem key={patrimony.id} patrimony={patrimony} />
    ))}
  </ul>
)

export default PatrimonyList
