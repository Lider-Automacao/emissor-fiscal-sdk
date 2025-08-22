import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS30Schema = z.object({
  cst: z.literal('30'),
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
        valorBaseCalculo: NumberSchema,
        aliquota: NumberSchema,
        valor: NumberSchema,
      })
      .optional(),
  }),
  desoneracao: z
    .object({
      motivo: IntSchema,
      valor: NumberSchema,
      deduzItem: z.boolean(),
    })
    .optional(),
})

export type ICMS30 = z.infer<typeof ICMS30Schema>
