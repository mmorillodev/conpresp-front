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

import styles from './UpdateUserModal.module.scss'
import { UserDetails } from '../../types/UserGeneral'

interface UserModalProps {
  open: boolean
  onCloseRequested: () => void
  id: string
  token: string
  user: UserDetails | undefined
}

const UpdateUserModal: FC<UserModalProps> = ({
  open,
  onCloseRequested,
  id,
  token,
  user
}) => {
  const [field, setField] = useState<{ [x: string]: string }>({})

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
            value={user?.profile ?? ''}
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
            value={user?.userGroup ?? ''}
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
            value={user?.firstName ?? ''}
            onChange={changeHandler}
          />
          <br />
          <TextField
            required
            type="text"
            label="Sobrenome"
            name="lastName"
            value={user?.lastName ?? ''}
            onChange={changeHandler}
          />
          <br />
          <TextField
            required
            type="text"
            label="E-mail"
            name="email"
            value={user?.email ?? ''}
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
          <Button variant="contained" sx={{ backgroundColor: '#1DA6D1' }}>
            Atualizar
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default UpdateUserModal
