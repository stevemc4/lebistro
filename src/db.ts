import SQLite from 'better-sqlite3'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import { MenuTable } from 'models/menu'
import { OrderItemTable, OrderTable } from 'models/order'
import { SessionTable } from 'models/session'
import { UserTable } from 'models/user'

export const sqlite = new SQLite('lebistro.db')

const dialect = new SqliteDialect({
  database: sqlite,
})

export interface Database {
  menu: MenuTable
  user: UserTable
  session: SessionTable
  order: OrderTable
  orderItem: OrderItemTable
}

export const db = new Kysely<Database>({
  dialect,
  plugins: [
    new CamelCasePlugin(),
  ],
})
