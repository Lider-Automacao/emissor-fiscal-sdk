import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS202Schema = z.object({
  cst: z.literal('202'),
  origem: z.string(),
  substituicaoTributaria: z.object({
    baseCalculo: z.object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberSchema,
      percentualReducao: NumberSchema,
    }),
    margemValorAdicionado: NumberSchema,
    aliquota: NumberSchema,
    valor: NumberSchema,
    fundoCombatePobreza: z
      .object({
        aliquota: NumberSchema,
        valorBaseCalculo: NumberSchema,
        valor: NumberSchema,
      })
      .optional(),
  }),
})

export type ICMS202 = z.infer<typeof ICMS202Schema>
