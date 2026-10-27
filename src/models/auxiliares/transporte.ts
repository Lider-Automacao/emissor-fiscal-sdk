import z from 'zod';
import { IntSchema, NumberSchema } from '../../types/number-type';

export const TransportadorSchema = z.object({
  documento: z.string().regex(/^(\d{11}|\d{14})$/, 'O documento do transportador deve ser CPF (11) ou CNPJ (14) apenas com números.'),
  nome: z.string().min(2).max(60),
  inscricaoEstadual: z.string().nullish().describe('IE ou ISENTO; com ela a UF é obrigatória (rej. 559)'),
  endereco: z.string().max(60).nullish(),
  municipio: z.string().max(60).nullish(),
  uf: z.string().length(2).nullish().describe('Sigla da UF (EX para exterior)'),
});

export const RetencaoIcmsTransporteSchema = z.object({
  valorServico: NumberSchema,
  baseCalculo: NumberSchema,
  aliquota: NumberSchema,
  valorRetido: NumberSchema,
  cfop: z.string().length(4),
  municipioFatoGerador: IntSchema.pipe(z.number().min(1000000).max(9999999)),
});

export const VeiculoTransporteSchema = z.object({
  placa: z.string().min(1),
  uf: z.string().length(2),
  rntc: z.string().nullish(),
});

export const VolumeSchema = z.object({
  quantidade: IntSchema.nullish(),
  especie: z.string().max(60).nullish(),
  marca: z.string().max(60).nullish(),
  numeracao: z.string().max(60).nullish(),
  pesoLiquido: NumberSchema.nullish(),
  pesoBruto: NumberSchema.nullish(),
  lacres: z.array(z.string().min(1).max(60)).max(5000).default([]),
});

export const TransporteSchema = z.object({
  modalidadeFrete: z.union([
    z.literal(0), // remetente (CIF)
    z.literal(1), // destinatário (FOB)
    z.literal(2), // terceiros
    z.literal(3), // próprio do remetente
    z.literal(4), // próprio do destinatário
    z.literal(9), // sem transporte
  ]),
  transportador: TransportadorSchema.nullish(),
  retencao: RetencaoIcmsTransporteSchema.nullish().describe('Somente NF-e'),
  veiculo: VeiculoTransporteSchema.nullish().describe('Somente NF-e'),
  reboques: z.array(VeiculoTransporteSchema).max(5).default([]).describe('Somente NF-e'),
  vagao: z.string().max(20).nullish().describe('Somente NF-e'),
  balsa: z.string().max(20).nullish().describe('Somente NF-e'),
  volumes: z.array(VolumeSchema).max(5000).default([]).describe('Somente NF-e'),
});

export type Transportador = z.infer<typeof TransportadorSchema>;
export type RetencaoIcmsTransporte = z.infer<typeof RetencaoIcmsTransporteSchema>;
export type VeiculoTransporte = z.infer<typeof VeiculoTransporteSchema>;
export type Volume = z.infer<typeof VolumeSchema>;
export type Transporte = z.infer<typeof TransporteSchema>;
