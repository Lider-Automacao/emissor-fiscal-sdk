import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS30Schema = z.object({
  cst: z.literal('30'),
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
        valorBaseCalculo: NumberDefaultZeroSchema,
        aliquota: NumberDefaultZeroSchema,
        valor: NumberDefaultZeroSchema,
      })
      .optional(),
  }),
  desoneracao: z
    .object({
      motivo: IntSchema,
      valor: NumberDefaultZeroSchema,
      deduzItem: z.boolean(),
    })
    .optional(),
})

export type ICMS30 = z.infer<typeof ICMS30Schema>
