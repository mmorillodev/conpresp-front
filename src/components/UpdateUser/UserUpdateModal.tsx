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
import { Box } from '@mui/system'

import api from '../../apis/default'
import useSession from '../../hooks/useSession'

import styles from './UpdateUserModal.module.scss'
import { UserDetails } from '../../types/UserGeneral'

interface UserModalProps {
  open: boolean
  user: UserDetails
  onCloseRequested: () => void
  refetch: () => void
}

const UpdateUserModal: FC<UserModalProps> = ({
  open,
  onCloseRequested,
  user,
  refetch,
}) => {
  const [field, setField] = useState(user)
  const {
    session: { token },
  } = useSession()

  async function updateUser() {
    await api
      .put(`/users/${user.id}`, field, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        refetch()
      })
      .catch(() => {})
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
    <Modal open={open}>
      <Box className={styles.modalBox}>
        <div className={styles.header}>
          <h2>Atualizar Usuário</h2>
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
          <InputLabel className={styles.label}>Status</InputLabel>
          <Select
            name="status"
            value={field.status ?? ''}
            label="Status"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="ACTIVE">Ativo</MenuItem>
            <MenuItem value="INACTIVE">Inativo</MenuItem>
          </Select>
        </FormControl>
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
        </FormControl>

        <div className={styles.footer}>
          <Button
            variant="outlined"
            onClick={() => {
              onCloseRequested()
            }}
          >
            Fechar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              updateUser()
              onCloseRequested()
            }}
            sx={{ backgroundColor: '#1DA6D1' }}
          >
            Confirmar
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default UpdateUserModal
