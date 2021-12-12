import type { FC } from 'react'

import useSession from '../../hooks/useSession'

const AuthenticatedArea: FC = ({ children }) => {
  const {
    session: { isAuthenticated },
  } = useSession()

  return <>{isAuthenticated && children}</>
}

export default AuthenticatedArea
