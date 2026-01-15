import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS70Schema = z.object({
  cst: z.literal('70'),
  origem: z.string(),
  aliquota: NumberDefaultZeroSchema.default(0),
  valor: NumberDefaultZeroSchema.default(0),
  baseCalculo: z
    .object({
      modalidadeDeterminacao: IntSchema,
      percentualReducao: NumberDefaultZeroSchema,
      valor: NumberDefaultZeroSchema,
    })
    .optional(),
  fundoCombatePobreza: z
    .object({
      valorBaseCalculo: NumberDefaultZeroSchema,
      aliquota: NumberDefaultZeroSchema,
      valor: NumberDefaultZeroSchema,
    })
    .optional(),
  substituicaoTributaria: z
    .object({
      baseCalculo: z.object({
        modalidadeDeterminacao: IntSchema,
        percentualReducao: NumberDefaultZeroSchema,
        valor: NumberDefaultZeroSchema,
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
    })
    .optional(),
  desoneracao: z
    .object({
      motivo: IntSchema,
      valor: NumberDefaultZeroSchema,
      deduzItem: z.boolean(),
    })
    .optional(),
})

export type ICMS70 = z.infer<typeof ICMS70Schema>
