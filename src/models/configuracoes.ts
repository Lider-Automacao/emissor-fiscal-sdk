import z from 'zod'

export const ConfiguracaoCertificadoSchema = z.object({
  arquivoBase64: z.string(),
  senha: z.string(),
})

export const ConfiguracaoEmailSchema = z.object({
  host: z.string(),
  password: z.string(),
  port: z.coerce.string(),
  userName: z.string(),
})

export const ConfiguracoesEmitenteSchema = z.discriminatedUnion('modelo', [
  z.object({
    modelo: z.literal(65),
    documento: z.string().trim().min(1, 'CNPJ/CPF inválido'),
    idCSC: z.string().trim().min(1, 'idCSC inválido'),
    csc: z.string().trim().min(1, 'CSC inválido'),
    uf: z.string().trim().min(2, 'UF inválida'),
    ambiente: z.coerce
      .number()
      .int()
      .transform((val) => (val <= 0 ? undefined : val))
      .default(1),
    tipoEmissao: z.union([z.literal(1), z.literal(9)]).default(1),
  }),
  z.object({
    modelo: z.literal(55),
    documento: z.string().trim().min(1, 'CNPJ/CPF inválido'),
    uf: z.string().trim().min(2, 'UF inválida'),
    ambiente: z.coerce
      .number()
      .int()
      .transform((val) => (val <= 0 ? undefined : val))
      .default(1),
    tipoEmissao: z.union([z.literal(1), z.literal(9)]).default(1),
  })
])

export const ConfiguracoesSchema = z.object({
  logo: z.string().optional(),
  site: z.string().optional(),
  sistema: z.string().default('WebLider'),
  certificado: ConfiguracaoCertificadoSchema,
  email: ConfiguracaoEmailSchema.optional().nullable(),
  emitente: ConfiguracoesEmitenteSchema,
})

export type Configuracoes = z.infer<typeof ConfiguracoesSchema>
