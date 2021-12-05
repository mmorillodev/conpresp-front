import CloseIcon from '@mui/icons-material/Close'
import { Button, IconButton, Modal } from '@mui/material'
import { Box } from '@mui/system'
import { ChangeEvent, FC, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

import Filter from './Filter'

import styles from './PatrimonyFilters.module.scss'

interface PatrimonyFiltersProps {
  open: boolean
  onCloseRequested: () => void
}

interface FilterState {
  denomination: string
  street: string
  constructionYear: string
  architecturalStyle: string
  author: string
  originalUsage: string
  addressType: string
  addressTitle: string
  addressNumber: string
  district: string
  regionalHall: string
  resolution: string
  createdBy: string
  [key: string]: string
}

const initialFilterState: FilterState = {
  denomination: '',
  street: '',
  constructionYear: '',
  architecturalStyle: '',
  author: '',
  originalUsage: '',
  addressType: '',
  addressTitle: '',
  addressNumber: '',
  district: '',
  regionalHall: '',
  resolution: '',
  createdBy: '',
}

const PatrimonyFilters: FC<PatrimonyFiltersProps> = ({
  open,
  onCloseRequested,
}) => {
  const [filters, setFilters] = useState<FilterState>(initialFilterState)
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

    history.push(`/patrimonios?${queryParams}`)
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
          <Filter
            label="Responsável pelo preenchimento"
            name="createdBy"
            value={filters.createdBy}
            onChange={changeHandler}
          />
          <Filter
            label="Resolução Conpresp"
            name="resolution"
            value={filters.resolution}
            onChange={changeHandler}
          />
          <Filter
            label="Denominação"
            name="denomination"
            value={filters.denomination}
            onChange={changeHandler}
          />
          <Filter
            label="Térreo (Uso Original)"
            name="originalUsage"
            value={filters.originalUsage}
            onChange={changeHandler}
          />
          <Filter
            label="Tipo de Endereço"
            name="addressType"
            value={filters.addressType}
            onChange={changeHandler}
          />
          <Filter
            label="Título"
            name="addressTitle"
            value={filters.addressTitle}
            onChange={changeHandler}
          />
          <Filter
            label="Logradouro"
            name="street"
            value={filters.street}
            onChange={changeHandler}
          />
          <Filter
            label="Número de Endereço"
            name="addressNumber"
            value={filters.addressNumber}
            onChange={changeHandler}
          />
          <Filter
            label="Distrito"
            name="district"
            value={filters.district}
            onChange={changeHandler}
          />
          <Filter
            label="Prefeitura Regional"
            name="regionalHall"
            value={filters.regionalHall}
            onChange={changeHandler}
          />
          <Filter
            label="Autor Original"
            name="author"
            value={filters.author}
            onChange={changeHandler}
          />
          <Filter
            label="Data de Construção"
            name="constructionYear"
            value={filters.constructionYear}
            onChange={changeHandler}
          />
          <Filter
            label="Estilo Arquitetônico"
            name="architecturalStyle"
            value={filters.architecturalStyle}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.footer}>
          <Button
            variant="outlined"
            onClick={() => setFilters(initialFilterState)}
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
