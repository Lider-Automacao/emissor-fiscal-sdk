import z from 'zod'
import { StatusSchema } from '../status'

export const RetornoInutilizacaoSchema = z.object({
  evento: z.string(),
  dataRecibo: z.date(),
  protocolo: z.string(),
  motivo: z.string(),
  status: StatusSchema,
  numero: z.string(),
  serie: z.string(),
})

export type RetornoInutilizacao = z.infer<typeof RetornoInutilizacaoSchema>
