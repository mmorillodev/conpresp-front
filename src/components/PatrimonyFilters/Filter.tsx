import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, FC } from 'react'

interface FilterProps {
  label: string
  name: string
  value: string
  onChange: (_: ChangeEvent<HTMLInputElement>) => void
}

const Filter: FC<FilterProps> = ({ label, name, value, onChange }) => (
  <Accordion style={{ margin: 0 }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography>{label}</Typography>
    </AccordionSummary>
    <AccordionDetails style={{ background: '#F9F9F9' }}>
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
    </AccordionDetails>
  </Accordion>
)

export default Filter
