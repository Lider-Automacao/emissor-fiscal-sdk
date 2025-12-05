import z from 'zod';
import { CPF_CNPJ_SCHEME } from '../../types';

const ConfiguracoesEnvioOutrosSchema = z.object({
  modelo: z.literal(99),
  ambiente: z.union([z.literal(1), z.literal(2)]).default(1).describe('1=Produção/2=Homologação'),
  documentoContador: CPF_CNPJ_SCHEME.min(1, 'CNPJ/CPF inválido').nullable().optional(),
});

const ConfiguracoesEnvioNFeSchema = ConfiguracoesEnvioOutrosSchema.extend({
  modelo: z.literal(55),
  tipoEmissao: z.union([z.literal(1), z.literal(9)]).default(1),
});

const ConfiguracoesEnvioNFCeSchema = ConfiguracoesEnvioNFeSchema.extend({
  modelo: z.literal(65),
  idCSC: z.string()
    .min(1, 'O ID do CSC é obrigatório.')
    .max(6, 'O ID do CSC não pode exceder 6 caracteres.'),
  csc: z.string()
    .min(1, 'O CSC é obrigatório.')
    .max(36, 'O CSC não pode exceder 36 caracteres.'),
});


export const ConfiguracoesEnvioSchema = z.discriminatedUnion('modelo', [
  ConfiguracoesEnvioOutrosSchema,
  ConfiguracoesEnvioNFCeSchema,
  ConfiguracoesEnvioNFeSchema
]);

export type ConfiguracoesEnvio = z.infer<typeof ConfiguracoesEnvioSchema>;
