import { ColumnType, Insertable, Selectable, Updateable } from 'kysely'

export interface SessionTable {
  id: ColumnType<string, string, never>
  userId: ColumnType<string, string, never>
  expiredAt: number
}

export type Session = Selectable<SessionTable>
export type NewSession = Insertable<SessionTable>
export type UpdatingSession = Updateable<SessionTable>
