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
  const [updateUser, setUpdateUser] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)
  const [users, setUsers] = useState<UserDetails>()

  async function getUser() {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb25wcmVzcCBBUEkiLCJzdWIiOiIxIiwiaWF0IjoxNjM5MDg2MTcyLCJleHAiOjE2MzkxNzI1NzJ9._MobtUtRNCaZlmCMUKX1JcTljdSgtC662k3TPT7bEdU',
      },
    }
    await api
      .get<UserDetails>(`/users/${id}`, axiosConfig)
      .then(response => {
        setUsers(response.data)
        console.log(users?.email)
        updateModal()
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          clickErrorOpen()
          handleClose()
        } else {
          clickErrorOpen()
          handleClose()
        }
      })
  }

  const updateModal = () => {
    setUpdateUser(true)
  }

  const clickErrorOpen = () => {
    setErrorOpen(true)
  }

  const clickErrorClose = () => {
    setErrorOpen(false)
  }

  async function deleteUser() {
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb25wcmVzcCBBUEkiLCJzdWIiOiIxIiwiaWF0IjoxNjM5MDg2MTcyLCJleHAiOjE2MzkxNzI1NzJ9._MobtUtRNCaZlmCMUKX1JcTljdSgtC662k3TPT7bEdU',
      },
    }
    api
      .delete(`/users/${id}`, axiosConfig)
      .then(response => {
        handleClose()
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          clickErrorOpen()
          handleClose()
        } else {
          clickErrorOpen()
          handleClose()
        }
      })
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
            Deseja excluir o usuário selecionado?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteUser()
            }}
          >
            Sim
          </Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={errorOpen}
        onClose={clickErrorClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Erro</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Houve um erro inesperado, atualize a página e tente novamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              clickErrorClose()
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <UpdateUserModal
        open={updateUser}
        onCloseRequested={() => setUpdateUser(false)}
        textFacets={newUserFacets}
        id={id}
      />

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
