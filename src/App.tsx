import { Route, Switch, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import PropertyPage from './pages/PatrimonyPage/PatrimonyPage'
import Login from './pages/Login/Login'
import UserPage from './pages/UserPage/UserPage'
import PatrimonyDetailsPage from './pages/PatrimonyDetailsPage/PatrimonyDetailsPage'

const queryClient = new QueryClient()

const App = () => {
  const location = useLocation()

  return (
    <QueryClientProvider client={queryClient}>
      {location.pathname !== '/login' && <Header />}
      <main>
        <Switch>
          <Route exact component={PropertyPage} path="/patrimonios" />
          <Route
            exact
            component={PatrimonyDetailsPage}
            path="/patrimonios/:id"
          />
          <Route exact component={UserPage} path="/usuarios" />
          <Route exact component={Login} path="/login" />
        </Switch>
      </main>
      {location.pathname !== '/login' && <Footer />}
    </QueryClientProvider>
  )
}

export default App
