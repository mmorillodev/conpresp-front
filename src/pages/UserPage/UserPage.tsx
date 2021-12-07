import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { UserGeneral } from '../../types/UserGeneral'
import UserList from '../../components/UserList/UserList'
import useURLSearchParams from '../../hooks/useURLSearchParams'
import Filters, { FilterFacet } from '../../components/PatrimonyFilters/Filters'
import UserModal, { UserFacet } from '../../components/NewUser/UserModal'

import api from '../../apis/default'
import { PageableResponse } from '../../types/PageableResponse'

import styles from './UserPage.module.scss'

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
    label: 'E-email',
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

const newUserFacets: UserFacet[] = [
  {
    label: 'Perfil',
    name: 'profile',
  },
  {
    label: 'Grupo',
    name: 'userGroup',
  },
  {
    label: 'Nome',
    name: 'firstName',
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
    label: 'Senha',
    name: 'password',
  },
  {
    label: 'Confirme a Senha',
    name: 'confirmPassword',
  },
]

const UserPage = () => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [addUser, setAddUser] = useState(false)
  const params = useURLSearchParams()
  const { isLoading, data, refetch } = useQuery('usersList', () =>
    api.get<PageableResponse<UserGeneral>>(`/users?${params.toString()}`)
  )

  useEffect(() => {
    refetch()
  }, [params])

  return (
    <div className={styles.User}>
      <Filters
        open={filterOpen}
        onCloseRequested={() => setFilterOpen(false)}
        facets={filterFacets}
      />
      <UserModal
        open={addUser}
        onCloseRequested={() => setAddUser(false)}
        textFacets={newUserFacets}
      />
      <div className={styles.pageBanner} />
      <main className={styles.mainContent}>
        <h1>Usuários</h1>
        <span className={styles.pageDescr}>
          Página dedicada para gerenciar os usuários do sistema. Aqui você pode
          adicionar, atualizar, excluir e contrultar todos os usuários
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
          <UserList users={data?.data.content ?? []} data={data?.data} />
        )}
      </main>
    </div>
  )
}

export default UserPage
