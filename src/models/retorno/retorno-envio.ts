import z from 'zod'
import { NullishString } from '../../types'
import { StatusSchema } from '../status'

export const RetornoEnvioApiSchema = z.object({
  data: z.date(),
  dataContigencia: z.date().optional().nullable(),
  protocolo: z.string(),
  chave: z.string(),
  status: StatusSchema,
  xml: z.string(),
  motivo: NullishString,
  numero: z.number(),
  serie: z.number(),
})

export type RetornoEnvioApi = z.infer<typeof RetornoEnvioApiSchema>
