import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import { MenuTable } from 'models/menu'

const dialect = new SqliteDialect({
  database: new SQLite('lebistro.db'),
})

export interface Database {
  menu: MenuTable
}

export const db = new Kysely<Database>({
  dialect,
})
