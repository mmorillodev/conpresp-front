import { Link } from 'react-router-dom'

import background from '../../assets/background.svg'
import anhembiLogo from '../../assets/anhembiLogo.svg'
import roundedLogo from '../../assets/roundedLogo.svg'

import styles from './Login.module.scss'

const Login = () => (
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

      <form className={styles.form}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input placeholder="Digite seu e-mail" />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input placeholder="Digite seu e-mail" />

          <Link to="/" className={styles.forgotPassword}>
            Esqueceu a senha?
          </Link>
        </div>

        <button className={styles.buttonLogin} type="button">
          Iniciar sessão
        </button>
      </form>
    </div>
  </div>
)

export default Login
