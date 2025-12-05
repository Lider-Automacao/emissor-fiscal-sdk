import { z } from 'zod';
import { DateSchema } from '../../types';
import { RegimeEspecialTributacaoSchema } from './regime-especial-tributacao';
import { StatusRpsSchema } from './status-rps';
import { TipoRPSSchema } from './tipo-rps';



export const RpsSchema = z.object({
  competencia: DateSchema,
  dataEmissao: DateSchema,
  numero: z.string().max(15).nonempty("O Número do RPS é obrigatório."), // Pode ter formatação específica (SetNumero)
  serie: z.string().max(5).nonempty("A Série do RPS é obrigatória."),
  lote: z.string().optional().nullable(),
  naturezaOperacao: z.number().int().min(1).max(7).default(1),
  regimeEspecialTributacao: RegimeEspecialTributacaoSchema.default(0),
  tipo: TipoRPSSchema,
  status: StatusRpsSchema,
});

export type Rps = z.infer<typeof RpsSchema>;