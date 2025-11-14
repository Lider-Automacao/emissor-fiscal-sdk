import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

const IbsCreditoPresumidoSchema = z.object({
  codigo: z.string().nonempty().trim(),
  percentual: NumberMinZeroSchema,
  valor: NumberMinZeroSchema,
  valorSuspensivo: NumberMinZeroSchema,
});

type IbsCreditoPresumido = z.infer<typeof IbsCreditoPresumidoSchema>;

export { IbsCreditoPresumido, IbsCreditoPresumidoSchema };

