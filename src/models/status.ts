import z from "zod"

export const Status = {
  autorizada: 'A',
  cancelada: 'C',
  denegada: 'D',
  inutilizada: 'I',
  contingencia: 'O',
  aguardandoProcessamento: 'G',
  canceladaPorSubstituicao: 'S',
  naoEnviada: 'N'
} as const

export const StatusSchema = z.enum(Status)
