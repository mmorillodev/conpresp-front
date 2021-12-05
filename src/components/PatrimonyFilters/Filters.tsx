import CloseIcon from '@mui/icons-material/Close'
import { Button, IconButton, Modal } from '@mui/material'
import { Box } from '@mui/system'
import { ChangeEvent, FC, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Filter from './Filter'

import styles from './Filters.module.scss'

export interface FilterFacet {
  name: string
  label: string
}
interface PatrimonyFiltersProps {
  open: boolean
  onCloseRequested: () => void
  facets: FilterFacet[]
}

const PatrimonyFilters: FC<PatrimonyFiltersProps> = ({
  open,
  onCloseRequested,
  facets,
}) => {
  const [filters, setFilters] = useState<{ [x: string]: string }>({})
  const history = useHistory()

  const changeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value,
      })
    },
    [filters, setFilters]
  )

  const clickHandler = useCallback(() => {
    const queryParams = Object.keys(filters)
      .filter(key => filters[key] > ' ')
      .map(
        key =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            filters[key].trim()
          )}`
      )
      .join('&')

    history.push(`${history.location.pathname}?${queryParams}`)
    onCloseRequested()
  }, [filters, history, onCloseRequested])

  return (
    <Modal open={open}>
      <Box className={styles.modalBox}>
        <div className={styles.header}>
          <h2>Filtros</h2>
          <IconButton onClick={onCloseRequested}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styles.filters}>
          {facets.map(({ name, label }) => (
            <Filter
              label={label}
              name={name}
              value={filters[name] ?? ''}
              onChange={changeHandler}
            />
          ))}
        </div>
        <div className={styles.footer}>
          <Button
            variant="outlined"
            onClick={() => setFilters({})}
            sx={{ borderColor: '#1DA6D1', color: '#1DA6D1' }}
          >
            Limpar
          </Button>
          <Button
            variant="contained"
            onClick={clickHandler}
            sx={{ backgroundColor: '#1DA6D1' }}
          >
            Filtrar
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default PatrimonyFilters
