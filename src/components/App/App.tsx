import { BrowserRouter, Route } from 'react-router-dom'
import PropertyPage from '../../pages/PropertyPage/PropertyPage'
import Login from '../../pages/Login/Login'
import styles from './App.module.scss'

const App = () => (
  <div className={styles.App}>
    <BrowserRouter>
      <Route component={PropertyPage} path="/patrimonios" />
      <Route component={Login} path="/login" />
    </BrowserRouter>
  </div>
)

export default App
