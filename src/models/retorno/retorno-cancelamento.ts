import z from 'zod'
import { DateSchema } from '../../types'

export const RetornoCancelamentoSchema = z.object({
  data: DateSchema.catch(new Date()),
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
