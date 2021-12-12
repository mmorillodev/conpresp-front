import usePageFetch from '../../hooks/usePageFetch'
import { UserDetails } from '../../types/UserDetails'

import styles from './Profile.module.scss'

const Profile = () => {
  const { data, isLoading } = usePageFetch<UserDetails>('users/user-info')

  if (isLoading) return <span>Carregando...</span>

  return (
    <span className={styles.Profile}>
      Olá, <b>{data?.data.firstName}</b>
    </span>
  )
}

export default Profile
