import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

export const ICMS41Schema = z.object({
  cst: z.literal('41'),
  origem: z.string(),
  desoneracao: z
    .object({
      motivo: IntSchema,
      valor: NumberDefaultZeroSchema,
      deduzItem: z.boolean(),
    })
    .optional(),
})

export type ICMS41 = z.infer<typeof ICMS41Schema>
