import { Route, Switch, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
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
      <main>
        <Switch>
          <Route component={PropertyPage} path="/patrimonios" />
          <Route component={User} path="/usuarios" />
          <Route component={Login} path="/login" />
        </Switch>
      </main>
      <Footer />
    </QueryClientProvider>
  )
}

export default App
