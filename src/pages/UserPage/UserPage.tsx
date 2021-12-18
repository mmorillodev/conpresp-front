import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { UserGeneral } from '../../types/UserGeneral'
import UserList from '../../components/UserList/UserList'
import Filters, { FilterFacet } from '../../components/PatrimonyFilters/Filters'
import UserModal from '../../components/NewUserModal/UserModal'


import { PageableResponse } from '../../types/PageableResponse'
import usePageFetch from '../../hooks/usePageFetch'

import styles from './UserPage.module.scss'
import useSession from '../../hooks/useSession'

import ModalDialog from '../../components/ModalDialog/ModalDialog'

const filterFacets: FilterFacet[] = [
  {
    label: 'Nome',
    name: 'name',
  },
  {
    label: 'Sobrenome',
    name: 'lastName',
  },
  {
    label: 'E-mail',
    name: 'email',
  },
  {
    label: 'Perfil',
    name: 'profile',
  },
  {
    label: 'Status',
    name: 'status',
  },
]

const UserPage = () => {
  const {
    session: { isAuthenticated, profile },
  } = useSession()
  const history = useHistory()
  const [filterOpen, setFilterOpen] = useState(false)
  const [addUser, setAddUser] = useState(false)
  const [dialogSuccess, setDialogSuccess] = useState(false)
  const [dialogError, setDialogError] = useState(false)
  const { isLoading, data, refetch } =
    usePageFetch<PageableResponse<UserGeneral>>('users')

  if (!isAuthenticated || profile !== 'ADMINISTRATOR') {
    history.push('/login')
  }

  return (
    <div className={styles.User}>
      <ModalDialog
        open={dialogSuccess}
        messageType="success"
        title="Sucesso."
        message="O usuário foi adicionado com sucesso."
        buttonMessage="Confirmar"
        onCloseRequest={() => setDialogSuccess(false)}
        closeFunction={() => setAddUser(false)}
        refetch={refetch}
      />

      <ModalDialog
        open={dialogError}
        messageType="error"
        title="Erro."
        message="Houve um erro inesperado, por favor verifique os campos e tente novamente."
        buttonMessage="Confirmar"
        onCloseRequest={() => setDialogError(false)}
        closeFunction={() => {}}
        refetch={refetch}
      />

      <Filters
        open={filterOpen}
        onCloseRequested={() => setFilterOpen(false)}
        facets={filterFacets}
      />

      <UserModal
        open={addUser}
        onCloseRequested={() => setAddUser(false)}
        dialogSuccess={() => setDialogSuccess(true)}
        dialogError={() => setDialogError(true)}
      />

      <div className={styles.pageBanner} />
      <main className={styles.mainContent}>
        <h1>Usuários</h1>
        <span className={styles.pageDescr}>
          Página dedicada para gerenciar os usuários do sistema. Aqui você pode
          adicionar, atualizar, excluir e consultar todos os usuários
          cadastrados.
        </span>
        <hr />
        <div className={styles.Button}>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '2rem',
              marginTop: '1rem',
              marginBottom: '2rem',
            }}
            onClick={() => setFilterOpen(true)}
            startIcon={<FilterListIcon sx={{ color: '#1976d2' }} />}
          >
            Filtrar
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: '.5rem',
              marginTop: '1rem',
              marginBottom: '2rem',
              marginLeft: 'auto',
              background: '#1DA6D1',
            }}
            onClick={() => setAddUser(true)}
            startIcon={<AddIcon sx={{ color: 'white' }} />}
          >
            Novo Usuário
          </Button>
        </div>

        {isLoading ? (
          <span> Carregando...</span>
        ) : (
          <UserList
            users={data?.data.content ?? []}
            data={data?.data}
            refetch={refetch}
          />
        )}
      </main>
    </div>
  )
}

export default UserPage
