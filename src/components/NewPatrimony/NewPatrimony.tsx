import { FC } from 'react'

import styles from './NewPatrimony.module.scss'

const NewPatrimony: FC = () => (
  <>
    <section className={styles.mainContent}>
      <h1>Adicionar novo</h1>
      <span className={styles.pageDescr}>
        Pharetra aenean tellus mauris, viverra tortor morbi sit. Viverra nunc
        neque dignissim vulputate. Eu hendrerit et tincidunt hendrerit malesuada
        felis, felis sem purus. Placerat pharetra pretium massa viverra. Blandit
        commodo ultrices feugiat tellus.
      </span>
      <hr />
    </section>
    <form>
      <section>
        <h2>Responsável Técnico</h2>
        <span>
          Informações básicas do técnico responsável pelo preenchimento
        </span>
        <label>
          Responsável pelo preenchimento
          <input disabled />
        </label>
        <label>
          Grupo
          <input disabled />
        </label>
      </section>
      <section>
        <h2>Dados Gerais</h2>
        <span>Dados gerais do tombamento</span>
        <label>
          Responsável pelo preenchimento
          <input />
        </label>
        <label>
          Responsável pelo preenchimento
          <input />
        </label>
        <label>
          Responsável pelo preenchimento
          <input />
        </label>
        <label>
          Responsável pelo preenchimento
          <input />
        </label>
        <label>
          Responsável pelo preenchimento
          <input />
        </label>
        <label>
          Responsável pelo preenchimento
          <input />
        </label>
      </section>
    </form>
  </>
)

export default NewPatrimony
