import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

import useSession from '../../hooks/useSession'
import Profile from '../Profile/Profile'

import styles from './LoginButton.module.scss'

const LoginButton = () => {
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
        <Profile />
      )}
    </div>
  )
}

export default LoginButton
