import { z } from 'zod'
import { ConfiguracoesSchema } from '..'
import { NfceSchema } from '../nfce/nfce'

export const EnvioNfeApiSchema = z.object({
  nfe: NfceSchema,
  configuracoes: ConfiguracoesSchema,
})

export type EnvioNfeApi = z.infer<typeof EnvioNfeApiSchema>
