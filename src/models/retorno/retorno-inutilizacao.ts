import z from 'zod'

export const RetornoInutilizacaoSchema = z.object({
  evento: z.string(),
  dataRecibo: z.union([z.date(), z.iso.date()]),
  protocolo: z.string(),
  motivo: z.string(),
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
  numero: z.string(),
  serie: z.string(),
})

export type RetornoInutilizacao = z.infer<typeof RetornoInutilizacaoSchema>
