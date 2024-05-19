import { z } from 'zod'
import { eq, tables, useDrizzle } from '~/server/utils/drizzle'

const paramsSchema = z.object({
  id: z.coerce.number(),
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse)

  const transaction = useDrizzle().delete(tables.transactions).where(eq(tables.transactions.id, id)).execute()

  return transaction
})
