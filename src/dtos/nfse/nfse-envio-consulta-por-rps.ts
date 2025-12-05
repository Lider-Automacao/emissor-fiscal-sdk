import { z } from 'zod';
import { ConfiguracoesSchema } from '../../models';
import { TipoRPSSchema } from '../../models/nfse/tipo-rps';

const DadosSchema = z.object({
  numero: z.string().nonempty("O número do RPS é obrigatório."),
  serie: z.string().nonempty("A série do RPS é obrigatória."),
  protocolo: z.string(),
  tipoRps: TipoRPSSchema,
});


export const NfseEnvioConsultaPorRpsSchema = z.object({
  dados: DadosSchema,
  configuracoes: ConfiguracoesSchema,
});

export type NfseEnvioConsultaPorRps = z.infer<typeof NfseEnvioConsultaPorRpsSchema>;

