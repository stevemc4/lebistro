import { db } from 'db'
import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface MenuTable {
  id: Generated<number>
  name: string
  slug: string
  price: number
  createdAt: ColumnType<Date, string | undefined, never>
  updatedAt: ColumnType<Date, string | undefined, string | undefined>
}

export type Menu = Selectable<MenuTable>
export type NewMenu = Insertable<MenuTable>
export type UpdatingMenu = Updateable<MenuTable>

export async function getAllMenu() {
  return await db.selectFrom('menu').selectAll().execute()
}

export async function createMenu(menu: NewMenu) {
  await db.insertInto('menu').values(menu).execute()
}
