import { z } from 'zod';
import { IntMinZeroSchema, NumberMinZeroSchema } from '../../types';

const CompraGovernamentalSchema = z.object({
  tipoEnte: IntMinZeroSchema,
  percentual: NumberMinZeroSchema,
  tipoOperacao: NumberMinZeroSchema,
});

type CompraGovernamental = z.infer<typeof CompraGovernamentalSchema>;

export { CompraGovernamental, CompraGovernamentalSchema };

