import { useEffect } from 'react'
import { useQuery } from 'react-query'
import ContentLoader from 'react-content-loader'

import api from '../../apis/default'

import styles from './PatrimonyPage.module.scss'

const PropertyPage = () => {
  const { isLoading, data } = useQuery('propertyList', () =>
    api.get('/patrimony')
  )

  useEffect(() => {
    console.log(data)
  }, [isLoading, data])

  return (
    <div className={styles.Property}>
      <main className={styles.mainContent}>
        <h1>Patrimônios</h1>
        <span className={styles.pageDescr}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio neque
          reprehenderit libero, aspernatur consequatur laudantium et in quas
          quaerat, omnis illo. Pariatur voluptatum obcaecati distinctio nihil
          aut nemo dolores amet?
        </span>
        <hr />
        {isLoading && <span>Loading</span>}
      </main>
    </div>
  )
}

export default PropertyPage
