import z from 'zod'
import { NullishString } from '../types'
import { CPF_CNPJ_SCHEME } from '../types/identification-scheme.zod'
import { EnderecoSchema } from './endereco'


export const EmitenteSchema = z.object({
  documento: CPF_CNPJ_SCHEME.min(1, 'O documento (CNPJ/CPF) é obrigatório.'),
  razao: z.string()
    .min(4, 'A razão social deve ter pelo menos 4 caracteres.')
    .max(60, 'A razão social não pode exceder 60 caracteres.'),
  fantasia: z.string()
    .min(4, 'A fantasia deve ter pelo menos 4 caracteres.')
    .max(60, 'A fantasia não pode exceder 60 caracteres.')
    .nullable().optional(),
  inscicaoMunicipal: NullishString.default('ISENTO'),
  inscicaoEstadual: z.string()
    .min(3, 'A Inscrição Estadual deve ter pelo menos 3 caracteres.')
    .max(15, 'A Inscrição Estadual não pode exceder 15 caracteres.'),
  regimeTributario: z.number().int().min(1, 'O regime tributário é obrigatório.'),
  endereco: EnderecoSchema.nullable().optional(),
  idCSC: z.string()
    .min(1, 'O ID do CSC é obrigatório.')
    .max(6, 'O ID do CSC não pode exceder 6 caracteres.'),
  csc: z.string()
    .min(1, 'O CSC é obrigatório.')
    .max(36, 'O CSC não pode exceder 36 caracteres.'),
})

export type Emitente = z.infer<typeof EmitenteSchema>
