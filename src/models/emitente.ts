import z from 'zod'
import { IntSchema } from '../types/number-type'

export const EmitenteEnderecoSchema = z.object({
  logradouro: z.string(),
  numero: z.string(),
  complemento: z.string(),
  bairro: z.string(),
  municipioCodigo: IntSchema,
  municipioNome: z.string(),
  cep: IntSchema,
  paisCodigo: IntSchema,
  paisNome: z.string(),
  fone: z.string(),
  uf: z.string(),
})

export const EmitenteSchema = z.object({
  documento: z.string(),
  razao: z.string(),
  fantasia: z.string(),
  inscicaoEstadual: z.string(),
  inscicaoMunicipal: z.string().default('ISENTO'),
  regimeTributario: IntSchema,
  idCSC: z.coerce.string(),
  csc: z.coerce.string(),
  endereco: EmitenteEnderecoSchema,
})

export type Emitente = z.infer<typeof EmitenteSchema>
