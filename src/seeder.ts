import * as path from 'path'
import SQLite from 'better-sqlite3'
import { promises as fs } from 'fs'
import {
  Kysely,
  SqliteDialect,
  sql,
} from 'kysely'

const dialect = new SqliteDialect({
  database: new SQLite('lebistro.db'),
})

async function seed() {
  const db = new Kysely<unknown>({
    dialect,
  })

  const seederFilesPath = path.join(__dirname, 'models/seeders')
  const seederFileNames = await fs.readdir(seederFilesPath)

  const tablesResult = await sql<{ name: string }>`SELECT name FROM sqlite_master WHERE type == 'table'`.execute(db)
  const tableNames = tablesResult.rows.map(row => row.name)
  for (const fileName of seederFileNames) {
    if (!fileName.endsWith('.ts')) {
      continue
    }

    const strippedFileName = fileName.split('.ts')[0]
    const tableName = tableNames.find(name => name === strippedFileName)

    if (!tableName) {
      console.log(`[WARN] Found \`${fileName}\`, but no table with same name. Skipping...`)
      continue
    }

    const imported = await import(path.join(seederFilesPath, fileName))
    // Check if module has valid format
    if (imported && imported.runSeeder && typeof imported.runSeeder === 'function') {
      const seeds: Record<string, unknown>[] = await imported.runSeeder()
      await db.insertInto(tableName as never).values(seeds).execute()
      console.log(`Inserted ${seeds.length} rows into table \`${tableName}\``)
    } else {
      console.log(`[WARN] Found \`${fileName}\`, but can't seed due to invalid format (Did you put the seeder in \`runSeeder\` function?). Skipping...`)
      continue
    }
  }

  await db.destroy()
}

seed()
