import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

const DevolucaoSchema = z.object({
  valor: NumberMinZeroSchema,
});


type Devolucao = z.infer<typeof DevolucaoSchema>;

export { Devolucao, DevolucaoSchema };

