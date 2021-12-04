import { useEffect } from 'react'
import { useQuery } from 'react-query'

import Button from '@mui/material/Button'
import FilterListIcon from '@mui/icons-material/FilterList'

import { PageableResponse } from '../../types/PageableResponse'
import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'
import PatrimonyList from '../../components/PatrimonyList/PatrimonyList'
import useURLSearchParams from '../../hooks/useURLSearchParams'
import api from '../../apis/default'

import styles from './PatrimonyPage.module.scss'

const PropertyPage = () => {
  const params = useURLSearchParams()
  const { isLoading, data, refetch } = useQuery('propertyList', () =>
    api.get<PageableResponse<PatrimonyGeneral>>(
      `/patrimony?${params.toString()}`
    )
  )

  useEffect(() => {
    refetch()
  }, [params])

  return (
    <div className={styles.Property}>
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
          startIcon={<FilterListIcon sx={{ color: '#1976d2' }} />}
        >
          Filtrar
        </Button>
        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          <PatrimonyList patrimonies={data?.data.content ?? []} />
        )}
      </main>
    </div>
  )
}

export default PropertyPage
