import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('menu')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('name', 'varchar(128)', col => col.notNull())
    .addColumn('slug', 'varchar(128)', col => col.notNull())
    .addColumn('price', 'bigint', col => col.notNull())
    .addColumn('createdAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn('updatedAt', 'text', col => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .execute()

  await db.schema
    .createIndex('idx_menu_name')
    .on('menu')
    .column('name')
    .execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable('menu').execute()
}
