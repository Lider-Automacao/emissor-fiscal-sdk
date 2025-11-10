import { z } from 'zod';

const CreditoPresumidoZfmSchema = z.object({
  tipo: z.number().int()
    .min(0),

  valor: z.number()
    .min(0)
    .nullable()
    .optional(),
});

type CreditoPresumidoZfm = z.infer<typeof CreditoPresumidoZfmSchema>;

export { CreditoPresumidoZfm, CreditoPresumidoZfmSchema };
