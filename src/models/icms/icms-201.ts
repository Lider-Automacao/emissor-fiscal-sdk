import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS201Schema = z.object({
  cst: z.literal('201'),
  origem: z.string(),
  substituicaoTributaria: z.object({
    aliquota: NumberDefaultZeroSchema,
    baseCalculo: z.object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberDefaultZeroSchema,
      percentualReducao: NumberDefaultZeroSchema,
    }),
    margemValorAdicionado: NumberDefaultZeroSchema,
    fundoCombatePobreza: z
      .object({
        aliquota: NumberDefaultZeroSchema,
        valorBaseCalculo: NumberDefaultZeroSchema,
        valor: NumberDefaultZeroSchema,
      })
      .optional(),
    valor: NumberDefaultZeroSchema,
  }),
  creditoSimplesNacional: z.object({
    percentual: NumberDefaultZeroSchema,
    valor: NumberDefaultZeroSchema,
  }),
})

export type ICMS201 = z.infer<typeof ICMS201Schema>
