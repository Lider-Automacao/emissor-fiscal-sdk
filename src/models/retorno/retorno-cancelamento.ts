import z from 'zod'

export const RetornoCancelamentoSchema = z.object({
  data: z.date(),
  evento: z.string(),
  status: z.string(),
  protocolo: z.string(),
})

export type RetornoCancelamento = z.infer<typeof RetornoCancelamentoSchema>
