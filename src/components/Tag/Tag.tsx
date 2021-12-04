import type { CSSProperties, FC } from 'react'
import styles from './Tag.module.scss'

interface TagProps {
  text: string
}

const background = (value: string) => {
  switch (value) {
    case 'Preservado':
      return '#D8F9D8'
    case 'Bom':
      return '#D8F9D8'
    case 'Alterado':
      return '#FFF6C9'
    case 'Regular':
      return '#FFF6C9'
    case 'Descaracterizado':
      return '#FEEAEA'
    case 'Ruim':
      return '#FEEAEA'
    default:
      return '#e5e5e5'
  }
}

const color = (value: string) => {
  switch (value) {
    case 'Preservado':
      return '#1C9B4F'
    case 'Bom':
      return '#1C9B4F'
    case 'Alterado':
      return '#E88D23'
    case 'Regular':
      return '#E88D23'
    case 'Descaracterizado':
      return '#DB2E62'
    case 'Ruim':
      return '#DB2E62'
    default:
      return '#383838'
  }
}

const Tag: FC<TagProps> = ({ text }) => (
  <span
    className={styles.Tag}
    style={
      {
        '--background': background(text),
        '--color': color(text),
      } as CSSProperties
    }
  >
    {text}
  </span>
)

export default Tag
