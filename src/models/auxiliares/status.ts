import z from "zod"

export const Status = {
  autorizada: 'A',
  cancelada: 'C',
  denegada: 'D',
  inutilizada: 'I',
  contingencia: 'O'
} as const

export const StatusSchema = z.enum(Status)

type StatusSdk = typeof Status[keyof typeof Status]

// O emissor devolve `status` como o nome do enum Delphi (`sdAutorizada`) e, ao lado, o texto
// em `statusDescricao` (`autorizada`). Versões anteriores devolviam a letra do SDK. Tudo é
// normalizado para a letra, que é o contrato público do SDK. A chave é minúscula e sem espaços.
const STATUS_EMISSOR_PARA_SDK: Record<string, StatusSdk> = {
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
  // A carta de correção não altera a situação da nota; mantém A, como antes do enum.
  sdeventoregistrado: 'A',
  autorizada: 'A',
  cancelada: 'C',
  cancelada_por_substituicao: 'C',
  denegada: 'D',
  inutilizada: 'I',
  contingencia: 'O',
  evento_registrado: 'A',
}

export const StatusRetornoSchema = z.preprocess(
  (valor) => typeof valor === 'string' ? STATUS_EMISSOR_PARA_SDK[valor.trim().toLowerCase()] ?? valor : valor,
  StatusSchema
)

// Na entrada de impressão o emissor lê `status` como o enum Delphi. Só `sdCancelada` muda a
// impressão (DANFE de nota cancelada); G, S e N não têm enum equivalente e viram "não definido".
export const STATUS_IMPRESSAO_PARA_EMISSOR = {
  A: 'sdAutorizada',
  C: 'sdCancelada',
  D: 'sdDenegada',
  I: 'sdInutilizada',
  O: 'sdContingencia',
  G: 'sdNaoDefinido',
  S: 'sdNaoDefinido',
  N: 'sdNaoDefinido',
} as const

export type StatusImpressaoSdk = keyof typeof STATUS_IMPRESSAO_PARA_EMISSOR
