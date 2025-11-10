import { z } from 'zod';

const IbsCreditoPresumidoSchema = z.object({
  codigo: z.string()
    .min(1),

  percentual: z.number()
    .min(0),

  valor: z.number()
    .min(0),

  valorSuspensivo: z.number()
    .min(0),
});

type IbsCreditoPresumido = z.infer<typeof IbsCreditoPresumidoSchema>;

export { IbsCreditoPresumido, IbsCreditoPresumidoSchema };

