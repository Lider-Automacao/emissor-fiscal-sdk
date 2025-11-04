import z from 'zod'
import { DateNullishSchema, DateSchema, NullishString } from '../../types'

export const RetornoEnvioApiSchema = z.object({
  data: DateSchema.catch(new Date()),
  dataContigencia: DateNullishSchema.catch(null),
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
  motivo: NullishString,
  numero: z.number(),
  serie: z.number(),
})

export type RetornoEnvioApi = z.infer<typeof RetornoEnvioApiSchema>
