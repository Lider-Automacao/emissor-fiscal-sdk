import z from "zod";

export const EnderecoSchema = z.object({
  logradouro: z.string()
    .min(1, 'O logradouro é obrigatório.')
    .max(60, 'O logradouro não pode exceder 60 caracteres.'),
  numero: z.string().min(1, 'O número é obrigatório.'),
  bairro: z.string()
    .min(1, 'O bairro é obrigatório.')
    .max(60, 'O bairro não pode exceder 60 caracteres.'),
  municipioCodigo: z.number().int().positive('O código do município é obrigatório e deve ser positivo.'),
  municipioNome: z.string()
    .min(2, 'O nome do município deve ter pelo menos 2 caracteres.')
    .max(60, 'O nome do município não pode exceder 60 caracteres.'),
  complemento: z.string()
    .max(60, 'O complemento não pode exceder 60 caracteres.')
    .nullable().optional(),
  cep: z.string()
    .regex(/^\d{8}$/, 'O CEP deve conter 8 dígitos numéricos, sem formatação.')
    .nullable().optional(),
  paisCodigo: z.number().int().positive('O código do país deve ser positivo.')
    .nullable().optional(),
  paisNome: z.string()
    .min(2, 'O nome do país deve ter pelo menos 2 caracteres.')
    .max(60, 'O nome do país não pode exceder 60 caracteres.')
    .nullable().optional(),
  fone: z.string().nullable().optional(),

}).describe('Schema para Endereço Completo');