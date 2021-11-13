import styles from './AdvancedSearch.module.scss'

const AdvancedSearch = () => (
  <div className={styles.AdvancedSearch}>
    <input className={styles.input} type="text" />
    <span className={styles.spacer} />
    <button className={styles.button} type="button">
      Buscar
    </button>
  </div>
)

export default AdvancedSearch
