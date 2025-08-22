import z from 'zod'

export const ICMS103Schema = z.object({
  cst: z.literal('103'),
  origem: z.string(),
})

export type ICMS103 = z.infer<typeof ICMS103Schema>
