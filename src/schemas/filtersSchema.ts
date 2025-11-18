import { z } from 'zod'

export const filtersSchema = z.object({
  s: z.string().optional(),
  y: z.date().optional(),
  type: z.enum(['movie', 'series', 'episode']).optional(),
})
