import { z } from 'zod';
import { NumberMinZeroDefaultZeroSchema, PercentualSchema } from '../../types';
import { CST_SCHEMA } from '../auxiliares';

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

  cst: CST_SCHEMA,

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
});

export type Valores = z.infer<typeof ValoresSchema>;