import z from 'zod'
import { DateNullishSchema, DateSchema, DateTimeNullishSchema, DateTimeSchema, NullishString } from '../../types'

export const RetornoEnvioApiSchema = z.object({
  data: z.union([DateSchema, DateTimeSchema]).nullish().catch(undefined),
  dataContigencia: z.union([DateNullishSchema, DateTimeNullishSchema]).nullish().catch(undefined),
  protocolo: z.string(),
  chaveAcesso: z.string(),
  status: z.enum([
    'A',
    'C',
    'D',
    'I',
    'O'
  ]),
  xml: z.string(),
  motivo: NullishString.optional(),
  numero: z.number(),
  serie: z.number(),
})

export type RetornoEnvioApi = z.infer<typeof RetornoEnvioApiSchema>
