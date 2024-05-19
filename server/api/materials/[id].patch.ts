import { z } from 'zod'
import { eq, tables, useDrizzle } from '~/server/utils/drizzle'

const paramsSchema = z.object({
  id: z.coerce.number(),
})

const bodySchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(0),
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse)
  const body = await readValidatedBody(event, bodySchema.parse)

  const material = useDrizzle().update(tables.materials).set({
    name: body.name,
    price: body.price,
  }).where(eq(tables.materials.id, id)).returning().get()

  return material
})
