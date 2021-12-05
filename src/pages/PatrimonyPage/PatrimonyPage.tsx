import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'

import { PageableResponse } from '../../types/PageableResponse'
import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'

import PatrimonyList from '../../components/PatrimonyList/PatrimonyList'
import PatrimonyFilters from '../../components/PatrimonyFilters/PatrimonyFilters'

import useURLSearchParams from '../../hooks/useURLSearchParams'
import api from '../../apis/default'

import styles from './PatrimonyPage.module.scss'

const PropertyPage = () => {
  const [filterOpen, setFilterOpen] = useState(false)
  const params = useURLSearchParams()
  const { isLoading, data, refetch, isRefetching } = useQuery(
    'propertyList',
    () =>
      api.get<PageableResponse<PatrimonyGeneral>>(
        `/patrimony?${params.toString()}`
      )
  )

  useEffect(() => {
    refetch()
  }, [params])

  return (
    <div className={styles.Property}>
      <PatrimonyFilters
        open={filterOpen}
        onCloseRequested={() => setFilterOpen(false)}
      />
      <div className={styles.pageBanner} />
      <main className={styles.mainContent}>
        <h1>Patrimônios</h1>
        <span className={styles.pageDescr}>
          Pharetra aenean tellus mauris, viverra tortor morbi sit. Viverra nunc
          neque dignissim vulputate. Eu hendrerit et tincidunt hendrerit
          malesuada felis, felis sem purus. Placerat pharetra pretium massa
          viverra. Blandit commodo ultrices feugiat tellus.
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
        {isLoading || isRefetching ? (
          <span>Carregando...</span>
        ) : (
          <PatrimonyList patrimonies={data?.data.content ?? []} />
        )}
      </main>
    </div>
  )
}

export default PropertyPage
