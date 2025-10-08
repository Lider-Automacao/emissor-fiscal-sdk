import z from "zod"

export const Status = {
  autorizada: 'A',
  cancelada: 'C',
  denegada: 'D',
  inutilizada: 'I',
  contingencia: 'O'
} as const

export const StatusSchema = z.enum(Status)
