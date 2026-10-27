import z from 'zod';
import { IntSchema } from '../../types/number-type';

const ChaveAcessoSchema = z.string().regex(/^\d{44}$/, 'A chave de acesso deve ter 44 dígitos.');
const AnoMesSchema = z.string().regex(/^\d{4}$/, 'Informe AAMM.');
const SerieSchema = IntSchema.pipe(z.number().min(0).max(999));
const NumeroSchema = IntSchema.pipe(z.number().min(1).max(999999999));

// O Neon serializa o enum Delphi como o identifier literal (ADR 0001)
export const DocumentoReferenciadoNotaSchema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('tdrNFe'),
    chaveAcesso: ChaveAcessoSchema,
  }),
  z.object({
    tipo: z.literal('tdrNF'),
    codigoUf: IntSchema,
    anoMes: AnoMesSchema,
    cnpj: z.string().length(14),
    modelo: z.enum(['01', '02']),
    serie: SerieSchema,
    numero: NumeroSchema,
  }),
  z.object({
    tipo: z.literal('tdrECF'),
    modelo: z.enum(['2B', '2C', '2D']),
    numeroEcf: z.string().regex(/^\d{3}$/),
    coo: z.string().regex(/^\d{6}$/),
  }),
  z.object({
    tipo: z.literal('tdrNFP'),
    codigoUf: IntSchema,
    anoMes: AnoMesSchema,
    cnpj: z.string().length(14).nullish(),
    cpf: z.string().length(11).nullish(),
    inscricaoEstadual: z.string().min(2).max(14),
    modelo: z.enum(['01', '04']),
    serie: SerieSchema,
    numero: NumeroSchema,
  }).refine((d) => Boolean(d.cnpj) !== Boolean(d.cpf), {
    message: 'Informe somente um entre cnpj e cpf.',
    path: ['cnpj'],
  }),
  z.object({
    tipo: z.literal('tdrCTe'),
    chaveAcesso: ChaveAcessoSchema,
  }),
]);

export const DFeReferenciadoItemSchema = z.object({
  chaveAcesso: ChaveAcessoSchema,
  numeroItem: IntSchema.pipe(z.number().min(1).max(999)).nullish(),
}).describe('Item do documento referenciado (devolução). Somente NF-e');

export type DocumentoReferenciadoNota = z.infer<typeof DocumentoReferenciadoNotaSchema>;
export type DFeReferenciadoItem = z.infer<typeof DFeReferenciadoItemSchema>;
