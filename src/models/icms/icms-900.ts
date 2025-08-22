import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS900Schema = z.object({
  cst: z.literal('900'),
  origem: z.string(),
  baseCalculo: z.object({
    modalidadeDeterminacao: IntSchema,
    valor: NumberSchema,
    percentualReducao: NumberSchema,
  }),
  aliquota: NumberSchema,
  valor: NumberSchema,
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
  creditoSimplesNacional: z.object({
    percentual: NumberSchema,
    valor: NumberSchema,
  }),
})

export type ICMS900 = z.infer<typeof ICMS900Schema>
