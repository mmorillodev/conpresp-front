import { MenuItem, Select } from '@mui/material';
import { FC } from 'react';


import { UserGeneral } from '../../types/UserGeneral';
import UserItem from '../UserItem/UserItem';

import styles from './UserList.module.scss'

interface UserListProps {
    users: UserGeneral[],
    data: any
}

let num: number = -3

function count() {
    num += 1
    return num
}

const UserList: FC<UserListProps> = ({ users, data }) => (
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
                <UserItem key={user.id} user={user} count={ count() }/>
            ))}
        </ul>
        <div className={styles.UserFooter}>
            <h4> Itens por página </h4>
            <Select className={styles.Select}
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={data.size}
                label="Age"
            >
                <MenuItem value={data.size} >{data.size}</MenuItem>
                <MenuItem value={data.size + 10}>{data.size + 10}</MenuItem>
                <MenuItem value={data.size + 20}>{data.size + 20}</MenuItem>
            </Select>
            <h4> {data.pageable.pageNumber + 1} - {data.totalPages} de {data.size}</h4>
        </div>
    </div>
)

export default UserList