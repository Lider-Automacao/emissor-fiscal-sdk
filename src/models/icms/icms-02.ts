import z from 'zod'
import { NumberSchema } from '../../types/number-type'

export const ICMS02Schema = z.object({
  cst: z.literal('02'),
  origem: z.string(),
  baseCalculoMono: NumberSchema,
  aliquotaAdRem: NumberSchema,
  valorIcmsMono: NumberSchema,
})

export type ICMS02 = z.infer<typeof ICMS02Schema>
