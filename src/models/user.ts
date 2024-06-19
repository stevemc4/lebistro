import { lucia } from 'auth'
import { db } from 'db'
import { ColumnType, Insertable, Selectable, Updateable } from 'kysely'
import { Argon2id } from 'oslo/password'

export type UserRoles = 'admin' | 'owner' | 'manager' | 'staff' | 'customer'

const argon2Id = new Argon2id()

export interface UserTable {
  id: ColumnType<string, string, never>
  email: string | null
  username: string | null
  password: string
  role: UserRoles
  name: string
  createdAt: ColumnType<number, number | undefined, never>
  updatedAt: ColumnType<number, number | undefined, number | undefined>
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UpdatingUser = Updateable<UserTable>

export async function login(usernameOrEmail: string, password: string) {
  const user = await db.selectFrom('user').selectAll().where(eb => eb.or([eb('username', '==', usernameOrEmail), eb('email', '==', usernameOrEmail)])).executeTakeFirst()
  if (!user) return null

  const isPasswordValid = await argon2Id.verify(user.password, password)
  if (!isPasswordValid) return null

  const session = await lucia.createSession(user.id, {})
  const cookie = lucia.createSessionCookie(session.id)
  return cookie
}
