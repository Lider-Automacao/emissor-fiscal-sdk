import z from 'zod'
import { NumberSchema } from '../../types/number-type'

export const ICMS60Schema = z.object({
  cst: z.literal('60'),
  origem: z.string(),
  valor: NumberSchema.default(0),
  substituicaoTributaria: z
    .object({
      valorBaseCalculo: NumberSchema,
      aliquota: NumberSchema,
      valor: NumberSchema,
      fundoCombatePobreza: z
        .object({
          valorBaseCalculo: NumberSchema,
          aliquota: NumberSchema,
          valor: NumberSchema,
        })
        .optional(),
      ufDestino: z.object({
        valorBaseCalculo: NumberSchema,
        valor: NumberSchema,
      }),
    })
    .optional(),
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

export type ICMS60 = z.infer<typeof ICMS60Schema>
