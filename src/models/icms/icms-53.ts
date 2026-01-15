import z from 'zod'
import { NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS53Schema = z.object({
  cst: z.literal('53'),
  origem: z.string(),
  baseCalculoMono: NumberDefaultZeroSchema,
  aliquotaAdRem: NumberDefaultZeroSchema,
  percentualDiferimento: NumberDefaultZeroSchema,
  valorIcmsMonoOperacao: NumberDefaultZeroSchema,
  valorIcmsDiferido: NumberDefaultZeroSchema,
  valorIcmsMono: NumberDefaultZeroSchema,
})

export type ICMS53 = z.infer<typeof ICMS53Schema>
