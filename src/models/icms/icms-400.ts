import z from 'zod'

export const ICMS400Schema = z.object({
  cst: z.literal('400'),
  origem: z.string(),
})

export type ICMS400 = z.infer<typeof ICMS400Schema>
