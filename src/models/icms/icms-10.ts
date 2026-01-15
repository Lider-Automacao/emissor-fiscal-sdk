import z from 'zod'
import { NullishString } from '../../types'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS10Schema = z.object({
  cst: z.literal('10'),
  origem: z.string(),
  aliquota: NumberDefaultZeroSchema,
  valor: NumberDefaultZeroSchema,
  baseOperacaoPropria: NumberDefaultZeroSchema,
  baseCalculo: z.object({
    modalidadeDeterminacao: IntSchema,
    valor: NumberDefaultZeroSchema,
    percentualReducao: NumberDefaultZeroSchema,
  }),
  substituicaoTributaria: z.object({
    aliquota: NumberDefaultZeroSchema,
    baseCalculo: z.object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberDefaultZeroSchema,
      percentualReducao: NumberDefaultZeroSchema,
    }),
    margemValorAdicionado: NumberDefaultZeroSchema,
    valor: NumberDefaultZeroSchema,
    fundoCombatePobreza: z
      .object({
        aliquota: NumberDefaultZeroSchema,
        valorBaseCalculo: NumberDefaultZeroSchema,
        valor: NumberDefaultZeroSchema,
      })
      .optional(),
    ufDevido: NullishString,
  }),
  fundoCombatePobreza: z
    .object({
      aliquota: NumberDefaultZeroSchema,
      valorBaseCalculo: NumberDefaultZeroSchema,
      valor: NumberDefaultZeroSchema,
    })
    .optional(),
})

export type ICMS10 = z.infer<typeof ICMS10Schema>
