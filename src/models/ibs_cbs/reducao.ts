import { z } from 'zod';

const ReducaoSchema = z.object({
  aliquota: z.number()
    .min(0),
  aliquotaEfetiva: z.number()
    .min(0),
});

type Reducao = z.infer<typeof ReducaoSchema>;

export { Reducao, ReducaoSchema };

