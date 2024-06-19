import { ColumnType, Insertable, Selectable, Updateable } from 'kysely'

export type UserRoles = 'admin' | 'owner' | 'manager' | 'staff' | 'customer'

interface UserTable {
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
