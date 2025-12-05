import * as z from "zod";
import { ConfiguracoesSchema } from "../../models/auxiliares/configuracoes";
import { NfeSchema } from "../../models/nfe/nfe";


export const EnvioNfeApiSchema = z.object({
  nfe: NfeSchema,
  configuracoes: ConfiguracoesSchema,
})

export type EnvioNfeApi = z.input<typeof EnvioNfeApiSchema>
