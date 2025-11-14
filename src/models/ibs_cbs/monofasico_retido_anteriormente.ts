import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

const MonofasicoRetidoAnteriormenteSchema = z.object({
  quantidadeRetida: NumberMinZeroSchema.nullish(),
  aliquotaAdRemIbsRetida: NumberMinZeroSchema.nullish(),
  valorIbsRetido: NumberMinZeroSchema.nullish(),
  aliquotaAdRemCbsRetida: NumberMinZeroSchema.nullish(),
  valorCbsRetida: NumberMinZeroSchema.nullish(),
});

type MonofasicoRetidoAnteriormente = z.infer<typeof MonofasicoRetidoAnteriormenteSchema>;

export { MonofasicoRetidoAnteriormente, MonofasicoRetidoAnteriormenteSchema };

