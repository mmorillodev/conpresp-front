import { BrowserRouter, Route } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import Login from '../../pages/Login/Login'
import styles from './App.module.scss'

const App = () => (
  <div className={styles.App}>
    <BrowserRouter>
      <Route component={Home} path="/patrimonios" />
      <Route component={Login} path="/login" />
    </BrowserRouter>
  </div>
)

export default App
