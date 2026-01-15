import z from 'zod'
import { NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS61Schema = z.object({
  cst: z.literal('61'),
  origem: z.string(),
  baseCalculoMonoRetido: NumberDefaultZeroSchema.default(0),
  aliquotaAdRemRetido: NumberDefaultZeroSchema.default(0),
  valorIcmsMonoRetido: NumberDefaultZeroSchema.default(0),
})

export type ICMS61 = z.infer<typeof ICMS61Schema>
