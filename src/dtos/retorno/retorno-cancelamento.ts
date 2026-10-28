import z from 'zod'
import { DateSchema, DateTimeSchema } from '../../types'
import { StatusRetornoSchema } from '../../models/auxiliares/status'

export const RetornoCancelamentoSchema = z.object({
  data: z.union([DateSchema, DateTimeSchema]).nullish().catch(undefined),
  evento: z.string(),
  protocolo: z.string(),
  status: StatusRetornoSchema,
  statusDescricao: z.string().nullish().describe('Texto fixo do status no emissor, como cancelada'),
})

export type RetornoCancelamento = z.infer<typeof RetornoCancelamentoSchema>
