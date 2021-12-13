import { Button, Modal } from '@mui/material'
import React, { FC } from 'react'
import { Box } from '@mui/system'

import styles from './SuccessModal.module.scss'
import success from '../../assets/success.svg'

interface SuccessProp {
  open: boolean
  onCloseRequest: () => void
  addUser: () => void
  refetch: () => void
}

const SuccessModal: FC<SuccessProp> = ({
  open,
  onCloseRequest,
  addUser,
  refetch,
}) => (
  <Modal open={open}>
    <Box className={styles.modalBox}>
      <div className={styles.image}>
        <img src={success} alt="Ícone de confirmação" />
      </div>
      <div className={styles.content}>
        <h3>Sucesso!</h3>
        <p>A requisição foi atendida com sucesso.</p>
        <Button
          variant="contained"
          sx={{
            marginRight: 'auto',
            marginBottom: '2rem',
            marginTop: '2rem',
            borderRadius: '8px',
          }}
          onClick={() => {
            addUser()
            refetch()
            onCloseRequest()
          }}
        >
          Confirmar
        </Button>
      </div>
    </Box>
  </Modal>
)

export default SuccessModal
