import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS202Schema = z.object({
  cst: z.literal('202'),
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

export type ICMS202 = z.infer<typeof ICMS202Schema>
