import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS51Schema = z.object({
  cst: z.literal('51'),
  origem: z.string(),
  aliquota: NumberSchema.optional(),
  valor: NumberSchema.optional(),
  codigoBeneficioFiscalRBC: z.string().optional(),
  baseCalculo: z
    .object({
      modalidadeDeterminacao: IntSchema,
      valor: NumberSchema,
      percentualReducao: NumberSchema,
    })
    .optional(),
  diferimento: z
    .object({
      percentual: NumberSchema,
      valor: NumberSchema,
      valorIcmsDevido: NumberSchema,
    })
    .optional(),
  fundoCombatePobreza: z
    .object({
      valorBaseCalculo: NumberSchema,
      aliquota: NumberSchema,
      valor: NumberSchema,
      diferimento: z.object({
        percentual: NumberSchema,
        valor: NumberSchema,
        valorIcmsDevido: NumberSchema,
      }),
    })
    .optional(),
})

export type ICMS51 = z.infer<typeof ICMS51Schema>
