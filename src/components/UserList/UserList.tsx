import type { FC } from 'react';

import { UserGeneral } from '../../types/UserGeneral';
import UserItem from '../UserItem/UserItem';

import styles from './UserList.module.scss'

interface UserListProps {
    users: UserGeneral[],
    size: any
}

const UserList: FC<UserListProps> = ({ users, size }) => (
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
            {users.map(user => (
                <UserItem key={user.id} user={user} />
            ))}
        </ul>
        <div className={styles.UserFooter}>
            <h4> Itens por página: {size}</h4>
        </div>
    </div>
)

export default UserList