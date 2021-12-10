import CloseIcon from '@mui/icons-material/Close'
import { Button, IconButton, Modal, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import { Box } from '@mui/system'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useQuery } from 'react-query'

import api from '../../apis/default'

import FormModal from './TextModal'
import styles from './UserModal.module.scss'
import { AxiosResponseHeaders } from 'axios'

export interface UserFacet {
  name: string
  label: string
}

interface UserModalProps {
  open: boolean
  onCloseRequested: () => void
  textFacets: UserFacet[]
}

const UserModal: FC<UserModalProps> = ({
  open,
  onCloseRequested,
  textFacets,
}) => {
  const [field, setField] = useState<{ [x: string]: string }>({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)

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

  async function userPost() {
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
      .post('/users', field, axiosConfig)
      .then(response => {
        setField({})
        handleClickOpen()
      })
      .catch(({ response }) => {
       if (response.status === 400) {
          clickErrorOpen()
        } else {
          clickErrorOpen()
        }
      })
  }

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
            Usuário adicionado com sucesso!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
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
            Houve um erro ao inserir o usuário, verifique os campos e tente
            novamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickErrorClose}>Ok</Button>
        </DialogActions>
      </Dialog>

      <Modal open={open}>
        <Box className={styles.modalBox}>
          <div className={styles.header}>
            <h2>Adicionar Usuário</h2>
            <IconButton onClick={onCloseRequested}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className={styles.TextFields}>
            <h3> Informações Gerais </h3>
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
              onClick={() => userPost()}
              sx={{ backgroundColor: '#1DA6D1' }}
            >
              Adicionar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default UserModal
