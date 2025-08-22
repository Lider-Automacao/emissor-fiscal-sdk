import z from 'zod'

export const RetornoNfceApiSchema = z.object({
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

export type RetornoNfceApi = z.infer<typeof RetornoNfceApiSchema>
