import z from 'zod'
import { ConfiguracaoCertificadoSchema } from './configuracao-certificado'
import { ConfiguracaoEmailSchema } from './configuracao-email'
import { ConfiguracaoResponsavelTecnicoSchema } from './configuracao-responsavel-tecnico'
import { ConfiguracoesEnvioSchema } from './configuracoes-envio'
import { ConfiguracoesWebServiceSchema } from './configuracoes-webservice'
import { EmitenteSchema } from './emitente'


export const ConfiguracoesSchema = z.object({
  logo: z.union([
    z.url(),
    z.base64(),
  ]).nullish(),
  site: z.url().nullish(),
  sistema: z.string().default('WebLider'),
  certificado: ConfiguracaoCertificadoSchema,
  configuracoesEnvio: ConfiguracoesEnvioSchema,
  emitente: EmitenteSchema,
  email: ConfiguracaoEmailSchema.optional().nullable().default(null),
  webService: ConfiguracoesWebServiceSchema.nullable().optional().default(null),
  responsavelTecnico: ConfiguracaoResponsavelTecnicoSchema.nullable().optional().default(null),
})

export type Configuracoes = z.infer<typeof ConfiguracoesSchema>
