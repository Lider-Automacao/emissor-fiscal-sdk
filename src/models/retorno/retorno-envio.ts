import z from 'zod'

export const RetornoEnvioApiSchema = z.object({
  data: z.date(),
  dataContigencia: z.date().optional().nullable(),
  protocolo: z.string(),
  chave: z.string(),
  status: z.string(),
  xml: z.string(),
  motivo: z.string().optional(),
  numero: z.number(),
  serie: z.number(),
})

export type RetornoEnvioApi = z.infer<typeof RetornoEnvioApiSchema>
