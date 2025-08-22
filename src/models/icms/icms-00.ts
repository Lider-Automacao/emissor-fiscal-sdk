import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS00Schema = z
  .object({
    cst: z.literal('00'),
    origem: z.string(),
    baseCalculo: z.object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberSchema,
    }),
    fundoCombatePobreza: z
      .object({ aliquota: NumberSchema, valor: NumberSchema })
      .optional(),
    aliquota: NumberSchema,
    valor: NumberSchema,
  })
  .partial()

export type ICMS00 = z.infer<typeof ICMS00Schema>
