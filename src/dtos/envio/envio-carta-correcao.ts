import * as z from "zod";
import { ConfiguracoesSchema } from '../../models';

export const EnvioCartaCorrecaoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.object({
    chaveAcesso: z.string(),
    // Convenio S/N de 15/12/1970, art. 7 §1o-A (c/c Ajuste SINIEF 01/07)
    correcao: z.string().min(15).max(1000),
    // Somente 20 eventos de CC-e sao permitidos por NF-e
    sequenciaEvento: z.number().int().min(1).max(20),
  }),
})

export type EnvioCartaCorrecao = z.input<typeof EnvioCartaCorrecaoSchema>
