import { FC } from 'react'
import Select from '../../components/Select/Select'

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
          <Select disabled>
            <option>Grupo UAM</option>
            <option>Conpresp</option>
            <option>DHP</option>
          </Select>
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
      <section>
        <div className={styles.sectionTitle}>
          <h2>Localização</h2>
          <span>
            Preencher os dados de localização d bem, utilizando as ferramentas
            disponíveis em: <a href="/">GEOSAMPA</a> e{' '}
            <a href="/">CADASTRO DE IMÓVEIS TOMBADOS</a>
          </span>
        </div>
        <div className={styles.flexbox}>
          <label>
            <h4>Tipo</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>Título</h4>
            <Select placeholder="Label">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Select>
          </label>
        </div>
        <div className={styles.flexbox}>
          <label style={{ flex: 3 }}>
            <h4>Logradouro</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>Número</h4>
            <input placeholder="Label" />
          </label>
        </div>
        <div className={styles.flexbox}>
          <label>
            <h4>Distrito</h4>
            <Select placeholder="Label">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Select>
          </label>
          <label>
            <h4>Prefeitura Regional</h4>
            <Select placeholder="Label">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Select>
          </label>
        </div>
        <div className={styles.flexbox}>
          <label>
            <h4>Setor</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>Quadra</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>Lote</h4>
            <input placeholder="Label" />
          </label>
        </div>
      </section>
      <section>
        <div className={styles.sectionTitle}>
          <h2>Ficha técnica</h2>
        </div>
        <div className={styles.flexbox}>
          <label>
            <h4>Autor do projeto original</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>Construtor</h4>
            <input placeholder="Label" />
          </label>
        </div>
        <div className={styles.flexbox}>
          <label>
            <h4>Data de construção</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>&nbsp;</h4>
            <input placeholder="Label" />
          </label>
        </div>
        <div className={styles.flexbox}>
          <label>
            <h4>Estilo arquitetônico</h4>
            <Select placeholder="Label">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Select>
          </label>
          <label>
            <h4>Técnica Construtiva</h4>
            <Select placeholder="Label">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Select>
          </label>
        </div>
        <div className={styles.flexbox}>
          <label>
            <h4>Número de pavimentos</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>Área do lote (m2)</h4>
            <input placeholder="Label" />
          </label>
        </div>
        <div className={styles.flexbox}>
          <label>
            <h4>Área construída (m2)</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>Grau de tombamento</h4>
            <input placeholder="Label" />
          </label>
          <label>
            <h4>Grau de alteração</h4>
            <Select placeholder="Label">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Select>
          </label>
        </div>
        <label>
          <h4>Comentário do grau de alteração</h4>
          <textarea placeholder="Label" />
        </label>
        <label>
          <h4>Estado de conservação</h4>
          <Select placeholder="Label">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Select>
        </label>
        <label>
          <h4>Comentário do estado de conservação</h4>
          <textarea placeholder="Label" />
        </label>
        <label>
          <h4>Observações (pavimentos)</h4>
          <textarea placeholder="Label" />
        </label>
      </section>
      <section>
        <div className={styles.sectionTitle}>
          <h2>Descrição</h2>
        </div>
        <label>
          <h4>Dados históricos</h4>
          <textarea placeholder="Label" />
        </label>
        <label>
          <h4>Dados arquitetônicos</h4>
          <textarea placeholder="Label" />
        </label>
        <label>
          <h4>Dados de ambiência</h4>
          <textarea placeholder="Label" />
        </label>
        <label>
          <h4>Fontes bibliográficas</h4>
          <textarea placeholder="Label" />
        </label>
        <label>
          <h4>Outras informações</h4>
          <textarea placeholder="Label" />
        </label>
        <label>
          <h4>Observações</h4>
          <textarea placeholder="Label" />
        </label>
      </section>
    </form>
  </>
)

export default NewPatrimony
