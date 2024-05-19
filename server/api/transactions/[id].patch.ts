import { z } from 'zod'
import { eq, tables, useDrizzle } from '~/server/utils/drizzle'

const paramsSchema = z.object({
  id: z.coerce.number(),
})

const bodySchema = z.object({
  materialId: z.coerce.number().min(1),
  startingBalance: z.coerce.number().min(0),
  endingBalance: z.coerce.number().min(0),
  year: z.coerce.number().min(1900).max(2100),
  month: z.coerce.number().min(1).max(12),
  receiptsAccountable: z.coerce.number().min(0),
  receiptsWarehouse: z.coerce.number().min(0),
  issuesProduction: z.coerce.number().min(0),
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse)
  const body = await readValidatedBody(event, bodySchema.parse)

  const transaction = useDrizzle().update(tables.transactions).set({
    ...body,
  }).where(eq(tables.transactions.id, id)).returning().get()

  return transaction
})
