import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

const DiferimentoSchema = z.object({
  aliquota: NumberMinZeroSchema,
  valor: NumberMinZeroSchema,
});

type Diferimento = z.infer<typeof DiferimentoSchema>;

export { Diferimento, DiferimentoSchema };

