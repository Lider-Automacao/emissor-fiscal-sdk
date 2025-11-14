import * as z from "zod";
import { ConfiguracoesSchema } from '..';
import { NfceSchema } from '../nfce/nfce';

export const EnvioNfceApiSchema = z.object({
  nfce: NfceSchema,
  configuracoes: ConfiguracoesSchema,
})

export type EnvioNfceApi = z.input<typeof EnvioNfceApiSchema>
