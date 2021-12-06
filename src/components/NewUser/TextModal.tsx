import { ChangeEvent, FC } from 'react'

import { TextField } from '@mui/material'

interface ModalProps {
  label: string
  name: string
  value: string
  // eslint-disable-next-line no-unused-vars
  onChange: (_: ChangeEvent<HTMLInputElement>) => void
}

const Filter: FC<ModalProps> = ({ label, name, value, onChange }) => (
  <form>
    <TextField
      margin="dense"
      label={label}
      type="text"
      name={name}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      style={{ background: 'white' }}
    />
  </form>
)

export default Filter
