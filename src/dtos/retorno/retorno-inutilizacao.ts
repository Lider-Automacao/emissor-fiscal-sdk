import z from 'zod'
import { DateSchema } from '../../types'

export const InutilizacaoSchema = z.object({
  evento: z.string(),
  dataRecibo: DateSchema.catch(new Date()),
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
