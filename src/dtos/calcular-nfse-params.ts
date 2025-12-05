import { z } from 'zod';
import { CST_PIS_COFINS_SCHEMA } from '../models/auxiliares';
import { DateSchema, NumberMinZeroDefaultZeroSchema, PercentualSchema, StringSomenteNumeros } from '../types';



export const CalculaNfseRequestSchema = z.object({
  municipioEmissor: z.number().int().min(1000000).max(9999999), // Código IBGE 7 dígitos
  municipioIncidencia: z.number().int().min(1000000).max(9999999), // Código IBGE 7 dígitos
  exigibilidadeIss: z.number().int().min(1).max(7),
  responsavelRetencao: z.number().int().min(1).max(2).optional().nullable(),

  lote: z.string().optional().nullable(),
  competencia: DateSchema,
  numero: z.string().max(15).optional().nullable(),
  regimeTributario: z.number().int().min(1).max(6).optional().nullable(), // Regime Especial de Tributação

  descricao: z.string().max(2000),
  cnae: StringSomenteNumeros.pipe(z.string().length(7, "CNAE deve ter 7 dígitos.")),
  codigoFederal: StringSomenteNumeros.optional().nullable(),
  codigoMunicipal: StringSomenteNumeros.optional().nullable(),
  codigoNacional: StringSomenteNumeros.optional().nullable(),
  codigoNbs: StringSomenteNumeros.optional().nullable(),

  descontoCondicionado: NumberMinZeroDefaultZeroSchema,
  descontoIncondicionado: NumberMinZeroDefaultZeroSchema,
  valorDeducoes: NumberMinZeroDefaultZeroSchema,
  valorServicos: NumberMinZeroDefaultZeroSchema,
  valorIssRetido: NumberMinZeroDefaultZeroSchema,
  outrasRetencoes: NumberMinZeroDefaultZeroSchema,

  cst: CST_PIS_COFINS_SCHEMA,
  aliquotaIss: PercentualSchema,
  aliquotaPis: PercentualSchema,
  aliquotaCofins: PercentualSchema,
  aliquotaIrrf: PercentualSchema,
  aliquotaCsll: PercentualSchema,
  aliquotaInss: PercentualSchema,
  issRetido: z.boolean().default(false),

  tributacaoFederalIBPT: PercentualSchema,
  tributacaoMunicipalIBPT: PercentualSchema,
  versaoIBPT: z.string().max(10).optional().nullable(),
});


export type CalculaNfseRequest = z.infer<typeof CalculaNfseRequestSchema>;