import * as z from "zod";
import { ConfiguracoesSchema } from '..';

export const EnvioCancalamentoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.object({
    motivo: z.string().min(15).max(255),
    chaveAcesso: z.string(),
    protocolo: z.string(),
    xml: z.string(),
  }),
})

export type EnvioCancelamento = z.input<typeof EnvioCancalamentoSchema>
