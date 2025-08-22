import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS90Schema = z.object({
  cst: z.literal('90'),
  origem: z.string(),
  aliquota: NumberSchema.default(0),
  valor: NumberSchema.default(0),
  baseOperacaoPropria: NumberSchema.default(0),
  baseCalculo: z
    .object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberSchema,
      percentualReducao: NumberSchema,
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
      ufDevido: z.string(),
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

export type ICMS90 = z.infer<typeof ICMS90Schema>
