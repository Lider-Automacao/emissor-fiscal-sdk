import z from 'zod'
import { NumberSchema } from '../../types/number-type'

export const ICMS53Schema = z.object({
  cst: z.literal('53'),
  origem: z.string(),
  baseCalculoMono: NumberSchema,
  aliquotaAdRem: NumberSchema,
  percentualDiferimento: NumberSchema,
  valorIcmsMonoOperacao: NumberSchema,
  valorIcmsDiferido: NumberSchema,
  valorIcmsMono: NumberSchema,
})

export type ICMS53 = z.infer<typeof ICMS53Schema>
