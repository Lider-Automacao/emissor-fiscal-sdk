import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS203Schema = z.object({
  cst: z.literal('203'),
  origem: z.string(),
  substituicaoTributaria: z.object({
    baseCalculo: z.object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberDefaultZeroSchema,
      percentualReducao: NumberDefaultZeroSchema,
    }),
    margemValorAdicionado: NumberDefaultZeroSchema,
    aliquota: NumberDefaultZeroSchema,
    valor: NumberDefaultZeroSchema,
    fundoCombatePobreza: z
      .object({
        aliquota: NumberDefaultZeroSchema,
        valorBaseCalculo: NumberDefaultZeroSchema,
        valor: NumberDefaultZeroSchema,
      })
      .optional(),
  }),
})

export type ICMS203 = z.infer<typeof ICMS203Schema>
