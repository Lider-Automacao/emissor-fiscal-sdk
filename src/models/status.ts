import z from "zod";

export enum Status {
  autorizada = 'A',
  cancelada = 'C',
  denegada = 'D',
  inutilizada = 'I',
  contingencia = 'O',
  aguardandoProcessamento = 'G',
  canceladaPorSubstituicao = 'S',
  naoEnviada = 'N'
}

export const StatusSchema = z.enum(Status)
