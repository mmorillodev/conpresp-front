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
        <div className={styles.sectionTitle}>
          <h2>Responsável Técnico</h2>
          <span>
            Informações básicas do técnico responsável pelo preenchimento
          </span>
        </div>
        <label>
          <h4>Responsável pelo preenchimento</h4>
          <input disabled value="Matheus Morillo" />
        </label>
        <label>
          <h4>Grupo</h4>
          <select disabled>
            <option>Grupo UAM</option>
            <option>Conpresp</option>
            <option>DHP</option>
          </select>
        </label>
      </section>
      <section>
        <div className={styles.sectionTitle}>
          <h2>Dados Gerais</h2>
          <span>Dados gerais do tombamento</span>
        </div>
        <div className={styles.flexbox}>
          <label style={{ flexBasis: '149px', flexGrow: 0 }}>
            <h4>Item na resolução</h4>
            <input placeholder="Número do bem" />
          </label>
          <label>
            <h4>Denominação</h4>
            <input placeholder="Nome do bem" />
          </label>
        </div>
        <div className={styles.flexbox}>
          <label>
            <h4>Classificação</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>Propriedade</h4>
            <input placeholder="Label" />
          </label>
        </div>
        <div className={styles.flexbox}>
          <label>
            <h4>Uso atual</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>Uso original</h4>
            <input placeholder="Label" />
          </label>
        </div>
      </section>
      <section>
        <div className={styles.sectionTitle}>
          <h2>Tombamento</h2>
          <span>Dados gerais do tombamento</span>
        </div>
        <div className={styles.resolutionItem}>
          <div className={styles.grayBgTitle}>Conpresp</div>
          <div className={styles.resolutionItemDesc}>
            <div style={{ flex: 3 }}>
              <h4>Resolução</h4>
              <input placeholder="Label" />
            </div>
            <div>
              <h4>Ano do Tombamento</h4>
              <input placeholder="Label" />
            </div>
          </div>
        </div>
        <div className={styles.resolutionItem}>
          <div className={styles.grayBgTitle}>Condepaat</div>
          <div className={styles.resolutionItemDesc}>
            <div style={{ flex: 3 }}>
              <h4>Resolução</h4>
              <input placeholder="Label" />
            </div>
            <div>
              <h4>Ano do Tombamento</h4>
              <input placeholder="Label" />
            </div>
          </div>
        </div>
        <div className={styles.resolutionItem}>
          <div className={styles.grayBgTitle}>Iphan</div>
          <div className={styles.resolutionItemDesc}>
            <div style={{ flex: 3 }}>
              <h4>Resolução</h4>
              <input placeholder="Label" />
            </div>
            <div>
              <h4>Ano do Tombamento</h4>
              <input placeholder="Label" />
            </div>
          </div>
        </div>
      </section>
    </form>
  </>
)

export default NewPatrimony
