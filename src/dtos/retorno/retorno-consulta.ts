import z from 'zod'
import { DateNullishSchema, DateTimeNullishSchema, NullishString } from '../../types'
import { StatusRetornoSchema } from '../../models/auxiliares/status'

export const RetornoConsultaSchema = z.object({
  data: z.union([DateNullishSchema, DateTimeNullishSchema]).nullish().catch(undefined),
  protocolo: z.string(),
  status: StatusRetornoSchema,
  chaveAcesso: z.string(),
  xml: NullishString,
  evento: NullishString,
  xmlLocalConfere: z.boolean().nullish()
    .describe('NFC-e com XML local: true se o DigestValue dele é o digVal do protocolo da SEFAZ; ausente sem XML local ou digVal'),
})

export type RetornoConsulta = z.infer<typeof RetornoConsultaSchema>
