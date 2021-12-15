import { useEffect } from 'react'
import { useQuery } from 'react-query'

import useURLSearchParams from './useURLSearchParams'
import api from '../apis/default'
import useSession from './useSession'

const usePageFetch = <T>(resourceName: string) => {
  const params = useURLSearchParams()
  const {
    session: { token, type },
  } = useSession()

  const { isLoading, data, refetch } = useQuery(resourceName, () =>
    api.get<T>(`/${resourceName}?${params.toString()}`, {
      headers: { Authorization: `${type} ${token}` },
    })
  )

  useEffect(() => {
    refetch()
  }, [params])

  return { isLoading, data, refetch }
}

export default usePageFetch
