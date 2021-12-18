import { Link } from 'react-router-dom'

import LoginButton from '../LoginButton/LoginButton'
import logo from '../../assets/logo.svg'

import useSession from '../../hooks/useSession'

import styles from './Header.module.scss'

const Header = () => {
  const {
    session: { isAuthenticated, profile },
  } = useSession()

  return (
    <header className={styles.Header}>
      <img src={logo} alt="Conpresp logo" />
      <nav className={styles.navigation}>
        <ul className={styles.navItems}>
          <li>
            {isAuthenticated && profile !== 'COMMON' ? (
              <Link to="/patrimonios-admin">Patrimônios</Link>
            ) : (
              <Link to="/patrimonios">Patrimônios</Link>
            )}
          </li>
          {isAuthenticated && profile === 'ADMINISTRATOR' && (
            <li>
              <Link to="/usuarios">Usuários</Link>
            </li>
          )}
          <li>
            <Link to="/glossario">Glossário</Link>
          </li>
        </ul>
      </nav>
      <LoginButton />
    </header>
  )
}

export default Header
