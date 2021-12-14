import { Button, Modal } from '@mui/material'
import React, { FC } from 'react'
import { Box } from '@mui/system'

import styles from './ModalDialog.module.scss'

interface DialogProp {
  open: boolean
  messageType: string
  title: string
  message: string
  buttonMessage: string
  onCloseRequest: () => void
  closeFunction: () => void
  refetch: () => void
}

const ModalDialog: FC<DialogProp> = ({
  open,
  messageType,
  title,
  message,
  buttonMessage,
  onCloseRequest,
  closeFunction,
  refetch,
}) => (
  <Modal open={open}>
    <Box className={styles.modalBox}>
      <div className={styles.image}>
        <img src={`/images/${messageType}.svg`} alt="Ícone de confirmação" />
      </div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{message}</p>
        <Button
          variant="contained"
          sx={{
            marginRight: 'auto',
            marginBottom: '2rem',
            marginTop: '2rem',
            borderRadius: '8px',
          }}
          onClick={() => {
            closeFunction()
            refetch()
            onCloseRequest()
          }}
        >
          {buttonMessage}
        </Button>
      </div>
    </Box>
  </Modal>
)

export default ModalDialog
