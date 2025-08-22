import z from 'zod'
import { NumberSchema } from '../../types/number-type'

export const ICMS61Schema = z.object({
  cst: z.literal('61'),
  origem: z.string(),
  baseCalculoMonoRetido: NumberSchema.default(0),
  aliquotaAdRemRetido: NumberSchema.default(0),
  valorIcmsMonoRetido: NumberSchema.default(0),
})

export type ICMS61 = z.infer<typeof ICMS61Schema>
