import type { FC } from 'react'
import styles from './Tag.module.scss'

export type TagLevel = 'danger' | 'warning' | 'success'

export interface TagProps {
  text: string
  level: TagLevel
}

const Tag: FC<TagProps> = ({ text, level }) => (
  <span className={`${styles.Tag} ${styles[`Tag--${level}`]}`}>{text}</span>
)

export default Tag
