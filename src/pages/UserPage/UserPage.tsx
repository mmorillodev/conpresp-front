import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { UserDetails, UserGeneral } from '../../types/UserGeneral'
import UserList from '../../components/UserList/UserList'
import useURLSearchParams from '../../hooks/useURLSearchParams'
import Filters, { FilterFacet } from '../../components/PatrimonyFilters/Filters'
import UserModal from '../../components/NewUser/UserModal'
import UpdateUserModal from '../../components/UpdateUser/UserUpdateModal'

import api from '../../apis/default'
import { PageableResponse } from '../../types/PageableResponse'

import styles from './UserPage.module.scss'
import useSession from '../../hooks/useSession'
import { truncate } from 'fs'
import DeletePopupModal from '../../components/DeleteUserPopup/DeletePopup'

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
    session: { token },
  } = useSession()
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const [filterOpen, setFilterOpen] = useState(false)
  const [addUser, setAddUser] = useState(false)
  const [dialogSucess, setDialogSucess] = useState(false)
  const [dialogError, setDialogError] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [userId, setUserId] = useState(String)
  const params = useURLSearchParams()
  const history = useHistory()
  const [user, setUser] = useState<UserDetails>()
  const { isLoading, data, refetch } = useQuery('usersList', () =>
    api.get<PageableResponse<UserGeneral>>(
      `/users?${params.toString()}`,
      axiosConfig
    )
  )

  useEffect(() => {
    refetch()
  }, [params])

  async function deleteUser() {
    await api
      .delete(`/users/${userId}`, axiosConfig)
      .then(response => {
        refetch()
        setDeleteDialog(false)
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          setDialogError(true)
        }
      })
  }

  async function getUser() {
    await api
      .get<UserDetails>(`/users/${userId}`, axiosConfig)
      .then(response => {
        setUser(response.data)
      })
      .catch(({ response }) => {})
  }

  return (
    <div className={styles.User}>
      <Dialog
        open={dialogSucess}
        onClose={() => {
          setDialogSucess(false)
        }}
      >
        <DialogTitle id="statusCode200">Sucesso</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Usuário adicionado com sucesso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogSucess(false)
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialogError}
        onClose={() => {
          setDialogError(false)
        }}
      >
        <DialogTitle id="badRequestDialog">Erro</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Houve um erro inesperado, atualize a página e tente novamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogError(false)
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Filters
        open={filterOpen}
        onCloseRequested={() => setFilterOpen(false)}
        facets={filterFacets}
      />

      <UserModal
        open={addUser}
        token={token}
        onCloseRequested={() => setAddUser(false)}
        dialogSucess={() => setDialogSucess(true)}
        dialogError={() => setDialogError(true)}
      />

      <UpdateUserModal
        open={openUpdateModal}
        id={userId}
        onCloseRequested={() => setOpenUpdateModal(false)}
        token={token}
        user={user}
      />

      <DeletePopupModal
      open={deleteDialog}
      onCloseRequest={() => setDeleteDialog(false)}
      deleteUser={() => deleteUser()}
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
          <UserList
            userId={setUserId}
            users={data?.data.content ?? []}
            data={data?.data}
            token={token}
            openDeleteDialog={() => {
              setDeleteDialog(true)
            }}
            openUpdateModal={async () => {
              await getUser()
              setOpenUpdateModal(true)
              console.log(user)
            }}
          />
        )}
      </main>
    </div>
  )
}

export default UserPage
