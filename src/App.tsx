import { Route, Switch, useLocation, Redirect } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import PropertyPage from './pages/PatrimonyPage/PatrimonyPage'
import Login from './pages/Login/Login'
import UserPage from './pages/UserPage/UserPage'
import PatrimonyAdmin from './pages/PatrimonyAdmin/PatrimonyAdmin'

const queryClient = new QueryClient()

const App = () => {
  const location = useLocation()

  const Index = () => <Redirect to="/patrimonios" />

  return (
    <QueryClientProvider client={queryClient}>
      {location.pathname !== '/login' && <Header />}
      <main>
        <Switch>
          <Route exact component={PropertyPage} path="/patrimonios" />
          <Route exact component={UserPage} path="/usuarios" />
          <Route exact component={Login} path="/login" />
          <Route exact component={PropertyPage} path="/patrimonios" />
          <Route exact component={UserPage} path="/usuarios" />
          <Route exact component={Login} path="/login" />
          <Route exact component={PatrimonyAdmin} path="/patrimonios-admin" />
          <Route exact component={Index} path="/*" />
        </Switch>
      </main>
      {location.pathname !== '/login' && <Footer />}
    </QueryClientProvider>
  )
}

export default App
