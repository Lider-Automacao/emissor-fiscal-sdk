import { z } from "zod";

import { ConfiguracoesSchema } from "../../models";
import { NFSeSchema } from "../../models/nfse";

export const NfseEnvioEmitirSchema = z.object({
  nfse: NFSeSchema,
  configuracoes: ConfiguracoesSchema,
  enviarPorEmail: z.boolean().default(false),
});

export type NfseEnvioEmitir = z.input<typeof NfseEnvioEmitirSchema>;
