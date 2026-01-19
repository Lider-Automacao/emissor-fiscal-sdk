import z from 'zod'
import { DateSchema, DateTimeSchema } from '../../types'

export const RetornoCancelamentoSchema = z.object({
  data: z.union([DateSchema, DateTimeSchema]).nullish().catch(undefined),
  evento: z.string(),
  protocolo: z.string(),
  status: z.enum([
    'A',
    'C',
    'D',
    'I',
    'O'
  ]),
})

export type RetornoCancelamento = z.infer<typeof RetornoCancelamentoSchema>
