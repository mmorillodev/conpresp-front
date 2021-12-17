import type { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'

import React, { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tag, { TagLevel } from '../Tag/Tag'
import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'

import useSession from '../../hooks/useSession'
import api from '../../apis/default'

import styles from './PatrimonyAdminItem.module.scss'

interface UserItemProps {
  patrimony: PatrimonyGeneral
  refetch: () => void
}

type PatrimonyConservationLevel = 'Baixo' | 'Regular' | 'Alto' | string

const tagLevelDict: { [key in PatrimonyConservationLevel]: TagLevel } = {
  alto: 'success',
  regular: 'warning',
  baixo: 'danger',
}

const UserItem: FC<UserItemProps> = ({
  patrimony: {
    id,
    conservationLevel,
    denomination,
    addressStreet,
    conservationLevelComment,
    type,
    resolutions,
  },
  refetch,
}) => {
  const {
    session: { token, isAuthenticated },
  } = useSession()
  const history = useHistory()
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [dialogSuccess, setDialogSuccess] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [dialogError, setDialogError] = useState(false)

  return (
    <div>
      <div className={styles.ButtonEffect}>
        <li className={styles.UserItem}>
          <h4> </h4>
          <h4> {resolutions.map(resolution => resolution.resolution)} </h4>
          <h4> {denomination} </h4>
          <Link className={styles.tag} to={`/patrimonios-admin?denomination=${denomination}`}>
            <Tag
              text={conservationLevel}
              level={tagLevelDict[conservationLevel.toLowerCase()]}
            />
          </Link>
          <Link className={styles.tag} to={`/patrimonios-admin?type=${type}`}>
            <Tag text={type} level={tagLevelDict[type.toLowerCase()]} />
          </Link>
          <div>
          <IconButton className={styles.IconButton}>
              <VisibilityIcon sx={{ color: '#1976d2' }} />
            </IconButton>
            <IconButton className={styles.IconButton}>
              <BorderColorIcon sx={{ color: '#1976d2' }} />
            </IconButton>
            <IconButton>
              <DeleteIcon sx={{ color: '#1976d2' }} />
            </IconButton>
          </div>
        </li>
        <hr />
      </div>
    </div>
  )
}

export default UserItem
