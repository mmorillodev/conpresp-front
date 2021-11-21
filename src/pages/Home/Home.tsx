import Header from '../../components/Header/Header'
import PropertyList from '../../components/PropertyList/PropertyList'

import styles from './Home.module.scss'

const Home = () => (
  <div className={styles.Home}>
    <Header />
    <main className={styles.mainContent}>
      <h1>Patrimônios</h1>
      <span className={styles.pageDescr}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio neque
        reprehenderit libero, aspernatur consequatur laudantium et in quas
        quaerat, omnis illo. Pariatur voluptatum obcaecati distinctio nihil aut
        nemo dolores amet?
      </span>
      <hr />
      <PropertyList />
    </main>
  </div>
)

export default Home
