import { z } from 'zod'

export const filtersSchema = z.object({
  s: z.string().optional(),
  y: z.string().optional(),
  type: z.enum(['all', 'movie', 'series', 'episode']).optional(),
})
