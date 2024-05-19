import { z } from 'zod'
import { useDrizzle } from '~/server/utils/drizzle'

const paramsSchema = z.object({
  id: z.coerce.number(),
})

export default eventHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse)

  const material = useDrizzle().query.materials.findFirst({
    where: (materials, { eq }) => eq(materials.id, id),
  })

  return material
})
