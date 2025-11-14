import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

const MonofasicoDiferimentoSchema = z.object({
  aliquotaIbsDiferimento: NumberMinZeroSchema.nullish(),
  valorIbsDiferimento: NumberMinZeroSchema.nullish(),
  aliquotaCbsDiferimento: NumberMinZeroSchema.nullish(),
  valorCbsDiferimento: NumberMinZeroSchema.nullish(),
});

type MonofasicoDiferimento = z.infer<typeof MonofasicoDiferimentoSchema>;

export { MonofasicoDiferimento, MonofasicoDiferimentoSchema };

