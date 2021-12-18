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
import ModalDialog from '../ModalDialog/ModalDialog'
import DeletePopupModal from '../DeleteUserPopup/DeletePopup'
import { types } from 'util'

interface UserItemProps {
  index: number
  user: UserGeneral
  refetch: () => void
}

type PatrimonyConservationLevel = 'active' | 'inactive' | string

const tagLevelDict: { [key in PatrimonyConservationLevel]: TagLevel } = {
  active: 'success',
  inactive: 'danger',
}

const UserItem: FC<UserItemProps> = ({
  index,
  user: { id, firstName, lastName, email, profile, status },
  refetch,
}) => {
  const {
    session: { type, token, isAuthenticated },
  } = useSession()
  const history = useHistory()
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [user, setUser] = useState<UserDetails>()
  const [dialogSuccess, setDialogSuccess] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [dialogError, setDialogError] = useState(false)

  async function getUser() {
    if (isAuthenticated && profile !== 'COMMON') {
      await api
        .get<UserDetails>(`/users/${id}`, {
          headers: { Authorization: `${type} ${token}` },
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
          errorDialog={() => setDialogError(true)}
          onCloseRequested={() => setOpenUpdateModal(false)}
          user={user}
        />
      )}

      <DeletePopupModal
        open={deleteDialog}
        onCloseRequest={() => setDeleteDialog(false)}
        id={id}
        endpoint="users"
        refetch={refetch}
      />

      <ModalDialog
        open={dialogSuccess}
        messageType="success"
        title="Sucesso."
        message={`O usuário ${firstName} foi atualizado com sucesso.`}
        buttonMessage="Confirmar"
        onCloseRequest={() => setDialogSuccess(false)}
        closeFunction={() => setOpenUpdateModal(false)}
        refetch={refetch}
      />

      <ModalDialog
        open={dialogError}
        messageType="error"
        title="Erro."
        message="Houve um erro inesperado, por favor verifique os campos e tente novamente."
        buttonMessage="Confirmar"
        onCloseRequest={() => setDialogError(false)}
        closeFunction={() => {
          setOpenUpdateModal(false)
        }}
        refetch={refetch}
      />

      <div className={styles.ButtonEffect}>
        <li className={styles.UserItem}>
          <p> {index} </p>
          <p> {`${firstName} ${lastName}`} </p>
          <p> {email} </p>
          <p> {profile} </p>
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
                setDeleteDialog(true)
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
