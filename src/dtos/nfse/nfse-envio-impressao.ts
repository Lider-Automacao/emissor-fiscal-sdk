import { z } from 'zod';
import { ConfiguracoesSchema } from '../../models';


const DadosSchema = z.object({
  xml: z.string().nonempty("O XML da NFSe é obrigatório para a impressão."),
});

export const NfseEnvioImpressaoSchema = z.object({
  dados: DadosSchema,
  configuracoes: ConfiguracoesSchema,
});

export type NfseEnvioImpressao = z.infer<typeof NfseEnvioImpressaoSchema>;