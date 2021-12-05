import { useEffect } from "react";
import { useQuery } from 'react-query';
import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'
import { UserGeneral } from '../../types/UserGeneral';
import UserList from '../../components/UserList/UserList'
import useURLSearchParams from '../../hooks/useURLSearchParams'


import api from '../../apis/default'
import { PageableResponse } from '../../types/PageableResponse'

import styles from './UserPage.module.scss'


const UserPage = () => {
  const params = useURLSearchParams()
  const { isLoading, data, refetch } = useQuery('usersList', () =>
    api.get<PageableResponse<UserGeneral>>(
      `/users?${params.toString()}`
    )
  )

  useEffect(() => {
    refetch()
  }, [params])

  return (
    <div className={styles.User}>
      <div className={styles.pageBanner} />
      <main className={styles.mainContent}>
        <h1>Usuários</h1>
        <span className={styles.pageDescr}>
          Página dedicada para gerenciar os usuários do sistema. Aqui você pode adicionar, atualizar, excluir e contrultar todos os usuários cadastrados.
        </span>
        <hr />
        <Button className={styles.Button}
          variant="outlined"
          sx={{
            borderRadius: '2rem',
            marginBottom: '2rem',
            marginLeft: 'auto',
          }}
          startIcon={<FilterListIcon sx={{ color: '#1976d2' }} />}
        >
          Filtrar
        </Button>

        {isLoading ? (
          <span>Carregando...</span>
        ) : (
          <UserList users={data?.data.content ?? []} data={data?.data} />
        )}
      </main>
    </div>
  )
}

export default UserPage
