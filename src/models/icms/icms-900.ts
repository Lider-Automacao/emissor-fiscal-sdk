import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS900Schema = z.object({
  cst: z.literal('900'),
  origem: z.string(),
  baseCalculo: z.object({
    modalidadeDeterminacao: IntSchema,
    valor: NumberDefaultZeroSchema,
    percentualReducao: NumberDefaultZeroSchema,
  }),
  aliquota: NumberDefaultZeroSchema,
  valor: NumberDefaultZeroSchema,
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
  creditoSimplesNacional: z.object({
    percentual: NumberDefaultZeroSchema,
    valor: NumberDefaultZeroSchema,
  }),
})

export type ICMS900 = z.infer<typeof ICMS900Schema>
