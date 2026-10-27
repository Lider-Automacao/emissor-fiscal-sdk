import z from 'zod';
import { NumberSchema } from '../../types/number-type';

export const FaturaSchema = z.object({
  numero: z.string().min(1).max(60),
  valorOriginal: NumberSchema,
  desconto: NumberSchema.nullish(),
  valorLiquido: NumberSchema,
});

export const DuplicataSchema = z.object({
  numero: z.string().regex(/^\d{3}$/, 'O número da duplicata deve ter 3 algarismos sequenciais (001, 002...).'),
  vencimento: z.iso.datetime({ offset: true }),
  valor: NumberSchema,
});

export const CobrancaSchema = z.object({
  fatura: FaturaSchema.nullish(),
  duplicatas: z.array(DuplicataSchema).max(120).default([]),
}).describe('Grupo Y (cobrança). Somente NF-e');

export type Fatura = z.infer<typeof FaturaSchema>;
export type Duplicata = z.infer<typeof DuplicataSchema>;
export type Cobranca = z.infer<typeof CobrancaSchema>;
