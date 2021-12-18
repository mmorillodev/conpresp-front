import type { FC } from 'react'
import { Link } from 'react-router-dom'

import React, { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Tag, { TagLevel } from '../Tag/Tag'
import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'

import styles from './PatrimonyAdminItem.module.scss'
import DeletePopupModal from '../DeleteUserPopup/DeletePopup'
import PatrimonyDetails from '../PatrimonyDetails/PatrimonyDetails'

interface UserItemProps {
  patrimony: PatrimonyGeneral
  refetch: () => void
}

type PatrimonyConservationLevel = 'Baixo' | 'Regular' | 'Alto' | string
type PatrimonyAlterationLevel =
  | 'Decaracterizado'
  | 'Alterado'
  | 'Preservado'
  | string

const conservationLevelTag: { [key in PatrimonyConservationLevel]: TagLevel } =
  {
    bom: 'success',
    regular: 'warning',
    ruim: 'danger',
  }

const alterationLevelTag: { [key in PatrimonyAlterationLevel]: TagLevel } = {
  preservado: 'success',
  alterado: 'warning',
  descaracterizado: 'danger',
}

const UserItem: FC<UserItemProps> = ({
  patrimony: {
    id,
    conservationLevel,
    denomination,
    modificationLevel,
    resolutions,
  },
  refetch,
}) => {
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <div>
      <PatrimonyDetails
        id={id}
        open={open}
        onCloseRequested={() => setOpen(false)}
      />
      <DeletePopupModal
        open={deleteDialog}
        onCloseRequest={() => setDeleteDialog(false)}
        id={id}
        endpoint="patrimony"
        refetch={refetch}
      />
      <div className={styles.ButtonEffect}>
        <li className={styles.UserItem}>
          <h4> </h4>
          <h4> {
                resolutions.find(
                  resolution =>
                    resolution.institution.toLowerCase() === 'conpresp'
                )?.resolution
              } </h4>
          <h4> {denomination} </h4>
          <Link
            className={styles.tag}
            to={`/patrimonios-admin?conservationLevel=${conservationLevel}`}
          >
            <Tag
              text={conservationLevel}
              level={conservationLevelTag[conservationLevel.toLowerCase()]}
            />
          </Link>
          <Link
            className={styles.tag}
            to={`/patrimonios-admin?modificationLevel=${modificationLevel}`}
          >
            <Tag
              text={modificationLevel}
              level={alterationLevelTag[modificationLevel.toLowerCase()]}
            />
          </Link>
          <div>
            <IconButton onClick={() => setOpen(true)} className={styles.IconButton}>
              <VisibilityIcon sx={{ color: '#1976d2' }} />
            </IconButton>
            <IconButton className={styles.IconButton}>
              <BorderColorIcon sx={{ color: '#1976d2' }} />
            </IconButton>
            <IconButton onClick={() => setDeleteDialog(true)}>
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
