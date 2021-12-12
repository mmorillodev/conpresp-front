import { useState } from 'react'

import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'

import { PageableResponse } from '../../types/PageableResponse'
import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'

import PatrimonyList from '../../components/PatrimonyList/PatrimonyList'
import Filters, { FilterFacet } from '../../components/PatrimonyFilters/Filters'
import Paginator from '../../components/Pagination/Pagination'

import usePageFetch from '../../hooks/usePageFetch'

import styles from './PatrimonyPage.module.scss'

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

const PropertyPage = () => {
  const [filterOpen, setFilterOpen] = useState(false)

  const { isLoading, data } =
    usePageFetch<PageableResponse<PatrimonyGeneral>>('patrimony')

  return (
    <>
      <Filters
        open={filterOpen}
        onCloseRequested={() => setFilterOpen(false)}
        facets={filterFacets}
      />
      <div className={styles.pageBanner} />
      <section className={styles.mainContent}>
        <h1>Patrimônios</h1>
        <span className={styles.pageDescr}>
          Página dedicada para gerenciar os patrimônios do sistema. Aqui você
          pode adicionar, atualizar, excluir e contrultar todos os patrimônios
          cadastrados.
        </span>
        <hr />
        <Button
          variant="outlined"
          sx={{
            borderRadius: '2rem',
            marginBottom: '2rem',
            marginLeft: 'auto',
          }}
          onClick={() => setFilterOpen(true)}
          startIcon={<FilterListIcon sx={{ color: '#1976d2' }} />}
        >
          Filtrar
        </Button>
        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          <PatrimonyList patrimonies={data?.data.content ?? []} />
        )}
        <br />
        {data?.data.totalPages && data.data.totalPages > 1 && (
          <Paginator count={data?.data.totalPages} />
        )}
      </section>
    </>
  )
}

export default PropertyPage
