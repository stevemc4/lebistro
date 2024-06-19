import { db } from 'db'
import { ColumnType, Generated, Insertable, Selectable, Updateable, sql } from 'kysely'

export interface MenuTable {
  id: Generated<number>
  name: string
  slug: string
  price: number
  createdAt: ColumnType<number, number | undefined, never>
  updatedAt: ColumnType<number, number | undefined, number | undefined>
}

export type Menu = Selectable<MenuTable>
export type NewMenu = Insertable<MenuTable>
export type UpdatingMenu = Updateable<MenuTable>

export async function getAllMenu() {
  return await db.selectFrom('menu').selectAll().execute()
}

export async function getMenuBySlug(slug: string) {
  return await db.selectFrom('menu').selectAll().where('slug', '==', slug).executeTakeFirst()
}

export async function updateMenu(id: number, updatingMenu: UpdatingMenu) {
  await db.updateTable('menu')
    .set({
      ...updatingMenu,
      updatedAt: sql`unixepoch()`,
    })
    .where('id', '==', id)
    .execute()
}

export async function createMenu(menu: NewMenu) {
  await db.insertInto('menu').values(menu).execute()
}
