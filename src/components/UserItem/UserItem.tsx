import type { FC } from 'react';
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

import Tag from '../Tag/Tag'


import { UserGeneral } from '../../types/UserGeneral'

import styles from './UserItem.module.scss'


interface UserItemProps {
    user: UserGeneral
}


const UserItem: FC<UserItemProps> = ({
    user: {
        id,
        firstName,
        lastName,
        email,
        profile,
        status
    },
}) => (
    <div>
        <li className={styles.UserItem}>
            <h4> { } </h4>
            <h4> {firstName + lastName} </h4>
            <h4> {email} </h4>
            <h4> {profile} </h4>
            <Link
                className={styles.tag}
                to={`/users?status=${status}`}
            >
                <Tag text={status} />
            </Link>
            <h4> Ícones </h4>
        </li>
        <hr />
    </div>
)

export default UserItem