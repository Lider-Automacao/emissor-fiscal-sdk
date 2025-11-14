import { z } from 'zod';
import { NumberMinZeroDefaultZeroSchema } from '../../types';

const CbsCreditoPresumidoSchema = z.object({
  codigo: z.string()
    .trim()
    .nonempty("O campo 'codigo' é obrigatório."),
  percentual: NumberMinZeroDefaultZeroSchema,
  valor: NumberMinZeroDefaultZeroSchema,
  valorSuspensivo: NumberMinZeroDefaultZeroSchema,
});

type CbsCreditoPresumido = z.infer<typeof CbsCreditoPresumidoSchema>;

export { CbsCreditoPresumido, CbsCreditoPresumidoSchema };

