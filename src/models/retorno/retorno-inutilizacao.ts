import z from 'zod'

export const RetornoInutilizacaoSchema = z.object({
  evento: z.string(),
  dataRecibo: z.date(),
  protocolo: z.string(),
  motivo: z.string(),
  status: z.string(),
  numero: z.string(),
  serie: z.string(),
})

export type RetornoInutilizacao = z.infer<typeof RetornoInutilizacaoSchema>
