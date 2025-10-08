import z from 'zod'
import { DateNullishSchema, DateSchema, NullishString } from '../../types'

export const RetornoEnvioApiSchema = z.object({
  data: DateSchema,
  dataContigencia: DateNullishSchema,
  protocolo: z.string(),
  chaveAcesso: z.string(),
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
  xml: z.string(),
  motivo: NullishString,
  numero: z.number(),
  serie: z.number(),
})

export type RetornoEnvioApi = z.infer<typeof RetornoEnvioApiSchema>
