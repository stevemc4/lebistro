import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'text', col => col.notNull().primaryKey())
    .addColumn('username', 'text', col => col.unique())
    .addColumn('email', 'text', col => col.unique())
    .addColumn('password', 'text', col => col.notNull())
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('role', 'text', col => col.notNull())
    .addColumn('created_at', 'integer', col => col.defaultTo(sql`(unixepoch())`).notNull())
    .addColumn('updated_at', 'integer', col => col.defaultTo(sql`(unixepoch())`).notNull())
    .execute()

  await db.schema
    .createTable('session')
    .addColumn('id', 'text', col => col.notNull().primaryKey())
    .addColumn('expires_at', 'integer', col => col.notNull())
    .addColumn('user_id', 'text', col => col.notNull())
    .addForeignKeyConstraint(
      'session_user_id_constraint',
      ['user_id'],
      'user',
      ['id'],
      cb => cb.onDelete('cascade'),
    )
    .execute()

  await db.schema
    .createTable('menu')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('name', 'varchar(128)', col => col.notNull())
    .addColumn('slug', 'varchar(128)', col => col.notNull())
    .addColumn('price', 'bigint', col => col.notNull())
    .addColumn('created_at', 'integer', col => col.defaultTo(sql`(unixepoch())`).notNull())
    .addColumn('updated_at', 'integer', col => col.defaultTo(sql`(unixepoch())`).notNull())
    .execute()

  await db.schema
    .createTable('order')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('number', 'text', col => col.unique())
    .addColumn('cashier_id', 'text', col => col.notNull())
    .addColumn('status', 'text', col => col.notNull().defaultTo('open'))
    .addColumn('notes', 'text')
    .addColumn('tableNumber', 'text')
    .addColumn('created_at', 'integer', col => col.defaultTo(sql`(unixepoch())`).notNull())
    .addColumn('updated_at', 'integer', col => col.defaultTo(sql`(unixepoch())`).notNull())
    .addForeignKeyConstraint(
      'order_cashier_id_constraint',
      ['cashier_id'],
      'user',
      ['id'],
      cb => cb.onDelete('restrict'),
    )
    .execute()

  await db.schema
    .createTable('order_item')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('order_id', 'integer', col => col.notNull())
    .addColumn('menu_id', 'integer', col => col.notNull())
    .addColumn('quantity', 'integer', col => col.notNull())
    .addColumn('notes', 'text')
    .addForeignKeyConstraint(
      'order_item_order_id_constraint',
      ['order_id'],
      'order',
      ['id'],
      cb => cb.onDelete('cascade'),
    )
    .addForeignKeyConstraint(
      'order_item_menu_id_constraint',
      ['menu_id'],
      'menu',
      ['id'],
      cb => cb.onDelete('cascade'),
    )
    .execute()

  await db.schema
    .createIndex('idx_menu_name')
    .on('menu')
    .column('name')
    .execute()

  await db.schema
    .createIndex('idx_order_number')
    .on('order')
    .column('number')
    .execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable('user').execute()
  await db.schema.dropTable('session').execute()
  await db.schema.dropTable('menu').execute()
}
