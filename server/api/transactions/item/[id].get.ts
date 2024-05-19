import { z } from 'zod'
import { useDrizzle } from '~/server/utils/drizzle'

const paramsSchema = z.object({
  id: z.coerce.number(),
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse)

  const transaction = useDrizzle().query.transactions.findFirst({
    where: (transactions, { eq }) => eq(transactions.id, id),
  })

  return transaction
})
