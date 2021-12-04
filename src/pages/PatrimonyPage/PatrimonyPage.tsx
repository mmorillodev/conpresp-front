import { useEffect } from 'react'
import { useQuery } from 'react-query'

import { PageableResponse } from '../../types/PageableResponse'
import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'
import PatrimonyList from '../../components/PatrimonyList/PatrimonyList'
import api from '../../apis/default'

import styles from './PatrimonyPage.module.scss'

const PropertyPage = () => {
  const { isLoading, data } = useQuery('propertyList', () =>
    api.get<PageableResponse<PatrimonyGeneral>>('/patrimony')
  )

  useEffect(() => {
    console.log(data?.data)
  }, [isLoading, data])

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
        {isLoading ? (
          <span>Loading</span>
        ) : (
          <PatrimonyList patrimonies={data?.data.content ?? []} />
        )}
      </main>
    </div>
  )
}

export default PropertyPage
