import z from 'zod'
import { NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS15Schema = z.object({
  cst: z.literal('15'),
  origem: z.string(),
  baseCalculoMono: NumberDefaultZeroSchema,
  aliquotaAdRem: NumberDefaultZeroSchema,
  baseCalculoMonoRetencao: NumberDefaultZeroSchema,
  valorIcmsMono: NumberDefaultZeroSchema,
  aliquotaAdRemRetencao: NumberDefaultZeroSchema,
  valorIcmsMonoRetencao: NumberDefaultZeroSchema,
  reducaoAdRem: z.object({
    percentualReducaoAdRem: NumberDefaultZeroSchema,
    motivoReducaoAdRem: NumberDefaultZeroSchema,
  }),
})

export type ICMS15 = z.infer<typeof ICMS15Schema>
