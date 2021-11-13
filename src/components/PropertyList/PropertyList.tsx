import PropertyItem from '../PropertyItem/PropertyItem'

import styles from './PropertyList.module.scss'

const PropertyList = () => (
  <ul className={styles.PropertyList}>
    <PropertyItem />
    <PropertyItem />
    <PropertyItem />
    <PropertyItem />
  </ul>
)

export default PropertyList
