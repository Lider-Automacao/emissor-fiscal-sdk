import { z } from 'zod';
import { ValoresSchema } from '.';
import { StringSomenteNumeros } from '../../types';
import { ExigibilidadeIssSchema } from './exigibilidade-iss';

export const ServicoSchema = z.object({
  descricao: z.string().max(2000, "A descrição do serviço é muito longa."),
  servico: z.string().optional().nullable(),

  cnae: StringSomenteNumeros.pipe(z.string().length(7, "CNAE deve ter 7 dígitos.")),
  codigoFederal: StringSomenteNumeros.optional().nullable(),
  codigoMunicipal: StringSomenteNumeros.optional().nullable(),
  codigoNacional: StringSomenteNumeros.optional().nullable(),
  codigoNbs: StringSomenteNumeros.optional().nullable(),
  codigoTributacaoMunicipio: StringSomenteNumeros.optional().nullable(),

  versaoIBPT: z.string().max(10).optional().nullable(),
  municipio: z.number().int(),
  municipioIncidencia: z.number().int(),
  exigibilidadeIss: ExigibilidadeIssSchema,
  responsavelRetencao: z.number().int().min(1).max(2),
  discriminacao: z.string().optional().nullable(),
  ufPrestacao: z.string().length(2).optional().nullable(),
  issRetido: z.boolean(),
  valores: ValoresSchema,
});


export type Servico = z.infer<typeof ServicoSchema>;