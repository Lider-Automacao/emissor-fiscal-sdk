import z from 'zod'
import { CPF_CNPJ_SCHEME } from '../types'

export const ConfiguracaoCertificadoSchema = z.object({
  arquivoBase64: z.base64("O arquivo do certificado é obrigatório."),
  senha: z.string().trim().nonempty('O arquivo do certificado é obrigatório.'),
})

export const ConfiguracaoEmailSchema = z.object({
  host: z.string().trim().nonempty(),
  password: z.string().trim().nonempty(),
  port: z.coerce.string().trim().nonempty().regex(/^\d+$/, 'A porta deve ser um número inteiro.'),
  userName: z.string().trim().nonempty(),
})

const ConfiguracoesEmitenteNFeSchema = z.object({
  modelo: z.literal(55),
  documento: CPF_CNPJ_SCHEME.min(1, 'CNPJ/CPF inválido'),
  uf: z.string().uppercase().trim().length(2, 'UF inválida'),
  ambiente: z.union([z.literal(1), z.literal(2)]).default(1).describe('1=Produção/2=Homologação'),
  tipoEmissao: z.union([z.literal(1), z.literal(9)]).default(1),
})

export const ConfiguracoesEmitenteSchema = z.discriminatedUnion('modelo', [
  ConfiguracoesEmitenteNFeSchema.extend({
    modelo: z.literal(65),
    idCSC: z.string()
      .min(1, 'O ID do CSC é obrigatório.')
      .max(6, 'O ID do CSC não pode exceder 6 caracteres.'),
    csc: z.string()
      .min(1, 'O CSC é obrigatório.')
      .max(36, 'O CSC não pode exceder 36 caracteres.'),
  }),
  ConfiguracoesEmitenteNFeSchema
])

export const ConfiguracoesSchema = z.object({
  logo: z.string().optional(),
  site: z.string().optional(),
  sistema: z.string().default('WebLider'),
  certificado: ConfiguracaoCertificadoSchema,
  email: ConfiguracaoEmailSchema.optional().nullable().default(null),
  emitente: ConfiguracoesEmitenteSchema,
})

export type Configuracoes = z.infer<typeof ConfiguracoesSchema>
