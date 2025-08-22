import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS70Schema = z.object({
  cst: z.literal('70'),
  origem: z.string(),
  aliquota: NumberSchema.default(0),
  valor: NumberSchema.default(0),
  baseCalculo: z
    .object({
      modalidadeDeterminacao: IntSchema,
      percentualReducao: NumberSchema,
      valor: NumberSchema,
    })
    .optional(),
  fundoCombatePobreza: z
    .object({
      valorBaseCalculo: NumberSchema,
      aliquota: NumberSchema,
      valor: NumberSchema,
    })
    .optional(),
  substituicaoTributaria: z
    .object({
      baseCalculo: z.object({
        modalidadeDeterminacao: IntSchema,
        percentualReducao: NumberSchema,
        valor: NumberSchema,
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
    })
    .optional(),
  desoneracao: z
    .object({
      motivo: IntSchema,
      valor: NumberSchema,
      deduzItem: z.boolean(),
    })
    .optional(),
})

export type ICMS70 = z.infer<typeof ICMS70Schema>
