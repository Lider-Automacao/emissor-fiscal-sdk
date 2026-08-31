import z from 'zod'
import { DateSchema, DateTimeSchema } from '../../types'

export const RetornoCartaCorrecaoSchema = z.object({
  data: z.union([DateSchema, DateTimeSchema]).nullish().catch(undefined),
  evento: z.string(),
  protocolo: z.string(),
  sequenciaEvento: z.number().int(),
  // A = Autorizada, C = Cancelada, D = Denegada, I = Inutilizada, O = cOntingência
  // (mesmo enum de RetornoCancelamento/RetornoEnvioApi - convenção compartilhada da API)
  status: z.enum([
    'A',
    'C',
    'D',
    'I',
    'O'
  ]),
})

export type RetornoCartaCorrecao = z.infer<typeof RetornoCartaCorrecaoSchema>
