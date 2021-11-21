import type { FC } from 'react'
import styles from './PropertyItem.module.scss'

interface PropertyItemProps {
  id: string
  resolution: string
  denomination: string
  conservationDegree: string
  conservationState: string
  user: string
}

const PropertyItem: FC<PropertyItemProps> = ({
  id,
  resolution,
  denomination,
  conservationDegree,
  conservationState,
  user,
}) => (
  <li className={styles.PropertyItem}>
    <a className={styles.callToAction} href="/">
      <span>{id}</span>
      <span>{resolution}</span>
      <span>{denomination}</span>
      <span>{conservationDegree}</span>
      <span>{conservationState}</span>
      <span>{user}</span>
    </a>
  </li>
)

export default PropertyItem
