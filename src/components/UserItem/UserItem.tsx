import type { FC } from 'react'
import { Link } from 'react-router-dom'

import Tag, { TagLevel } from '../Tag/Tag'
import { UserGeneral } from '../../types/UserGeneral'

import styles from './UserItem.module.scss'

interface UserItemProps {
  user: UserGeneral
}

type PatrimonyConservationLevel = 'active' | 'inactive' | string

const tagLevelDict: { [key in PatrimonyConservationLevel]: TagLevel } = {
  active: 'success',
  inactive: 'danger',
}

const UserItem: FC<UserItemProps> = ({
  user: { id, firstName, lastName, email, profile, status },
}) => (
  <div className={styles.ButtonEffect}>
    <Link className={styles.tag} to={`/usuarios/${id}`}>
      <li className={styles.UserItem}>
        <h4> {} </h4>
        <h4> {`${firstName} ${lastName}`} </h4>
        <h4> {email} </h4>
        <h4> {profile} </h4>
        <Link className={styles.tag} to={`/usuarios?status=${status}`}>
          <Tag
            text={status}
            level={tagLevelDict[status.toLowerCase()]}
          />
        </Link>
        <h4> Ícones </h4>
      </li>
      <hr />
    </Link>
  </div>
)

export default UserItem
