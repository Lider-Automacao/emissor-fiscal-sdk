import z from 'zod';
import { NullishNumberSchema } from '../types/number-type';

export const OrigemCombustivelSchema = z.object({
  caminhao: z.string().optional(),
  placa: z.string().optional(),
  volume: z.number().optional(),
}).loose().describe('Detalhes da origem do combustível (placeholder)');

export const CombustivelSchema = z.object({
  codigoAnp: z.number().int().nonnegative('Código ANP deve ser um número inteiro não negativo e obrigatório.'),
  descricaoAnp: z.string().min(1, 'Descrição ANP é obrigatória.'),
  estadoConsumo: z.string().uppercase().length(2, 'Estado de consumo deve ter 2 caracteres.'),
  percentualGlp: NullishNumberSchema,
  percentualGnn: NullishNumberSchema,
  percentualGni: NullishNumberSchema,
  percentualMistura: NullishNumberSchema,
  valorPartida: NullishNumberSchema,
  faturamentoTemperaturaAmbiente: NullishNumberSchema,
  codigoAutorizacao: z.string().max(21).optional().nullable(),
  origemCombustivel: z.array(OrigemCombustivelSchema).nullable().optional(),
}).describe('Detalhes do Combustível');

export type Combustivel = z.infer<typeof CombustivelSchema>
export type OrigemCombustivel = z.infer<typeof OrigemCombustivelSchema>
