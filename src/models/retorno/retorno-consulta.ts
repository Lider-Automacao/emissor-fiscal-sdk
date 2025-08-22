import z from 'zod'

export const RetornoConsultaSchema = z.object({
  data: z.date(),
  protocolo: z.string(),
  chave: z.string(),
  status: z.string(),
  xml: z.string(),
})

export type RetornoConsulta = z.infer<typeof RetornoConsultaSchema>
