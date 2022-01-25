import { FC, SelectHTMLAttributes } from 'react'

import styles from './Select.module.scss'

const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = ({
  children,
  ...rest
}) => (
  <div className={styles.wrapper}>
    <select className={styles.Select} {...rest}>
      {children}
    </select>
  </div>
)

export default Select
