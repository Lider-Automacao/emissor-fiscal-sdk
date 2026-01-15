import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS20Schema = z.object({
  cst: z.literal('20'),
  origem: z.string(),
  valor: NumberDefaultZeroSchema,
  aliquota: NumberDefaultZeroSchema,
  baseCalculo: z.object({
    modalidadeDeterminacao: IntSchema,
    percentualReducao: NumberDefaultZeroSchema,
    valor: NumberDefaultZeroSchema,
  }),
  desoneracao: z
    .object({
      motivo: IntSchema,
      valor: NumberDefaultZeroSchema,
      deduzItem: z.boolean(),
    })
    .optional(),
  fundoCombatePobreza: z
    .object({
      aliquota: NumberDefaultZeroSchema,
      valorBaseCalculo: NumberDefaultZeroSchema,
      valor: NumberDefaultZeroSchema,
    })
    .optional(),
})

export type ICMS20 = z.infer<typeof ICMS20Schema>
