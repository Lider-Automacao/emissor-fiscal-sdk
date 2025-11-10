import { z } from 'zod';

const CompraGovernamentalSchema = z.object({
  tipoEnte: z.number().int()
    .min(0),
  percentual: z.number()
    .min(0),
  tipoOperacao: z.number()
    .min(0),
});

type CompraGovernamental = z.infer<typeof CompraGovernamentalSchema>;

export { CompraGovernamental, CompraGovernamentalSchema };
