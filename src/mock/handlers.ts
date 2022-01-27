import { rest } from 'msw'

export default [
  rest.get('http://localhost:8080/users/user-info', (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        id: '',
        profile: 'MODERATOR',
        userGroup: 'UAM',
        firstName: 'Matheus',
        lastName: 'Morillo',
        email: '',
        status: '',
        createdBy: '',
        createdAt: '',
        updatedAt: '',
        updatedBy: '',
      })
    )
  ),
]
