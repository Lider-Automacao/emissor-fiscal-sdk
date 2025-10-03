import z from 'zod'
import { NullishString } from '../../types'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS10Schema = z.object({
  cst: z.literal('10'),
  origem: z.string(),
  aliquota: NumberSchema,
  valor: NumberSchema,
  baseOperacaoPropria: NumberSchema,
  baseCalculo: z.object({
    modalidadeDeterminacao: IntSchema,
    valor: NumberSchema,
    percentualReducao: NumberSchema,
  }),
  substituicaoTributaria: z.object({
    aliquota: NumberSchema,
    baseCalculo: z.object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberSchema,
      percentualReducao: NumberSchema,
    }),
    margemValorAdicionado: NumberSchema,
    valor: NumberSchema,
    fundoCombatePobreza: z
      .object({
        aliquota: NumberSchema,
        valorBaseCalculo: NumberSchema,
        valor: NumberSchema,
      })
      .optional(),
    ufDevido: NullishString,
  }),
  fundoCombatePobreza: z
    .object({
      aliquota: NumberSchema,
      valorBaseCalculo: NumberSchema,
      valor: NumberSchema,
    })
    .optional(),
})

export type ICMS10 = z.infer<typeof ICMS10Schema>
