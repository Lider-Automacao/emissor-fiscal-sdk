import z from 'zod'
import { DateSchema, DateTimeSchema } from '../../types'
import { EmissorFiscalError } from '../../utils/errors/emissor-fiscal.error'

// O emissor pode devolver o status como código do SDK ('I') ou como o nome do enum do
// emissor ('sdInutilizada'). Normaliza para o código do SDK.
const STATUS_EMISSOR_PARA_SDK: Record<string, 'A' | 'C' | 'D' | 'I' | 'O'> = {
  a: 'A',
  c: 'C',
  d: 'D',
  i: 'I',
  o: 'O',
  sdautorizada: 'A',
  sdcancelada: 'C',
  sdcanceladaporsubstituicao: 'C',
  sddenegada: 'D',
  sdinutilizada: 'I',
  sdcontingencia: 'O',
}

const StatusInutilizacaoSchema = z.preprocess(
  (valor) => typeof valor === 'string' ? STATUS_EMISSOR_PARA_SDK[valor.trim().toLowerCase()] ?? valor : valor,
  z.enum(['A', 'C', 'D', 'I', 'O'])
)

// O emissor envia numero/serie como inteiro; o SDK expõe sempre como texto.
const NumeroComoTextoSchema = z.union([z.string(), z.number()]).transform(String)

export const InutilizacaoSchema = z.object({
  dataRecibo: z.union([DateSchema, DateTimeSchema]).nullish().catch(undefined),
  evento: z.string().nullish(),
  protocolo: z.string(),
  motivo: z.string(),
  status: StatusInutilizacaoSchema,
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
