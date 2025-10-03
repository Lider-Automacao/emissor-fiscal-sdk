import * as z from "zod";
import { ConfiguracoesSchema } from '..';
import { NullishString } from '../../types';



export const EnvioImpressaoSchema = z.object({
  configuracoes: ConfiguracoesSchema,
  dados: z.object({
    xml: z.string(),
    status: z.enum([
      'A',
      'C',
      'D',
      'I',
      'O',
      'G',
      'S',
      'N'
    ]),
    evento: NullishString,
  }),
})

export type EnvioImpressao = z.infer<typeof EnvioImpressaoSchema>
