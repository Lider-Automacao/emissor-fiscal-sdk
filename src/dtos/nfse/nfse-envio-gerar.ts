import { z } from 'zod';

import { ConfiguracoesSchema } from '../../models';
import { NFSeSchema } from '../../models/nfse';

export const NfseEnvioGerarSchema = z.object({
  nfse: NFSeSchema,
  configuracoes: ConfiguracoesSchema,
});

export type NfseEnvioGerar = z.infer<typeof NfseEnvioGerarSchema>;