import { useParams } from 'react-router-dom'
import usePageFetch from '../../hooks/usePageFetch'
import { PatrimonyDetails } from '../../types/PatrimonyDetails'

import styles from './PatrimonyDetailsPage.module.scss'

const PatrimonyDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = usePageFetch<PatrimonyDetails>(`patrimony/${id}`)

  console.log(data?.data)

  if (isLoading) <span>Carregando...</span>

  return <div className={styles.PatrimonyDetails}>{id}</div>
}

export default PatrimonyDetailsPage
