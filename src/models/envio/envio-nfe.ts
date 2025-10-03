import * as z from "zod";
import { ConfiguracoesSchema } from "../configuracoes";
import { NfeSchema } from "../nfe/nfe";


export const EnvioNfeApiSchema = z.object({
  nfe: NfeSchema,
  configuracoes: ConfiguracoesSchema,
})

export type EnvioNfeApi = z.infer<typeof EnvioNfeApiSchema>
