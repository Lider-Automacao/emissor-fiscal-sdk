import z from 'zod'
import { StatusSchema } from '../status'

export const RetornoCancelamentoSchema = z.object({
  data: z.date(),
  evento: z.string(),
  status: StatusSchema,
  protocolo: z.string(),
})

export type RetornoCancelamento = z.infer<typeof RetornoCancelamentoSchema>
