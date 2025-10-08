import * as z from "zod";
import { ConfiguracoesSchema } from '..';

export const EnvioCancalamentoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.object({
    motivo: z.string(),
    chaveAcesso: z.string(),
    protocolo: z.string(),
    xml: z.string(),
  }),
})

export type EnvioCancelamento = z.infer<typeof EnvioCancalamentoSchema>
