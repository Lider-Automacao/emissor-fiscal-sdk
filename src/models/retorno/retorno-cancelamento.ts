import z from 'zod'

export const RetornoCancelamentoSchema = z.object({
  data: z.date(),
  evento: z.string(),
  protocolo: z.string(),
  status: z.enum([
    'A',
    'C',
    'D',
    'I',
    'O',
    'G',
    'S',
    'N'
  ]),
})

export type RetornoCancelamento = z.infer<typeof RetornoCancelamentoSchema>
