import { z } from "zod";
import { ConfiguracoesSchema } from "../../models";

export const NfseEnvioConsultaPorDpsSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dps: z.string().length(42, "A chave DPS deve ter 42 dígitos."),
});

export type NfseEnvioConsultaPorDps = z.infer<
  typeof NfseEnvioConsultaPorDpsSchema
>;
