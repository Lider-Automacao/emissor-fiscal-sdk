import z from 'zod'
import { DateSchema } from '../../types'

export const RetornoInutilizacaoSchema = z.object({
  evento: z.string(),
  dataRecibo: DateSchema,
  protocolo: z.string(),
  motivo: z.string(),
  status: z.enum([
    'A',
    'C',
    'D',
    'I',
    'O',
    'G',
    'S',
    'N'
  ]),
  numero: z.string(),
  serie: z.string(),
})

export type RetornoInutilizacao = z.infer<typeof RetornoInutilizacaoSchema>
