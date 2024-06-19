import SQLite from 'better-sqlite3'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import { MenuTable } from 'models/menu'

export const sqlite = new SQLite('lebistro.db')

const dialect = new SqliteDialect({
  database: sqlite,
})

export interface Database {
  menu: MenuTable
}

export const db = new Kysely<Database>({
  dialect,
  plugins: [
    new CamelCasePlugin(),
  ],
})
