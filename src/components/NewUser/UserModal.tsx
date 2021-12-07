import CloseIcon from '@mui/icons-material/Close'
import { Button, IconButton, Modal, SelectChangeEvent } from '@mui/material'
import { ChangeEvent, FC, useCallback, useState } from 'react'
import { Box } from '@mui/system'

import FormModal from './TextModal'
import styles from './UserModal.module.scss'

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
            onClick={() => console.log(field)}
            sx={{ backgroundColor: '#1DA6D1' }}
          >
            Adicionar
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default UserModal
