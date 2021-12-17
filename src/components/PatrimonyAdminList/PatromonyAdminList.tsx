import { FC } from 'react'

import PatrimonyAdminItem from '../PatrimonyAdminItem/PatrimonyAdminItem'
import Paginator from '../Pagination/Pagination'

import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'

import styles from './PatrimonyAdminList.module.scss'

interface PatromonyListProps {
  patrimony: PatrimonyGeneral[]
  data: any
  refetch: () => void
}

const PatromonyAdminList: FC<PatromonyListProps> = ({ patrimony, refetch, data }) => (
  <div className={styles.UserListContainer}>
    <div className={styles.UserHeader}>
      <h4> ID </h4>
      <h4> Resolução </h4>
      <h4> Denominação </h4>
      <h4> Estado de Conservação </h4>
      <h4> Tipo de Imóvel </h4>
      <h4> Ações </h4>
    </div>
    <ul className={styles.UserList}>
      {patrimony.map(patrimonyItem => (
        <PatrimonyAdminItem
          key={patrimonyItem.id}
          patrimony={patrimonyItem}
          refetch={refetch}
        />
      ))}
    </ul>
    <div className={styles.UserFooter}>
      <Paginator count={data.totalPages} />
    </div>
  </div>
)

export default PatromonyAdminList
