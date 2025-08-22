import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS50Schema = z.object({
  cst: z.literal('50'),
  origem: z.string(),
  desoneracao: z
    .object({
      motivo: IntSchema,
      valor: NumberSchema,
      deduzItem: z.boolean(),
    })
    .optional(),
})

export type ICMS50 = z.infer<typeof ICMS50Schema>
