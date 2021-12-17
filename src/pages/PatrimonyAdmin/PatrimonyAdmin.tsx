import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import { PageableResponse } from '../../types/PageableResponse'
import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'

import PatrimonyAdminList from '../../components/PatrimonyAdminList/PatromonyAdminList'

import Filters, { FilterFacet } from '../../components/PatrimonyFilters/Filters'

import usePageFetch from '../../hooks/usePageFetch'

import styles from './PatrimonyAdmin.module.scss'

const filterFacets: FilterFacet[] = [
  {
    label: 'Responsável pelo preenchimento',
    name: 'createdBy',
  },
  {
    label: 'Resolução Conpresp',
    name: 'resolution',
  },
  {
    label: 'Denominação',
    name: 'denomination',
  },
  {
    label: 'Térreo (Uso Original)',
    name: 'originalUsage',
  },
  {
    label: 'Tipo de Endereço',
    name: 'addressType',
  },
  {
    label: 'Título',
    name: 'addressTitle',
  },
  {
    label: 'Logradouro',
    name: 'street',
  },
  {
    label: 'Número de Endereço',
    name: 'addressNumber',
  },
  {
    label: 'Distrito',
    name: 'district',
  },
  {
    label: 'Prefeitura Regional',
    name: 'regionalHall',
  },
  {
    label: 'Autor Original',
    name: 'author',
  },
  {
    label: 'Data de Construção',
    name: 'constructionYear',
  },
  {
    label: 'Estilo Arquitetônico',
    name: 'architecturalStyle',
  },
]

const PatrimonyAdmin = () => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [addPatrimony, setAddPatrimony] = useState(false)
  const { isLoading, data, refetch } =
    usePageFetch<PageableResponse<PatrimonyGeneral>>('patrimony')

  return (
    <div className={styles.patrimony}>
      <Filters
        open={filterOpen}
        onCloseRequested={() => setFilterOpen(false)}
        facets={filterFacets}
      />

      <div className={styles.pageBanner} />
      <main className={styles.mainContent}>
        <h1>Patrimônios</h1>
        <span className={styles.pageDescr}>
          Página dedicada para gerenciar os patrimônios do sistema. Aqui você
          pode adicionar, atualizar, excluir e consultar todos os patrimônios
          cadastrados.
        </span>
        <hr />
        <div className={styles.button}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '2rem',
              marginTop: '1rem',
              marginBottom: '2rem',
            }}
            onClick={() => setFilterOpen(true)}
            startIcon={<FilterListIcon sx={{ color: '#1976d2' }} />}
          >
            Filtrar
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: '.5rem',
              marginTop: '1rem',
              marginBottom: '2rem',
              marginLeft: 'auto',
              background: '#1DA6D1',
            }}
            startIcon={<AddIcon sx={{ color: 'white' }} />}
            onClick={() => {
              setAddPatrimony(true)
            }}
          >
            Novo Patrimônio
          </Button>
        </div>

        {isLoading ? (
          <span> Carregando...</span>
        ) : (
          <PatrimonyAdminList
            patrimony={data?.data.content ?? []}
            refetch={refetch}
          />
        )}
      </main>
    </div>
  )
}

export default PatrimonyAdmin
