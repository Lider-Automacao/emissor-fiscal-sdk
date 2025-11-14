import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

const MonofasicoPadraoSchema = z.object({
  quantidade: NumberMinZeroSchema.nullish(),
  aliquotaAdRemIbs: NumberMinZeroSchema.nullish(),
  aliquotaAdRemCbs: NumberMinZeroSchema.nullish(),
  valorIbs: NumberMinZeroSchema.nullish(),
  valorCbs: NumberMinZeroSchema.nullish(),
});

type MonofasicoPadrao = z.infer<typeof MonofasicoPadraoSchema>;

export { MonofasicoPadrao, MonofasicoPadraoSchema };

