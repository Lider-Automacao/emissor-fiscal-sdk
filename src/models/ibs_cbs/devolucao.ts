import { z } from 'zod';

const DevolucaoSchema = z.object({
  valor: z.number()
    .min(0),
});


type Devolucao = z.infer<typeof DevolucaoSchema>;

export { Devolucao, DevolucaoSchema };

