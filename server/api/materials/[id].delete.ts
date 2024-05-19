import { z } from 'zod'
import { eq, tables, useDrizzle } from '~/server/utils/drizzle'

const paramsSchema = z.object({
  id: z.coerce.number(),
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse)

  const material = useDrizzle().delete(tables.materials).where(eq(tables.materials.id, id)).execute()

  return material
})
