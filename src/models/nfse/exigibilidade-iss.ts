import z from "zod";

export const NFSE_EXIGIBILIDADE_ISS_MAP = {
  1: 'Exigivel',
  2: 'NaoIncidencia',
  3: 'Isencao',
  4: 'Exportacao',
  5: 'Imunidade',
  6: 'SuspensaDecisaoJudicial',
  7: 'SuspensaProcessoAdministrativo',
  8: 'ISSFixo',
} as const;

export const ExigibilidadeIssSchema = z.union([
  z.literal(1).describe('ISS Exigível'),
  z.literal(2).describe('ISS Não Incidente (Não tributável)'),
  z.literal(3).describe('ISS Isento'),
  z.literal(4).describe('ISS Suspenso por Exportação'),
  z.literal(5).describe('ISS Suspenso por Imunidade'),
  z.literal(6).describe('ISS Suspenso por Decisão Judicial'),
  z.literal(7).describe('ISS Suspenso por Processo Administrativo'),
  z.literal(8).describe('ISS Fixo / Padrão (Fallback do Sistema)'),
]).default(1);

export type ExigibilidadeIss = z.infer<typeof ExigibilidadeIssSchema>;