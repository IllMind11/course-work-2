import { z } from 'zod'
import { tables, useDrizzle } from '~/server/utils/drizzle'

const bodySchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(0),
})

export default eventHandler(async (event) => {
  const { name, price } = await readValidatedBody(event, bodySchema.parse)

  const material = useDrizzle().insert(tables.materials).values({
    name,
    price,
    createdAt: new Date(),
  }).returning().get()

  return material
})
