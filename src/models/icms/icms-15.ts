import z from 'zod'
import { NumberSchema } from '../../types/number-type'

export const ICMS15Schema = z.object({
  cst: z.literal('15'),
  origem: z.string(),
  baseCalculoMono: NumberSchema,
  aliquotaAdRem: NumberSchema,
  baseCalculoMonoRetencao: NumberSchema,
  valorIcmsMono: NumberSchema,
  aliquotaAdRemRetencao: NumberSchema,
  valorIcmsMonoRetencao: NumberSchema,
  reducaoAdRem: z.object({
    percentualReducaoAdRem: NumberSchema,
    motivoReducaoAdRem: NumberSchema,
  }),
})

export type ICMS15 = z.infer<typeof ICMS15Schema>
