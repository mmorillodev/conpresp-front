import { FC } from 'react'

import { UserGeneral } from '../../types/UserGeneral'
import UserItem from '../UserItem/UserItem'
import Paginator from '../Pagination/Pagination'

import styles from './UserList.module.scss'

interface UserListProps {
  users: UserGeneral[]
  data: any
  refetch: () => void
}

const UserList: FC<UserListProps> = ({ users, data, refetch }) => (
  <div className={styles.UserListContainer}>
    <div className={styles.UserHeader}>
      <h4> ID </h4>
      <h4> Nome </h4>
      <h4> Email </h4>
      <h4> Perfil </h4>
      <h4> Status </h4>
      <h4> Ações </h4>
    </div>
    <ul className={styles.UserList}>
      {users.map((user, index) => (
        <UserItem key={user.id} index={index + 1} user={user} refetch={refetch} />
      ))}
    </ul>
    <div className={styles.UserFooter}>
      <Paginator count={data.totalPages} />
    </div>
  </div>
)

export default UserList
