import type { FC } from 'react'
import { Link } from 'react-router-dom'

import React, { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import Tag, { TagLevel } from '../Tag/Tag'
import { UserGeneral, UserDetails } from '../../types/UserGeneral'

import api from '../../apis/default'
import { PageableResponse } from '../../types/PageableResponse'

import styles from './UserItem.module.scss'

interface UserItemProps {
  user: UserGeneral
  token: string
  userId: (id: string) => void
  openUpdateModal: (isOpen: boolean) => void
  openDeleteDialog: (isOpen: boolean) => void
}

type PatrimonyConservationLevel = 'active' | 'inactive' | string

const tagLevelDict: { [key in PatrimonyConservationLevel]: TagLevel } = {
  active: 'success',
  inactive: 'danger',
}

const UserItem: FC<UserItemProps> = ({
  user: { id, firstName, lastName, email, profile, status },
  token,
  openUpdateModal,
  openDeleteDialog,
  userId,
}) => {
  async function deleteUser() {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    api
      .delete(`/users/${id}`, axiosConfig)
      .then(response => {})
      .catch(({ response }) => {})
  }

  return (
    <div>
      <div className={styles.ButtonEffect}>
        <Link className={styles.tag} to="/usuarios">
          <li className={styles.UserItem}>
            <h4> </h4>
            <h4> {`${firstName} ${lastName}`} </h4>
            <h4> {email} </h4>
            <h4> {profile} </h4>
            <Link className={styles.tag} to={`/usuarios?status=${status}`}>
              <Tag text={status} level={tagLevelDict[status.toLowerCase()]} />
            </Link>
            <div>
              <IconButton
                className={styles.IconButton}
                onClick={() => {
                  userId(id)
                  openUpdateModal(true)
                }}
              >
                <BorderColorIcon sx={{ color: '#1976d2' }} />
              </IconButton>
              <IconButton
                className={styles.IconButton}
                onClick={() => {
                  openDeleteDialog(true)
                  userId(id)
                }}
              >
                <DeleteIcon sx={{ color: '#1976d2' }} />
              </IconButton>
            </div>
          </li>
          <hr />
        </Link>
      </div>
    </div>
  )
}

export default UserItem
