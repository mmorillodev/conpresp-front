import { useCallback, useState } from 'react'
import { AxiosError } from 'axios'

import AuthResponse from '../types/AuthResponse'
import useLocalStorage from './useLocalStorage'
import api from '../apis/default'
import { RequestError } from '../types/RequestError'

interface Session {
  isAuthenticated: boolean
  token: string
  type: string
}

const useSession = () => {
  const [session, setSession] = useLocalStorage<Session>('session', {
    isAuthenticated: false,
    token: '',
    type: '',
  })
  const [error, setError] = useState<undefined | object>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const createSession = useCallback(
    (email: string, password: string) => {
      setIsLoading(true)

      return api
        .post<AuthResponse>('/auth', { email, password })
        .then(({ data: { token, type } }) =>
          setSession({ isAuthenticated: true, token, type })
        )
        .catch((e: AxiosError<RequestError>) => {
          setError(e.response?.data)
        })
        .finally(() => setIsLoading(false))
    },
    [session, setSession]
  )

  return { session, createSession, error, isLoading }
}

export default useSession
