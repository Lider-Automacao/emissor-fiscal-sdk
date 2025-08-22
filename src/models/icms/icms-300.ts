import z from 'zod'

export const ICMS300Schema = z.object({
  cst: z.literal('300'),
  origem: z.string(),
})

export type ICMS300 = z.infer<typeof ICMS300Schema>
