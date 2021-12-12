import { Button, Modal } from '@mui/material'
import React, { FC } from 'react'
import { Box } from '@mui/system'

import styles from './SucessModal.module.scss'
import sucess from '../../assets/sucess.svg'

interface SucessProp {
  open: boolean
  onCloseRequest: () => void
  addUser: () => void
  refetch: () => void
}

const SucessModal: FC<SucessProp> = ({
  open,
  onCloseRequest,
  addUser,
  refetch,
}) => (
  <Modal open={open}>
    <Box className={styles.modalBox}>
      <div className={styles.image}>
        <img src={sucess} alt="Ícone de confirmação" />
      </div>
      <div className={styles.content}>
        <h3>Sucesso!</h3>
        <p>O usuário foi inserido com sucesso.</p>
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

export default SucessModal
