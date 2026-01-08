import z from "zod";
import { DateSchema, PercentualSchema } from "../../types";
import { CST_IBS_CBS_SCHEMA, EnderecoSchema } from "../auxiliares";


const documentoReferenciadoSchema = z.object({
  tipoDocumento: z.number().int(),
  chaveAcesso: z.string().optional(),
  numeroDocumento: z.string().optional(),
  descricaoDocumento: z.string().optional(),
  dataEmissao: DateSchema,
  valorFinanceiro: z.number().nonnegative()
});

const imovelSchema = z.object({
  inscricaoImobiliaria: z.string().optional(),
  cib: z.string().optional(),
  endereco: EnderecoSchema.nullish()
});

export const NfseIbsCbsSchema = z.object({
  cst: CST_IBS_CBS_SCHEMA,
  classificacaoTributaria: z.string(),
  consumidorFinal: z.boolean().default(false),
  percentualDiferimentoUF: PercentualSchema.default(0),
  percentualDiferimentoMunicipal: PercentualSchema.default(0),
  percentualDiferimentoCBS: PercentualSchema.default(0),
  cbs: PercentualSchema.default(0),
  ibsMunicipal: PercentualSchema.default(0),
  ibsEstadual: PercentualSchema.default(0),
  finalidadeEmissao: z.number().int().nullish(),
  codigoIndicadorOperacao: z.string().nullish(),
  tipoOperacao: z.number().int().nullish(),
  entidadeGovernamental: z.number().int().nullish(),
  imovel: imovelSchema.nullish(),
  documentosReferenciados: z.array(documentoReferenciadoSchema).default([])
});

export type NfseIbsCbs = z.infer<typeof NfseIbsCbsSchema>;
export type DocumentoReferenciado = z.infer<typeof documentoReferenciadoSchema>;