import { z } from "zod";
import { CST_PIS_COFINS_SCHEMA } from "../models/auxiliares";
import {
  DateSchema,
  NullishStringSomenteNumeros,
  NumberMinZeroDefaultZeroSchema,
  PercentualSchema,
  StringSomenteNumeros,
} from "../types";

export const CalculaNfseRequestSchema = z.object({
  municipioEmissor: z.number().int().min(1000000).max(9999999), // Código IBGE 7 dígitos
  municipioIncidencia: z.number().int().min(1000000).max(9999999), // Código IBGE 7 dígitos
  exigibilidadeIss: z.number().int().min(1).max(7),
  responsavelRetencao: z.union([
    z.literal(0).describe("Nenhum"),
    z.literal(1).describe("Tomador"),
    z.literal(2).describe("Prestador"),
    z.literal(3).describe("Intermediario"),
  ]),
  lote: z.string().optional().nullable(),
  competencia: DateSchema,
  numero: z.string().max(15).optional().nullable(),
  regimeTributario: z.number().int().min(1).max(6).optional().nullable(), // Regime Especial de Tributação

  descricao: z.string().max(2000),
  cnae: StringSomenteNumeros.pipe(
    z.string().length(7, "CNAE deve ter 7 dígitos."),
  ),
  codigoFederal: NullishStringSomenteNumeros,
  codigoMunicipal: NullishStringSomenteNumeros,
  codigoNacional: NullishStringSomenteNumeros,
  codigoNbs: NullishStringSomenteNumeros,

  descontoCondicionado: NumberMinZeroDefaultZeroSchema,
  descontoIncondicionado: NumberMinZeroDefaultZeroSchema,
  valorDeducoes: NumberMinZeroDefaultZeroSchema,
  valorServicos: NumberMinZeroDefaultZeroSchema,
  outrasRetencoes: NumberMinZeroDefaultZeroSchema,

  cst: CST_PIS_COFINS_SCHEMA,
  aliquotaSuperSimples: PercentualSchema,
  aliquotaIss: PercentualSchema,
  aliquotaPis: PercentualSchema,
  aliquotaCofins: PercentualSchema,
  aliquotaIrrf: PercentualSchema,
  aliquotaCsll: PercentualSchema,
  aliquotaInss: PercentualSchema,
  issRetido: z.number().int().min(1).max(6).default(4),
  pisCofinsRetido: z
    .union([
      z.literal(1).describe("Retido"),
      z.literal(2).describe("Não Retido"),
      z.literal(3).describe("Pis Cofins Csll Retido"),
      z.literal(4).describe("Pis Cofins Retido Csll Nao Retido"),
      z.literal(5).describe("Pis Retido Cofins Csll Nao Retido"),
      z.literal(6).describe("Cofins Retido Pis Csll Nao Retido"),
      z.literal(7).describe("Cofins Csll Retido Pis Nao Retido"),
      z.literal(8).describe("Csll Retido Pis Cofins Nao Retido"),
      z.literal(9).describe("Pis Csll Retido Cofins Nao Retido"),
    ])
    .default(2),
  aliquotaPisRetido: PercentualSchema.default(0),
  aliquotaCofinsRetido: PercentualSchema.default(0),
  tributacaoFederalIBPT: PercentualSchema.default(0),
  tributacaoMunicipalIBPT: PercentualSchema.default(0),
  versaoIBPT: z.string().max(10).optional().nullable(),
});

export type CalculaNfseRequest = z.input<typeof CalculaNfseRequestSchema>;
