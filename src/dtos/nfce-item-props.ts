import * as z from 'zod'

const QuantidadeSchema = z.object({
  comercial: z.number().optional().nullable(),
  tributavel: z.number().optional().nullable(),
})

const UnidadeSchema = z.object({
  comercial: z.string().optional().nullable(),
  tributavel: z.string().optional().nullable(),
  comercialId: z.number().optional().nullable(),
  tributavelId: z.number().optional().nullable(),
})

const PercentuaisOrigemSchema = z.object({
  codigoUf: z.string().optional(),
  percentualOrigUf: z.number().optional(),
})

const CombustivelSchema = z.object({
  codigoAnp: z.string().optional(),
  descricaoAnp: z.string().optional(),
  percentualGlp: z.number().optional(),
  percentualGnn: z.number().optional(),
  percentualGni: z.number().optional(),
  estadoConsumo: z.string().optional(),
  percentuaisOrigem: PercentuaisOrigemSchema.optional(),
})

export const NfceItemPropsSchema = z.object({
  controleItem: z.number().optional().nullable(),
  codigo: z.number().optional().nullable(),
  codigoBarras: z.string().optional().nullable().default('SEM GTIN'),
  descricao: z.string().optional().nullable(),
  ncm: z.string().optional().nullable(),
  exTipi: z.string().optional().nullable(),
  cest: z.string().optional().nullable(),
  cfop: z.string().optional().nullable(),
  valorBruto: z.number().optional().nullable(),
  compoeTotal: z.boolean().optional().nullable(),
  codigoBeneficioFiscal: z.string().optional().nullable(),
  valorFrete: z.number().optional().nullable(),
  valorSeguro: z.number().optional().nullable(),
  valorDesconto: z.number().optional().nullable(),
  valorOutros: z.number().optional().nullable(),
  unidade: UnidadeSchema.optional(),
  quantidade: QuantidadeSchema.optional(),
  valorUnitario: QuantidadeSchema.optional(),
  valorLiquido: z.number().optional().nullable(),
  origem: z.string().optional().nullable(),
  cst: z.string().optional().nullable(),
  cstId: z.number().optional().nullable(),
  aliquota: z.number().optional().nullable(),
  percentualReducao: z.number().optional().nullable(),
  aliquotaSt: z.number().optional().nullable(),
  aliquotaSuperSimples: z.number().optional().nullable(),
  cstPis: z.string().optional().nullable(),
  aliquotaPis: z.number().optional().nullable(),
  cstCofins: z.string().optional().nullable(),
  aliquotaCofins: z.number().optional().nullable(),
  combustivel: CombustivelSchema.optional().nullable(),
  aliquotaAdRemRetido: z.number().optional().nullable(),
  aliquotaFcp: z.number().optional().nullable(),
  valorAproximadoTributos: z.number().optional().nullable(),
  removeIcmsBasePisCofins: z.boolean().optional().nullable(),
  cestId: z.number().optional().nullable(),
  cfopId: z.number().optional().nullable(),
  ncmId: z.number().optional().nullable(),
  origemId: z.number().optional().nullable(),
  alteraEstoque: z.union([z.literal('S'), z.literal('N')]),
  couvert: z.union([z.literal('S'), z.literal('N')]),
  gorjeta: z.union([z.literal('S'), z.literal('N')]),
  percentualOrigem: z.number().optional().nullable(),
  ambiente: z.number().optional().nullable(),
  tipoImposto: z.number().optional().nullable(),
  grade: z.number().optional().nullable(),
  pdv: z.number().optional().nullable(),
})

export type NfceItemProps = z.infer<typeof NfceItemPropsSchema>
