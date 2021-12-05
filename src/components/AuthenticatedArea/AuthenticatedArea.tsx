import type { FC } from 'react'

import useSession from '../../hooks/useSession'

const AuthenticatedArea: FC = ({ children }) => {
  const { session } = useSession()

  return <>{session.isAuthenticated && children}</>
}

export default AuthenticatedArea
