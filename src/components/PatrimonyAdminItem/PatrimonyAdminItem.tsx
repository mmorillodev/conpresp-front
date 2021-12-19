import { useState } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Tag, { TagLevel } from '../Tag/Tag'
import { PatrimonyGeneral } from '../../types/PatrimonyGeneral'

import styles from './PatrimonyAdminItem.module.scss'
import DeletePopupModal from '../DeleteUserPopup/DeletePopup'
import PatrimonyDetails from '../PatrimonyDetails/PatrimonyDetails'
import useSession from '../../hooks/useSession'

interface PatrimonyItemProps {
  index: number
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

const PatrimonyItem: FC<PatrimonyItemProps> = ({
  index,
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
  const {
    session: { profile },
  } = useSession()

  return (
    <div>
      {open && (
        <PatrimonyDetails id={id} onCloseRequested={() => setOpen(false)} />
      )}
      <DeletePopupModal
        open={deleteDialog}
        onCloseRequest={() => setDeleteDialog(false)}
        id={id}
        endpoint="patrimony"
        refetch={refetch}
      />
      <li className={styles.PatrimonyItem}>
        <p>{index}</p>
        <p>
          {
            resolutions.find(
              resolution => resolution.institution.toLowerCase() === 'conpresp'
            )?.resolution
          }{' '}
        </p>
        <p> {denomination} </p>
        <Link
          className={styles.tag}
          data-tooltip="Filtrar por:"
          to={`/patrimonios-admin?conservationLevel=${conservationLevel}`}
        >
          <Tag
            text={conservationLevel}
            level={conservationLevelTag[conservationLevel.toLowerCase()]}
          />
        </Link>
        <Link
          className={styles.tag}
          data-tooltip="Filtrar por:"
          to={`/patrimonios-admin?modificationLevel=${modificationLevel}`}
        >
          <Tag
            text={modificationLevel}
            level={alterationLevelTag[modificationLevel.toLowerCase()]}
          />
        </Link>
        <div>
          <IconButton
            onClick={() => setOpen(true)}
            className={styles.IconButton}
          >
            <VisibilityIcon sx={{ color: '#1976d2' }} />
          </IconButton>
          <IconButton className={styles.IconButton}>
            <BorderColorIcon sx={{ color: '#1976d2' }} />
          </IconButton>
          {profile === 'ADMINISTRATOR' && (
            <IconButton onClick={() => setDeleteDialog(true)}>
              <DeleteIcon sx={{ color: '#1976d2' }} />
            </IconButton>
          )}
        </div>
      </li>
      <hr />
    </div>
  )
}

export default PatrimonyItem
