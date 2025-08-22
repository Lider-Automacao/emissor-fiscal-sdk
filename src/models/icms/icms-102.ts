import z from 'zod'

export const ICMS102Schema = z.object({
  cst: z.literal('102'),
  origem: z.string(),
})

export type ICMS102 = z.infer<typeof ICMS102Schema>
