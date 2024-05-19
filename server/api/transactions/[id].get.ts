import { z } from 'zod'
import { useDrizzle } from '~/server/utils/drizzle'

const paramsSchema = z.object({
  id: z.coerce.number(),
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse)

  const material = await useDrizzle().query.materials.findFirst({
    where: eq(tables.materials.id, id),
  })

  if (!material)
    return new Response(null, { status: 404 })

  const transactions = await useDrizzle().query.transactions.findMany({
    where: eq(tables.transactions.materialId, material.id),
    orderBy: (transactions, { asc }) => [asc(transactions.year), asc(transactions.month)],
  })

  return {
    material,
    transactions,
  }
})
