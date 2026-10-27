import z from 'zod';

export const CampoLivreSchema = z.object({
  campo: z.string().min(1).max(20),
  texto: z.string().min(1).max(60),
});

export const ProcessoReferenciadoSchema = z.object({
  numero: z.string().min(1).max(60),
  origem: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(9)]),
});

export const InformacoesAdicionaisSchema = z.object({
  fisco: z.string().min(1).max(2000).nullish(),
  observacoesContribuinte: z.array(CampoLivreSchema).max(10).default([]),
  observacoesFisco: z.array(CampoLivreSchema).max(10).default([]),
  processos: z.array(ProcessoReferenciadoSchema).max(100).default([]),
}).describe('Grupo Z (infAdic). Somente NF-e; infCpl fica em total.infoComplementar');

export type CampoLivre = z.infer<typeof CampoLivreSchema>;
export type ProcessoReferenciado = z.infer<typeof ProcessoReferenciadoSchema>;
export type InformacoesAdicionais = z.infer<typeof InformacoesAdicionaisSchema>;
