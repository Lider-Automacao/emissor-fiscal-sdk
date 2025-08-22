import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS20Schema = z.object({
  cst: z.literal('20'),
  origem: z.string(),
  valor: NumberSchema,
  aliquota: NumberSchema,
  baseCalculo: z.object({
    modalidadeDeterminacao: IntSchema,
    percentualReducao: NumberSchema,
    valor: NumberSchema,
  }),
  desoneracao: z
    .object({
      motivo: IntSchema,
      valor: NumberSchema,
      deduzItem: z.boolean(),
    })
    .optional(),
  fundoCombatePobreza: z
    .object({
      aliquota: NumberSchema,
      valorBaseCalculo: NumberSchema,
      valor: NumberSchema,
    })
    .optional(),
})

export type ICMS20 = z.infer<typeof ICMS20Schema>
