import { useEffect } from 'react'
import { useQuery } from 'react-query'

import useURLSearchParams from './useURLSearchParams'
import api from '../apis/default'

const usePageFetch = <T>(resourceName: string) => {
  const params = useURLSearchParams()

  const { isLoading, data, refetch } = useQuery(resourceName, () =>
    api.get<T>(`/${resourceName}?${params.toString()}`)
  )

  useEffect(() => {
    refetch()
  }, [params])

  return { isLoading, data }
}

export default usePageFetch
