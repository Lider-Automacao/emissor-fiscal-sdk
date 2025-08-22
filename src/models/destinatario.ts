import z from 'zod'
import { IntSchema } from '../types/number-type'

export const DestinatarioEnderecoSchema = z.object({
  logradouro: z.string(),
  numero: z.string(),
  complemento: z.string().optional().nullable(),
  bairro: z.string(),
  municipioCodigo: IntSchema,
  municipioNome: z.string(),
  cep: IntSchema,
  paisCodigo: IntSchema,
  paisNome: z.string(),
  fone: z.string().optional().nullable(),
  uf: z.string(),
})

export const DestinatarioSchema = z.object({
  nome: z.string(),
  documento: z.string(),
  codigoEstrangeiro: z.string().optional().nullable(),
  inscricaoMunicipal: z.string().optional().nullable(),
  indicadorInscricaoEstadual: IntSchema.optional().nullable(),
  inscricaoEstadual: z.string().optional().nullable(),
  inscricaoSuframa: z.string().optional().nullable(),
  endereco: DestinatarioEnderecoSchema.optional().nullable(),
})

export type Destinatario = z.infer<typeof DestinatarioSchema>
