import styles from './Login.module.scss'
import fundo from '../../assets/background.svg'
import logoRedondo from '../../assets/logoRedondo.svg'
import logoAnhembi from '../../assets/logoAnhembi.svg'

const Login = () => (
  <div className={styles.container}>
    <div className={styles.logoFundo}>
      <img src={fundo} alt="banner" />
      {/* <img src={logoAnhembi} alt="logo Anhembi"/> */}
    </div>
    <div className={styles.login}>
      <div className={styles.logoRedondo}>
        <img src={logoRedondo} alt="logo redondo" />
        <p className={styles.Slogan}>
          Banco de dados dos bens tombados da Cidade de São Paulo
        </p>
      </div>

      <form className={styles.form}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" />
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" />
        </div>

        <div>
          <a href="./sla" className={styles.esqueceuSenha}>
            Esqueceu a senha?
          </a>
          <input
            className={styles.buttonLogin}
            type="button"
            value="Iniciar sessão"
          />
        </div>
      </form>
    </div>
  </div>
)

export default Login
