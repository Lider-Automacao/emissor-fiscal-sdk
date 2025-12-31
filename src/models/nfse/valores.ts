import { z } from 'zod';
import { NumberMinZeroDefaultZeroSchema, PercentualSchema } from '../../types';
import { CST_PIS_COFINS_SCHEMA } from '../auxiliares';

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
});

export type Valores = z.infer<typeof ValoresSchema>;