import z from 'zod';
import { CPF_CNPJ_SCHEME } from '../../types';

const ConfiguracoesEnvioOutrosSchema = z.object({
  modelo: z.literal(99),
  ambiente: z.union([z.literal(1), z.literal(2)]).default(1).describe('1=Produção/2=Homologação'),
  documentoContador: CPF_CNPJ_SCHEME.min(1, 'CNPJ/CPF inválido').nullable().optional(),
  tempoLimiteMs: z.number().int().positive().nullish()
    .describe('Tempo máximo de espera da resposta da SEFAZ, em milissegundos. Sem ele vale 18000 (18 s)'),
});

const ConfiguracoesEnvioNFeSchema = ConfiguracoesEnvioOutrosSchema.extend({
  modelo: z.literal(55),
  tipoEmissao: z.union([z.literal(1), z.literal(9)]).default(1),
});

const ConfiguracoesEnvioNFCeSchema = ConfiguracoesEnvioNFeSchema.extend({
  modelo: z.literal(65),
  versaoQrCode: z.union([z.literal(2), z.literal(3)]).nullish()
    .describe('A versão 3 dispensa o CSC e é obrigatória no DANFE Simplificado Tipo 2 (NT 2026.002)'),
  limiteSemDestinatario: z.number().nonnegative().nullish()
    .describe('Valor da NFC-e acima do qual o destinatário precisa ser identificado (W16-40 a W16-60). Sem ele vale R$ 10.000,00'),
  idCSC: z.string()
    .min(1, 'O ID do CSC é obrigatório.')
    .max(6, 'O ID do CSC não pode exceder 6 caracteres.')
    .nullish(),
  csc: z.string()
    .min(1, 'O CSC é obrigatório.')
    .max(36, 'O CSC não pode exceder 36 caracteres.')
    .nullish(),
}).superRefine((data, ctx) => {
  if (data.versaoQrCode === 3) return;

  if (!data.idCSC) {
    ctx.addIssue({ code: 'custom', path: ['idCSC'], message: 'O ID do CSC é obrigatório.' });
  }
  if (!data.csc) {
    ctx.addIssue({ code: 'custom', path: ['csc'], message: 'O CSC é obrigatório.' });
  }
});


export const ConfiguracoesEnvioSchema = z.discriminatedUnion('modelo', [
  ConfiguracoesEnvioOutrosSchema,
  ConfiguracoesEnvioNFCeSchema,
  ConfiguracoesEnvioNFeSchema
]);

export type ConfiguracoesEnvio = z.infer<typeof ConfiguracoesEnvioSchema>;
