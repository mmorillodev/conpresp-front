import properties from '../../__mocks__/properties'
import PropertyItem from '../PropertyItem/PropertyItem'

import styles from './PropertyList.module.scss'

// TODO - extract this table into a separated component
const PropertyList = () => (
  <ul className={styles.PropertyList}>
    <div className={styles.listHeader}>
      <h4>Id</h4>
      <h4>Conpresp/Resolução</h4>
      <h4>Denominação</h4>
      <h4>Grau de conservação</h4>
      <h4>Estado de conservação</h4>
      <h4>Responsável pelo preenchimento</h4>
    </div>
    {properties.map(
      ({
        id,
        user,
        conservationDegree,
        conservationState,
        denomination,
        resolutionItem,
      }) => (
        <PropertyItem
          key={id}
          id={id}
          user={user}
          conservationDegree={conservationDegree}
          conservationState={conservationState}
          denomination={denomination}
          resolution={resolutionItem}
        />
      )
    )}
  </ul>
)

export default PropertyList
