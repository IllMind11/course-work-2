import { z } from 'zod'
import { tables, useDrizzle } from '~/server/utils/drizzle'

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
  const body = await readValidatedBody(event, bodySchema.parse)

  const transaction = useDrizzle().insert(tables.transactions).values({
    ...body,
    createdAt: new Date(),
  }).returning().get()

  return transaction
})
