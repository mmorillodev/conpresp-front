import { Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Header from './components/Header/Header'
import PropertyPage from './pages/PatrimonyPage/PatrimonyPage'
import Login from './pages/Login/Login'
import styles from './App.module.scss'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className={styles.App}>
      <Header />
      <Switch>
        <Route component={PropertyPage} path="/patrimonios" />
        <Route component={Login} path="/login" />
      </Switch>
    </div>
  </QueryClientProvider>
)

export default App
