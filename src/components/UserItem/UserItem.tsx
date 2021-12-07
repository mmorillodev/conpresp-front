import type { FC } from 'react'
import { Link } from 'react-router-dom'

import React, { useState } from 'react'

import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { UserFacet } from '../NewUser/UserModal'
import UpdateUserModal from '../UpdateUser/UserUpdateModal'
import Tag, { TagLevel } from '../Tag/Tag'
import { UserGeneral, UserDetails } from '../../types/UserGeneral'

import api from '../../apis/default'
import { PageableResponse } from '../../types/PageableResponse'

import styles from './UserItem.module.scss'

interface UserItemProps {
  user: UserGeneral
}
const newUserFacets: UserFacet[] = [
  {
    label: 'Perfil',
    name: 'profile',
  },
  {
    label: 'Grupo',
    name: 'userGroup',
  },
  {
    label: 'Nome',
    name: 'firstName',
  },
  {
    label: 'Sobrenome',
    name: 'lastName',
  },
  {
    label: 'E-mail',
    name: 'email',
  },
]

type PatrimonyConservationLevel = 'active' | 'inactive' | string

const tagLevelDict: { [key in PatrimonyConservationLevel]: TagLevel } = {
  active: 'success',
  inactive: 'danger',
}

const UserItem: FC<UserItemProps> = ({
  user: { id, firstName, lastName, email, profile, status },
}) => {
  const [updateUser, serUpdateUser] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [userResponse, setUserResponse] = useState<UserDetails>()
  const [statusCode, setStatusCode] = useState(Number)

  function getUser() {
    api
      .get<UserDetails>(`/users/${id}`)
      .then(response => setUserResponse(response.data))

    serUpdateUser(true)
  }

  function deleteUser() {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb25wcmVzcCBBUEkiLCJzdWIiOiIxIiwiaWF0IjoxNjM4OTEwMDE2LCJleHAiOjE2Mzg5OTY0MTZ9.A1PQ_JwwKMsw3z0wS-o3EL0qSLdfNrPecLGrmywb2Mw',
      },
    }
    api
      .delete(`/users/${id}`, axiosConfig)
      .then(response => setStatusCode(response.status))
      handleClose()
  }

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmação!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja excluior o usuário selecionado?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => { deleteUser() }}>Sim</Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
        </DialogActions>
      </Dialog>

      <UpdateUserModal
        open={updateUser}
        onCloseRequested={() => serUpdateUser(false)}
        textFacets={newUserFacets}
      />

      <div className={styles.ButtonEffect}>
        <Link className={styles.tag} to={`/usuarios/${id}`}>
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
                }}
              >
                <BorderColorIcon sx={{ color: '#1976d2' }} />
              </IconButton>
              <IconButton
                className={styles.IconButton}
                onClick={() => {
                  handleClickOpen()
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
