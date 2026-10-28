import z from 'zod'
import { DateSchema, DateTimeSchema } from '../../types'
import { StatusRetornoSchema } from '../../models/auxiliares/status'
import { EmissorFiscalError } from '../../utils/errors/emissor-fiscal.error'

// O emissor envia numero/serie como inteiro; o SDK expõe sempre como texto.
const NumeroComoTextoSchema = z.union([z.string(), z.number()]).transform(String)

export const InutilizacaoSchema = z.object({
  dataRecibo: z.union([DateSchema, DateTimeSchema]).nullish().catch(undefined),
  evento: z.string().nullish(),
  protocolo: z.string(),
  motivo: z.string(),
  status: StatusRetornoSchema,
  numero: NumeroComoTextoSchema,
  serie: NumeroComoTextoSchema,
})

export type Inutilizacao = z.infer<typeof InutilizacaoSchema>

export const RetornoInutilizacaoSchema = z.array(InutilizacaoSchema)

export type RetornoInutilizacao = z.infer<typeof RetornoInutilizacaoSchema>

export function parseRetornoInutilizacao(response: unknown): RetornoInutilizacao {
  const parsed = RetornoInutilizacaoSchema.safeParse(response)

  if (!parsed.success) {
    throw EmissorFiscalError.fromZodError(
      'Retorno de inutilização inválido. A inutilização pode já ter sido homologada na SEFAZ; consulte e reconcilie antes de tentar novamente',
      parsed.error
    )
  }

  return parsed.data
}
