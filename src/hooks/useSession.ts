import { useCallback, useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { DateTime } from 'luxon'

import { RequestError } from '../types/RequestError'
import AuthResponse from '../types/AuthResponse'
import useLocalStorage from './useLocalStorage'
import api from '../apis/default'

interface Session {
  isAuthenticated: boolean
  token: string
  type: string
  profile: string
  createdAt?: string
}

const useSession = () => {
  const [session, setSession, destroySession] = useLocalStorage<Session>(
    'session',
    {
      isAuthenticated: false,
      token: '',
      type: '',
      profile: '',
    }
  )
  const [error, setError] = useState<undefined | object>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const createSession = useCallback(
    (email: string, password: string) => {
      setIsLoading(true)

      return api
        .post<AuthResponse>('/auth', { email, password })
        .then(({ data: { token, type, profile } }) => {
          setSession({
            isAuthenticated: true,
            token,
            type,
            createdAt: DateTime.now().toISO(),
            profile,
          })
        })
        .catch((e: AxiosError<RequestError>) => {
          setError(e.response?.data)
        })
        .finally(() => setIsLoading(false))
    },
    [api, session, setSession, setIsLoading, setError]
  )

  useEffect(() => {
    if (session.isAuthenticated && session.createdAt) {
      const sessionExpiration = Number(
        process.env.REACT_APP_SESSION_DURATION ?? 0
      )

      const sessionCreatedDateTime = DateTime.fromISO(session.createdAt)

      if (sessionCreatedDateTime.plus(sessionExpiration) < DateTime.now()) {
        setSession({ ...session, isAuthenticated: false })
      }
    }
  }, [session, setSession])

  return { session, createSession, destroySession, error, isLoading }
}

export default useSession
