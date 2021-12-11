import { Button, Modal } from '@mui/material'
import React, { FC } from 'react'
import { Box } from '@mui/system'
import check from '../../assets/check.svg'

import styles from './DeletePopup.module.scss'

interface DeletePopup {
  open: boolean
  onCloseRequest: () => void
  deleteUser: () => void
}

const DeletePopupModal: FC<DeletePopup> = ({ open, onCloseRequest, deleteUser }) => (
  <Modal open={open}>
    <Box className={styles.modalBox}>
      <div className={styles.image}>
        <img src={check} alt="Ícone de confirmação" />
      </div>
      <div className={styles.content}>
        <h3>Deseja realmente excluir?</h3>
        <p>
          Aviso: após a exclusão, não será possível a recuperação desse conteúdo
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

export default DeletePopupModal
