import type { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'

import React, { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import Tag, { TagLevel } from '../Tag/Tag'
import { UserGeneral, UserDetails } from '../../types/UserGeneral'
import UpdateUserModal from '../UpdateUser/UserUpdateModal'

import useSession from '../../hooks/useSession'
import api from '../../apis/default'

import styles from './UserItem.module.scss'
import SucessModal from '../SuccessModal/SuccessModal'

interface UserItemProps {
  user: UserGeneral
  userId: (id: string) => void
  openDeleteDialog: (isOpen: boolean) => void
  refetch: () => void
}

type PatrimonyConservationLevel = 'active' | 'inactive' | string

const tagLevelDict: { [key in PatrimonyConservationLevel]: TagLevel } = {
  active: 'success',
  inactive: 'danger',
}

const UserItem: FC<UserItemProps> = ({
  user: { id, firstName, lastName, email, profile, status },
  openDeleteDialog,
  userId,
  refetch,
}) => {
  const {
    session: { token, isAuthenticated },
  } = useSession()
  const history = useHistory()
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [user, setUser] = useState<UserDetails>()
  const [dialogSuccess, setDialogSuccess] = useState(false)

  async function getUser() {
    if (isAuthenticated) {
      await api
        .get<UserDetails>(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          setUser(response.data)
        })
        .catch(() => {})
    } else {
      history.push('/login')
    }
  }

  return (
    <div>
      {user && (
        <UpdateUserModal
          open={openUpdateModal}
          successDialog={() => setDialogSuccess(true)}
          onCloseRequested={() => setOpenUpdateModal(false)}
          user={user}
        />
      )}

      <SucessModal
        open={dialogSuccess}
        onCloseRequest={() => setDialogSuccess(false)}
        addUser={() => setOpenUpdateModal(false)}
        refetch={refetch}
      />

      <div className={styles.ButtonEffect}>
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
                getUser()
                setOpenUpdateModal(true)
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
      </div>
    </div>
  )
}

export default UserItem
