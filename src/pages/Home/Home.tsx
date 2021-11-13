import Header from '../../components/Header/Header'
import PropertyList from '../../components/PropertyList/PropertyList'

import styles from './Home.module.scss'

const Home = () => (
  <div className={styles.Home}>
    <Header />
    <main className={styles.mainContent}>
      <PropertyList />
    </main>
  </div>
)

export default Home
