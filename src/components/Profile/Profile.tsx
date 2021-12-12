import { useState, MouseEvent, useCallback } from 'react'

import { Menu, MenuItem } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import usePageFetch from '../../hooks/usePageFetch'
import useSession from '../../hooks/useSession'

import { UserDetails } from '../../types/UserDetails'

import styles from './Profile.module.scss'

const Profile = () => {
  const { data, isLoading } = usePageFetch<UserDetails>('users/user-info')
  const { destroySession } = useSession()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined)
  const [open, setOpen] = useState(false)

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget)
      setOpen(!open)
    },
    [setAnchorEl, setOpen, open]
  )

  if (isLoading) return <span>Carregando...</span>

  return (
    <span className={styles.Profile}>
      Olá,{' '}
      <button type="button" onClick={handleClick}>
        {data?.data.firstName}
        <KeyboardArrowDownIcon />
      </button>
      <Menu open={open} onClose={() => setOpen(false)} anchorEl={anchorEl}>
        <MenuItem onClick={() => destroySession()}>Logout</MenuItem>
      </Menu>
    </span>
  )
}

export default Profile
