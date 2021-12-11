import { FC, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'

import useURLSearchParams from '../../hooks/useURLSearchParams'

interface PaginationProps {
  count?: number
}

const Paginator: FC<PaginationProps> = ({ count }) => {
  const params = useURLSearchParams()
  const history = useHistory()

  const onPageChange = useCallback(
    (pageNumber: number) => {
      params.delete('page')
      const hasOtherParams = params.entries.length > 0

      history.push(
        `${history.location.pathname}?${params.toString()}${
          hasOtherParams ? '&' : ''
        }page=${pageNumber - 1}`
      )
    },
    [history, params]
  )
  return (
    <Pagination
      count={count}
      shape="rounded"
      onChange={(_, v) => onPageChange(v)}
      sx={{ display: 'flex', justifyContent: 'flex-end' }}
    />
  )
}

export default Paginator
