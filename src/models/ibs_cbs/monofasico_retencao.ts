import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

const MonofasicoRetencaoSchema = z.object({
  quantidadeRetencao: NumberMinZeroSchema.nullish(),
  aliquotaAdRemIbsRetencao: NumberMinZeroSchema.nullish(),
  valorIbsRetencao: NumberMinZeroSchema.nullish(),
  aliquotaAdRemCbsRetencao: NumberMinZeroSchema.nullish(),
  valorCbsRetencao: NumberMinZeroSchema.nullish(),
});

type MonofasicoRetencao = z.infer<typeof MonofasicoRetencaoSchema>;

export { MonofasicoRetencao, MonofasicoRetencaoSchema };

