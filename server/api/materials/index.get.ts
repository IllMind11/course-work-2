import { useDrizzle } from '~/server/utils/drizzle'

export default eventHandler(async () => {
  const materials = useDrizzle().query.materials.findMany()

  return materials
})
