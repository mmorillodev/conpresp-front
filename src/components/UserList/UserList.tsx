import type { FC } from 'react';

import { UserGeneral } from '../../types/UserGeneral';
import UserItem from '../UserItem/UserItem';

import styles from './UserList.module.scss'

interface UserListProps {
    users: UserGeneral[]
}

const UserList: FC<UserListProps> = ({ users }) => (
    <ul className={styles.UserList}>
        {users.map(user => (
            <UserItem key={user.id} user={user} />
        ))}
    </ul>
)

export default UserList