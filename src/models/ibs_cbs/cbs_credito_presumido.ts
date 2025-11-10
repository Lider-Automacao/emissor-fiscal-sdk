import { z } from 'zod';

const CbsCreditoPresumidoSchema = z.object({
  codigo: z.string()
    .trim()
    .nonempty("O campo 'codigo' é obrigatório."),
  percentual: z.number()
    .min(0),
  valor: z.number()
    .min(0),
  valorSuspensivo: z.number()
    .min(0),
});

type CbsCreditoPresumido = z.infer<typeof CbsCreditoPresumidoSchema>;

export { CbsCreditoPresumido, CbsCreditoPresumidoSchema };

