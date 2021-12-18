import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Snackbar } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import useSession from '../../hooks/useSession'

import background from '../../assets/background.svg'
import anhembiLogo from '../../assets/anhembiLogo.svg'
import roundedLogo from '../../assets/roundedLogo.svg'

import styles from './Login.module.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const {
    createSession,
    session: { isAuthenticated, profile },
    isLoading,
    error,
  } = useSession()
  const history = useHistory()

  const submitHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      createSession(email, password)
    },
    [email, password, createSession]
  )

  useEffect(() => {
    if (isAuthenticated) {
      if (profile !== 'COMMON') {
        history.push('/patrimonios-admin')
      } else {
        history.push('/patrimonios')
      }
    }
  }, [isAuthenticated, history])

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true)
    }
  }, [error, setSnackbarOpen])

  return (
    <div className={styles.Login}>
      <div
        className={styles.backgroundWrapper}
        style={{ backgroundImage: `url(${background})` }}
      >
        <span>Ilustrações feitas por Mariana Cerqueira</span>
        <img
          className={styles.anhembiLogo}
          src={anhembiLogo}
          alt="anhembi logo"
        />
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.roundedLogo}>
          <img src={roundedLogo} alt="logo redondo" />
          <p className={styles.slogan}>
            Banco de dados dos bens tombados da Cidade de São Paulo
          </p>
        </div>

        <form className={styles.form} onSubmit={submitHandler}>
          <div>
            <label htmlFor="email">E-mail:</label>
            <input
              placeholder="Digite seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Senha:</label>
            <input
              placeholder="Digite sua senha"
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
            />

            <Link to="/" className={styles.forgotPassword}>
              Esqueceu a senha?
            </Link>
          </div>

          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            style={{ backgroundColor: '#29a3a3', width: '100%' }}
          >
            Iniciar sessão
          </LoadingButton>
        </form>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message="Email e/ou senha inválidos"
      />
    </div>
  )
}

export default Login
