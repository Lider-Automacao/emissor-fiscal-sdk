import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

const ReducaoSchema = z.object({
  aliquota: NumberMinZeroSchema,
  aliquotaEfetiva: NumberMinZeroSchema,
});

type Reducao = z.infer<typeof ReducaoSchema>;

export { Reducao, ReducaoSchema };

