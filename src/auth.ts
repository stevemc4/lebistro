import { Lucia } from 'lucia'
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite'
import { sqlite } from 'db'
import { User } from 'models/user'

const adapter = new BetterSqlite3Adapter(sqlite, { user: 'user', session: 'session' })

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes): Omit<User, 'password'> => {
    return {
      id: attributes.id,
      email: attributes.email,
      username: attributes.username,
      role: attributes.role,
      name: attributes.name,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    }
  },
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: User
  }
}
