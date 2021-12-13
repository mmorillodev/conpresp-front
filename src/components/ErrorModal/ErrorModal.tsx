import { Button, Modal } from '@mui/material'
import React, { FC } from 'react'
import { Box } from '@mui/system'

import styles from './ErrorModal.module.scss'
import check from '../../assets/check.svg'

interface ErrorProp {
    open: boolean
    onCloseRequest: () => void
  }

  const ErrorModal: FC<ErrorProp> = ({
      open,
      onCloseRequest,
  }) => (
    <Modal open={open}>
    <Box className={styles.modalBox}>
      <div className={styles.image}>
        <img src={check} alt="Ícone de confirmação" />
      </div>
      <div className={styles.content}>
        <h3>Erro!</h3>
        <p>Ops! Houve um erro inesperado, atualize a página e tente novamente.</p>
        <Button
          variant="contained"
          sx={{
            marginRight: 'auto',
            marginBottom: '2rem',
            marginTop: '2rem',
            borderRadius: '8px',
          }}
          onClick={() => {
            onCloseRequest()
          }}
        >
          Confirmar
        </Button>
      </div>
    </Box>
  </Modal>
  )

  export default ErrorModal