import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS51Schema = z.object({
  cst: z.literal('51'),
  origem: z.string(),
  aliquota: NumberDefaultZeroSchema.optional(),
  valor: NumberDefaultZeroSchema.optional(),
  codigoBeneficioFiscalRBC: z.string().optional(),
  baseCalculo: z
    .object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberDefaultZeroSchema,
      percentualReducao: NumberDefaultZeroSchema,
    })
    .optional(),
  diferimento: z
    .object({
      percentual: NumberDefaultZeroSchema,
      valor: NumberDefaultZeroSchema,
      valorIcmsDevido: NumberDefaultZeroSchema,
    })
    .optional(),
  fundoCombatePobreza: z
    .object({
      valorBaseCalculo: NumberDefaultZeroSchema,
      aliquota: NumberDefaultZeroSchema,
      valor: NumberDefaultZeroSchema,
      diferimento: z.object({
        percentual: NumberDefaultZeroSchema,
        valor: NumberDefaultZeroSchema,
        valorIcmsDevido: NumberDefaultZeroSchema,
      }),
    })
    .optional(),
})

export type ICMS51 = z.infer<typeof ICMS51Schema>
