import z from 'zod'
import { IntSchema, NumberSchema } from '../types/number-type'

export const OrigemCombustivelSchema = z.object({
  indicadorImportacao: z.coerce.string(),
  codigoUf: IntSchema,
  percentualOrigUf: NumberSchema,
})

export const CombustivelSchema = z.object({
  codigoAnp: z.string(),
  descricaoAnp: z.string(),
  percentualGlp: NumberSchema,
  percentualGnn: NumberSchema,
  percentualGni: NumberSchema,
  percentualMistura: NumberSchema,
  valorPartida: NumberSchema,
  codigoAutorizacao: z.string().max(21).optional().nullable(),
  faturamentoTemperaturaAmbiente: NumberSchema,
  estadoConsumo: z.string(),
  origemCombustivel: z.array(OrigemCombustivelSchema),
})

export type Combustivel = z.infer<typeof CombustivelSchema>
export type OrigemCombustivel = z.infer<typeof OrigemCombustivelSchema>
