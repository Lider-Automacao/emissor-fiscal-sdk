import { z } from "zod";
import { NumberMinZeroDefaultZeroSchema, PercentualSchema } from "../../types";
import { CST_PIS_COFINS_SCHEMA } from "../auxiliares";

export const ValoresSchema = z.object({
  descontoCondicionado: NumberMinZeroDefaultZeroSchema,
  descontoIncondicionado: NumberMinZeroDefaultZeroSchema,
  valorDeducoes: NumberMinZeroDefaultZeroSchema,

  valorServicos: NumberMinZeroDefaultZeroSchema,

  aliquotaIss: PercentualSchema,
  aliquotaIrrf: PercentualSchema,
  aliquotaCsll: PercentualSchema,
  aliquotaInss: PercentualSchema,
  aliquotaPis: PercentualSchema,
  aliquotaCofins: PercentualSchema,
  aliquotaSuperSimples: PercentualSchema,

  valorIssRetido: NumberMinZeroDefaultZeroSchema,
  outrasRetencoes: NumberMinZeroDefaultZeroSchema,

  cst: CST_PIS_COFINS_SCHEMA,

  tributacaoFederalIBPT: PercentualSchema,
  tributacaoMunicipalIBPT: PercentualSchema,

  baseCalculo: NumberMinZeroDefaultZeroSchema,
  baseCalculoPisCofins: NumberMinZeroDefaultZeroSchema,
  valorLiquido: z.number(),
  valTotTributos: NumberMinZeroDefaultZeroSchema,
  valorCofins: NumberMinZeroDefaultZeroSchema,
  valorCsll: NumberMinZeroDefaultZeroSchema,
  valorInss: NumberMinZeroDefaultZeroSchema,
  valorIr: NumberMinZeroDefaultZeroSchema,
  valorIss: NumberMinZeroDefaultZeroSchema,
  valorPis: NumberMinZeroDefaultZeroSchema,
  valorTributoFederal: NumberMinZeroDefaultZeroSchema,
  valorTributoEstadual: NumberMinZeroDefaultZeroSchema,
  valorTributoMunicipal: NumberMinZeroDefaultZeroSchema,
  issRetido: z.union([
    z.literal(1).describe("Retenção"),
    z.literal(2).describe("Normal"),
    z.literal(3).describe("Substituição"),
    z.literal(4).describe("Nenhum"),
    z.literal(5).describe("Retido Fora do Município"),
    z.literal(6).describe("Devido Fora do Município Não Retido"),
  ]),
  pisCofinsRetido: z.union([
    z.literal(1).describe("Retido"),
    z.literal(2).describe("Não Retido"),
    z.literal(3).describe("Pis Cofins Csll Retido"),
    z.literal(4).describe("Pis Cofins Retido Csll Nao Retido"),
    z.literal(5).describe("Pis Retido Cofins Csll Nao Retido"),
    z.literal(6).describe("Cofins Retido Pis Csll Nao Retido"),
    z.literal(7).describe("Cofins Csll Retido Pis Nao Retido"),
    z.literal(8).describe("Csll Retido Pis Cofins Nao Retido"),
    z.literal(9).describe("Pis Csll Retido Cofins Nao Retido"),
  ]),
});

export type Valores = z.infer<typeof ValoresSchema>;
