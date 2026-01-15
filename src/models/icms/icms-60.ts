import z from 'zod'
import { NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS60Schema = z.object({
  cst: z.literal('60'),
  origem: z.string(),
  valor: NumberDefaultZeroSchema,
  substituicaoTributaria: z
    .object({
      valorBaseCalculo: NumberDefaultZeroSchema,
      aliquota: NumberDefaultZeroSchema,
      valor: NumberDefaultZeroSchema,
      fundoCombatePobreza: z
        .object({
          valorBaseCalculo: NumberDefaultZeroSchema,
          aliquota: NumberDefaultZeroSchema,
          valor: NumberDefaultZeroSchema,
        })
        .optional(),
      ufDestino: z.object({
        valorBaseCalculo: NumberDefaultZeroSchema,
        valor: NumberDefaultZeroSchema,
      }),
    })
    .optional(),
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

export type ICMS60 = z.infer<typeof ICMS60Schema>
