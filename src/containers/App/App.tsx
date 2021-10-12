import { BrowserRouter, Route } from 'react-router-dom'
import Login from '@pages/Login/Login'
import styles from './App.module.scss'

const App = () => (
  <div className={styles.App}>
    <BrowserRouter>
      <Route component={Login} path="/login" />
    </BrowserRouter>
  </div>
)

export default App
