import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

const CompraGovernamentalItemSchema = z.object({
  aliquotaUF: NumberMinZeroSchema,
  valorUF: NumberMinZeroSchema,
  aliquotaMunicipio: NumberMinZeroSchema,
  valorMunicipio: NumberMinZeroSchema,
  aliquotaCbs: NumberMinZeroSchema,
  valorCbs: NumberMinZeroSchema,
});

type CompraGovernamentalItem = z.infer<typeof CompraGovernamentalItemSchema>;

export { CompraGovernamentalItem, CompraGovernamentalItemSchema };

