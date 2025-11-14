import { z } from 'zod';
import { IntMinZeroSchema, NumberMinZeroDefaultZeroSchema } from '../../types';

const CreditoPresumidoZfmSchema = z.object({
  tipo: IntMinZeroSchema,
  valor: NumberMinZeroDefaultZeroSchema.nullish(),
});

type CreditoPresumidoZfm = z.infer<typeof CreditoPresumidoZfmSchema>;

export { CreditoPresumidoZfm, CreditoPresumidoZfmSchema };

