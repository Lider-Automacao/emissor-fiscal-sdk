import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS00Schema = z
  .object({
    cst: z.literal('00'),
    origem: z.string(),
    baseCalculo: z.object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberDefaultZeroSchema,
    }),
    fundoCombatePobreza: z
      .object({ aliquota: NumberDefaultZeroSchema, valor: NumberDefaultZeroSchema })
      .optional(),
    aliquota: NumberDefaultZeroSchema,
    valor: NumberDefaultZeroSchema,
  })
  .partial()

export type ICMS00 = z.infer<typeof ICMS00Schema>
