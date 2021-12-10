import { ChangeEvent, FC } from 'react'

import { TextField, Select, MenuItem, SelectChangeEvent } from '@mui/material'

interface ModalProps {
  label: string
  name: string
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (_: ChangeEvent<HTMLInputElement>) => void
  // eslint-disable-next-line no-unused-vars
  changeHandle: (_: SelectChangeEvent) => void
}

const Filter: FC<ModalProps> = ({
  label,
  name,
  value,
  onChange,
  changeHandle,
}) => (
  <form>
    {label === 'Perfil' || label === 'Grupo' || label === 'Status' ? (
      <Select
        margin="dense"
        label={label === 'Perfil' ? 'Perfil' : 'Grupo'}
        type="text"
        name={name}
        variant="outlined"
        fullWidth
        value={value}
        onChange={changeHandle}
        style={{ background: 'white', marginBottom: '10px' }}
      >
        <MenuItem value={label === 'Perfil' ? 'MODERATOR' : 'UAM'}>
          {label === 'Perfil' ? 'Moderador' : 'UAM'}
        </MenuItem>
        <MenuItem value={label === 'Perfil' ? 'ADMINISTRATOR' : 'DHP'}>
          {label === 'Perfil' ? 'Administrador' : 'DHP'}
        </MenuItem>
        <MenuItem value={label === 'Perfil' ? 'COMMON' : 'CONPRESP'}>
          {label === 'Perfil' ? 'Comum' : 'CONPRESP'}
        </MenuItem>
      </Select>
    ) : (
      <TextField
        margin="dense"
        label={label}
        type={
          name === 'password' || name === 'confirmPassword'
            ? 'password'
            : 'text'
        }
        name={name}
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
        style={{ background: 'white' }}
      />
    )}
  </form>
)

export default Filter
