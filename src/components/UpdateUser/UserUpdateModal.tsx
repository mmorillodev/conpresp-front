import CloseIcon from '@mui/icons-material/Close'
import { Button, IconButton, MenuItem, Modal, Select, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import { Box } from '@mui/system'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import api from '../../apis/default'

import FormModal from '../NewUser/TextModal'
import styles from './UpdateUserModal.module.scss'

export interface UserFacet {
  name: string
  label: string
}

interface UserModalProps {
  open: boolean
  onCloseRequested: () => void
  textFacets: UserFacet[]
  id: string
}

const UserModal: FC<UserModalProps> = ({
  open,
  onCloseRequested,
  textFacets,
  id,
}) => {
  const [field, setField] = useState<{ [x: string]: string }>({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)

  async function updateUser() {
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
      .put(`/users/${id}`, field, axiosConfig)
      .then(response => {
        if (response.status === 200) {
          setField({})
          handleClickOpen()
        }
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

  const clickErrorOpen = () => {
    setErrorOpen(true)
  }

  const clickErrorClose = () => {
    setErrorOpen(false)
  }

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setField({
        ...field,
        [e.target.name]: e.target.value,
      })
    },
    [field, setField]
  )

  const handleChange = useCallback(
    (e: SelectChangeEvent) => {
      setField({
        ...field,
        [e.target.name]: e.target.value,
      })
    },
    [field, setField]
  )

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Sucesso</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Usuário atualizado com sucesso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
            }}
          >
            Fechar
          </Button>
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

      <Modal open={open}>
        <Box className={styles.modalBox}>
          <div className={styles.header}>
            <h2>Atualizar Usuário</h2>
            <IconButton onClick={onCloseRequested}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className={styles.TextFields}>
            <h3> Informações Gerais </h3>
            <Select
              margin="dense"
              label="Status"
              type="text"
              name="status"
              variant="outlined"
              fullWidth
              // eslint-disable-next-line no-restricted-globals
              value={field.status}
              onChange={handleChange}
              style={{ background: 'white', marginBottom: '10px' }}
            >
              <MenuItem value="ACTIVE">
                Ativo
              </MenuItem>
              <MenuItem value="INACTIVE">
                Inativo
              </MenuItem>
            </Select>
            {textFacets.map(({ name, label }) => (
              <FormModal
                key={name}
                label={label}
                name={name}
                value={field[name] ?? ''}
                onChange={changeHandler}
                changeHandle={handleChange}
              />
            ))}
          </div>

          <div className={styles.footer}>
            <Button
              variant="outlined"
              onClick={() => setField({})}
              sx={{ borderColor: '#1DA6D1', color: '#1DA6D1' }}
            >
              Limpar
            </Button>
            <Button
              variant="contained"
              onClick={() => updateUser()}
              sx={{ backgroundColor: '#1DA6D1' }}
            >
              Atualizar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default UserModal
