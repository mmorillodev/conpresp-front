import { Route, Switch, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Header from './components/Header/Header'
import PropertyPage from './pages/PatrimonyPage/PatrimonyPage'
import Login from './pages/Login/Login'
import User from './pages/UserPage/UserPage'
import styles from './App.module.scss'

const queryClient = new QueryClient()

const App = () => {
  const location = useLocation()

  return (
    <QueryClientProvider client={queryClient}>
      {location.pathname !== '/login' && <Header />}
      <Switch>
        <Route component={PropertyPage} path="/patrimonios" />
        <Route component={Login} path="/login" />
        <Route component={User} path="/usuarios" />
      </Switch>
    </QueryClientProvider>
  )
}

export default App
