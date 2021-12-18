import CloseIcon from '@mui/icons-material/Close'
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
} from '@mui/material'
import React, { ChangeEvent, FC, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Box } from '@mui/system'
import useSession from '../../hooks/useSession'

import api from '../../apis/default'

import styles from './UserModal.module.scss'

interface UserModalProps {
  open: boolean
  onCloseRequested: () => void
  dialogSuccess: (isOpen: boolean) => void
  dialogError: (isOpen: boolean) => void
}

const UserModal: FC<UserModalProps> = ({
  open,
  onCloseRequested,
  dialogSuccess,
  dialogError,
}) => {
  const [field, setField] = useState<{ [x: string]: string }>({})
  const {
    session: { token, isAuthenticated, profile },
  } = useSession()
  const history = useHistory()

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

  async function userPost() {
    if (isAuthenticated && profile !== 'COMMON') {
      await api
        .post('/users', field, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setField({})
          dialogSuccess(true)
        })
        .catch(() => {
          dialogError(true)
        })
    } else {
      history.push('/login')
    }
  }

  return (
    <Modal open={open}>
      <Box className={styles.modalBox}>
        <div className={styles.header}>
          <h2>Adicionar Usuário</h2>
          <IconButton onClick={onCloseRequested}>
            <CloseIcon />
          </IconButton>
        </div>
        <h3> Informações Gerais </h3>
        <FormControl
          required
          className={styles.textFields}
          sx={{ padding: 1.5 }}
        >
          <InputLabel className={styles.label}>Perfil</InputLabel>
          <Select
            name="profile"
            value={field.profile ?? ''}
            label="Perfil"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="ADMINISTRATOR">Administrador</MenuItem>
            <MenuItem value="MODERATOR">Moderador</MenuItem>
            <MenuItem value="COMMON">Comum</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          required
          className={styles.textFields}
          sx={{ padding: 1.5 }}
        >
          <InputLabel className={styles.label}>Grupo</InputLabel>
          <Select
            name="userGroup"
            value={field.userGroup ?? ''}
            label="Grupo"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="DHP">DHP</MenuItem>
            <MenuItem value="CONPRESP">CONPRESP</MenuItem>
            <MenuItem value="UAM">UAM</MenuItem>
          </Select>
        </FormControl>
        <br />
        <FormControl
          required
          className={styles.textFields}
          sx={{ padding: 1.5 }}
        >
          <TextField
            required
            type="text"
            label="Nome"
            name="firstName"
            value={field.firstName ?? ''}
            onChange={changeHandler}
          />
          <br />
          <TextField
            required
            type="text"
            label="Sobrenome"
            name="lastName"
            value={field.lastName ?? ''}
            onChange={changeHandler}
          />
          <br />
          <TextField
            required
            type="text"
            label="E-mail"
            name="email"
            value={field.email ?? ''}
            onChange={changeHandler}
          />
          <br />
          <TextField
            required
            error={field.password !== field.confirmPassword}
            type="password"
            label="Senha"
            name="password"
            value={field.password ?? ''}
            onChange={changeHandler}
          />
          <br />
          <TextField
            required
            error={field.password !== field.confirmPassword}
            type="password"
            label="Confirme a Senha"
            name="confirmPassword"
            value={field.confirmPassword ?? ''}
            onChange={changeHandler}
          />
          <br />
        </FormControl>

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
            sx={{ backgroundColor: '#1DA6D1' }}
            onClick={() => {
              userPost()
            }}
          >
            Confirmar
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default UserModal
