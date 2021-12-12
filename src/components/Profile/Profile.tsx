import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

import useSession from '../../hooks/useSession'

import styles from './Profile.module.scss'

const Profile = () => {
  const {
    session: { isAuthenticated },
  } = useSession()

  return (
    <div className={styles.Profile}>
      {!isAuthenticated ? (
        <Button variant="outlined">
          <Link to="/login">Login</Link>
        </Button>
      ) : (
        <span>Olá Pessoa</span>
      )}
    </div>
  )
}

export default Profile
