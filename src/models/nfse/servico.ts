import { z } from 'zod';
import { NullishStringSomenteNumeros, StringSomenteNumeros } from '../../types';
import { UFSchema } from '../auxiliares';
import { ExigibilidadeIssSchema } from './exigibilidade-iss';
import { ValoresSchema } from './valores';

export const ServicoSchema = z.object({
  descricao: z.string().max(2000, "A descrição do serviço é muito longa."),
  servico: z.string().optional().nullable(),

  cnae: StringSomenteNumeros.pipe(z.string().length(7, "CNAE deve ter 7 dígitos.")),
  codigoFederal: NullishStringSomenteNumeros,
  codigoMunicipal: NullishStringSomenteNumeros,
  codigoNacional: NullishStringSomenteNumeros,
  codigoNbs: NullishStringSomenteNumeros,
  codigoTributacaoMunicipio: NullishStringSomenteNumeros,

  versaoIBPT: z.string().max(10).optional().nullable(),
  municipio: z.number().int(),
  municipioIncidencia: z.number().int(),
  exigibilidadeIss: ExigibilidadeIssSchema,
  responsavelRetencao: z.union([
    z.literal(0).describe("Nenhum"),
    z.literal(1).describe("Tomador"),
    z.literal(2).describe("Prestador"),
    z.literal(3).describe("Intermediario"),
  ]),
  discriminacao: z.string().optional().nullable(),
  ufPrestacao: UFSchema.optional().nullable(),
  valores: ValoresSchema,
});


export type Servico = z.infer<typeof ServicoSchema>;