import z from 'zod'
import { NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS02Schema = z.object({
  cst: z.literal('02'),
  origem: z.string(),
  baseCalculoMono: NumberDefaultZeroSchema,
  aliquotaAdRem: NumberDefaultZeroSchema,
  valorIcmsMono: NumberDefaultZeroSchema,
})

export type ICMS02 = z.infer<typeof ICMS02Schema>
