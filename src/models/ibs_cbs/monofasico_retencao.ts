import { z } from 'zod';

const MonofasicoRetencaoSchema = z.object({
  quantidadeRetencao: z.number()
    .min(0)
    .nullable()
    .optional(),

  aliquotaAdRemIbsRetencao: z.number()
    .min(0)
    .nullable()
    .optional(),

  valorIbsRetencao: z.number()
    .min(0)
    .nullable()
    .optional(),

  aliquotaAdRemCbsRetencao: z.number()
    .min(0)
    .nullable()
    .optional(),

  valorCbsRetencao: z.number()
    .min(0)
    .nullable()
    .optional(),
});

type MonofasicoRetencao = z.infer<typeof MonofasicoRetencaoSchema>;

export { MonofasicoRetencao, MonofasicoRetencaoSchema };
