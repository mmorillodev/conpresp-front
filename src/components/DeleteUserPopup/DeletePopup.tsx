import { Button, Modal } from '@mui/material'
import React, { FC } from 'react'
import { Box } from '@mui/system'
import { useHistory } from 'react-router-dom'

import styles from './DeletePopup.module.scss'

import useSession from '../../hooks/useSession'
import api from '../../apis/default'

interface DeletePopup {
  open: boolean
  id: string
  onCloseRequest: () => void
  refetch: () => void
  endpoint: string
}

const DeletePopupModal: FC<DeletePopup> = ({
  open,
  onCloseRequest,
  refetch,
  id,
  endpoint,
}) => {
  const {
    session: { token, isAuthenticated },
  } = useSession()
  const history = useHistory()

  async function deleteUser() {
    if (isAuthenticated) {
      await api
        .delete(`/${endpoint}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          refetch()
          onCloseRequest()
        })
        .catch(() => {})
    } else {
      history.push('/login')
    }
  }

  return (
    <Modal open={open}>
      <Box className={styles.modalBox}>
        <div className={styles.image}>
          <img src="/images/warning.svg" alt="Ícone de confirmação" />
        </div>
        <div className={styles.content}>
          <h3>Deseja realmente excluir?</h3>
          <p>
            Aviso: após a exclusão, não será possível a recuperação desse
            conteúdo
          </p>
          <Button
            variant="contained"
            sx={{
              background: '#1DA6D1',
              marginRight: '1rem',
              marginBottom: '2rem',
              marginTop: '2rem',
              borderRadius: '8px',
            }}
            onClick={onCloseRequest}
          >
            Não excluir
          </Button>
          <Button
            variant="outlined"
            sx={{
              marginRight: 'auto',
              marginBottom: '2rem',
              marginTop: '2rem',
              borderRadius: '8px',
            }}
            onClick={() => deleteUser()}
          >
            Sim, excluir
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default DeletePopupModal
