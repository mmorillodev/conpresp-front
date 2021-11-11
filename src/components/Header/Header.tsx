import AdvancedSearch from '../AdvancedSearch/AdvancedSearch'
import styles from './Header.module.scss'

const Header = () => (
  <header className={styles.Header}>
    <span className={styles.logo}>Conpresp</span>
    <AdvancedSearch />
  </header>
)

export default Header
