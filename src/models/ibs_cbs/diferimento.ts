import { z } from 'zod';

const DiferimentoSchema = z.object({
  aliquota: z.number().min(0),
  valor: z.number().min(0),
});

type Diferimento = z.infer<typeof DiferimentoSchema>;

export { Diferimento, DiferimentoSchema };

