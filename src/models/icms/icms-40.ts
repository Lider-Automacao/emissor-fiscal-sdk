import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const ICMS40Schema = z.object({
  cst: z.literal('40'),
  origem: z.string(),
  desoneracao: z
    .object({
      motivo: IntSchema,
      valor: NumberSchema,
      deduzItem: z.boolean(),
    })
    .optional(),
})

export type ICMS40 = z.infer<typeof ICMS40Schema>
