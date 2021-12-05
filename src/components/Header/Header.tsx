import { Link } from 'react-router-dom'

import Profile from '../Profile/Profile'
import logo from '../../assets/logo.svg'

import styles from './Header.module.scss'

const Header = () => (
  <header className={styles.Header}>
    <img src={logo} alt="Conpresp logo" />
    <nav className={styles.navigation}>
      <ul className={styles.navItems}>
        <li>
          <Link to="/patrimonios">Patrimônios</Link>
        </li>
        <li>
          <Link to="/usuarios">Usuários</Link>
        </li>
        <li>
          <Link to="/glossario">Glossário</Link>
        </li>
      </ul>
    </nav>
    <Profile />
  </header>
)

export default Header
