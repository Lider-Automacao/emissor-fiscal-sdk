import z from 'zod'
import { NumberSchema } from '../../types/number-type'

export const ICMS500Schema = z.object({
  cst: z.literal('500'),
  origem: z.string(),
  substituicaoTributaria: z
    .object({
      valorBaseCalculo: NumberSchema,
      aliquota: NumberSchema,
      valor: NumberSchema,
      fundoCombatePobreza: z
        .object({
          aliquota: NumberSchema,
          valorBaseCalculo: NumberSchema,
          valor: NumberSchema,
        })
        .optional(),
    })
    .optional(),
  valor: NumberSchema,
  efetivo: z
    .object({
      baseCalculo: z.object({
        valor: NumberSchema,
        percentualReducao: NumberSchema,
      }),
      aliquota: NumberSchema,
      valor: NumberSchema,
    })
    .optional(),
})

export type ICMS500 = z.infer<typeof ICMS500Schema>
