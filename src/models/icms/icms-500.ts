import z from 'zod'
import { NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS500Schema = z.object({
  cst: z.literal('500'),
  origem: z.string(),
  substituicaoTributaria: z
    .object({
      valorBaseCalculo: NumberDefaultZeroSchema,
      aliquota: NumberDefaultZeroSchema,
      valor: NumberDefaultZeroSchema,
      fundoCombatePobreza: z
        .object({
          aliquota: NumberDefaultZeroSchema,
          valorBaseCalculo: NumberDefaultZeroSchema,
          valor: NumberDefaultZeroSchema,
        })
        .optional(),
    })
    .optional(),
  valor: NumberDefaultZeroSchema,
  efetivo: z
    .object({
      baseCalculo: z.object({
        valor: NumberDefaultZeroSchema,
        percentualReducao: NumberDefaultZeroSchema,
      }),
      aliquota: NumberDefaultZeroSchema,
      valor: NumberDefaultZeroSchema,
    })
    .optional(),
})

export type ICMS500 = z.infer<typeof ICMS500Schema>
