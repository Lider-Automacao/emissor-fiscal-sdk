import z from 'zod'
import { NumberSchema } from '../../types/number-type'

export const ICMS101Schema = z.object({
  cst: z.literal('101'),
  origem: z.string(),
  creditoSimplesNacional: z.object({
    percentual: NumberSchema,
    valor: NumberSchema,
  }),
})

export type ICMS101 = z.infer<typeof ICMS101Schema>
