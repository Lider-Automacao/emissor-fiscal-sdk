import z from 'zod'
import { DateSchema, DateTimeSchema } from '../../types'

export const InutilizacaoSchema = z.object({
  dataRecibo: z.union([DateSchema, DateTimeSchema]).nullish().catch(undefined),
  evento: z.string(),
  protocolo: z.string(),
  motivo: z.string(),
  status: z.enum([
    'A',
    'C',
    'D',
    'I',
    'O'
  ]),
  numero: z.string(),
  serie: z.string(),
})

export type Inutilizacao = z.infer<typeof RetornoInutilizacaoSchema>

export const RetornoInutilizacaoSchema = z.array(InutilizacaoSchema)

export type RetornoInutilizacao = z.infer<typeof RetornoInutilizacaoSchema>
