import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS201Schema = z.object({
  cst: z.literal('201'),
  origem: z.string(),
  substituicaoTributaria: z.object({
    aliquota: NumberSchema,
    baseCalculo: z.object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberSchema,
      percentualReducao: NumberSchema,
    }),
    margemValorAdicionado: NumberSchema,
    fundoCombatePobreza: z
      .object({
        aliquota: NumberSchema,
        valorBaseCalculo: NumberSchema,
        valor: NumberSchema,
      })
      .optional(),
    valor: NumberSchema,
  }),
  creditoSimplesNacional: z.object({
    percentual: NumberSchema,
    valor: NumberSchema,
  }),
})

export type ICMS201 = z.infer<typeof ICMS201Schema>
