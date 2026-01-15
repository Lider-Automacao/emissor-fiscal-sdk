import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS40Schema = z.object({
  cst: z.literal('40'),
  origem: z.string(),
  desoneracao: z
    .object({
      motivo: IntSchema,
      valor: NumberDefaultZeroSchema,
      deduzItem: z.boolean(),
    })
    .optional(),
})

export type ICMS40 = z.infer<typeof ICMS40Schema>
