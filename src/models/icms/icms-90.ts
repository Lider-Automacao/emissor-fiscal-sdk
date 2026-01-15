import z from 'zod'
import { NullishString } from '../../types'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS90Schema = z.object({
  cst: z.literal('90'),
  origem: z.string(),
  aliquota: NumberDefaultZeroSchema.default(0),
  valor: NumberDefaultZeroSchema.default(0),
  baseOperacaoPropria: NumberDefaultZeroSchema.default(0),
  baseCalculo: z
    .object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberDefaultZeroSchema,
      percentualReducao: NumberDefaultZeroSchema,
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
      ufDevido: NullishString,
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

export type ICMS90 = z.infer<typeof ICMS90Schema>
