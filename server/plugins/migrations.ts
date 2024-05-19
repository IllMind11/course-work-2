import { consola } from 'consola'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { useDrizzle } from '../utils/drizzle'

export default defineNitroPlugin(async () => {
  if (!import.meta.dev)
    return

  const db = useDrizzle()
  migrate(db, { migrationsFolder: 'server/database/migrations' })
})
