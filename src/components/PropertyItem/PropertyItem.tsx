import styles from './PropertyItem.module.scss'

const PropertyItem = () => (
  <li className={styles.PropertyItem}>
    <a className={styles.callToAction} href="/">
      <div className={styles.propertyColumn}>
        <h4 className={styles.columnTitle}>Número</h4>
        <span>100006</span>
      </div>
      <div className={styles.propertyColumn}>
        <h4 className={styles.columnTitle}>Denominação</h4>
        <span>Igreja São Luiz</span>
      </div>
      <div className={styles.propertyColumn}>
        <h4 className={styles.columnTitle}>Grau de alteração</h4>
        <span>Alterado</span>
      </div>
      <div className={styles.propertyColumn}>
        <h4 className={styles.columnTitle}>Estado de conservação</h4>
        <span>Regular</span>
      </div>
      <div className={styles.propertyColumn}>
        <h4 className={styles.columnTitle}>Responsável pelo preenchimento</h4>
        <span>Matheus Morillo</span>
      </div>
    </a>
  </li>
)

export default PropertyItem
