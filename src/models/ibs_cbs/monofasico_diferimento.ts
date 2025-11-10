import { z } from 'zod';

const MonofasicoDiferimentoSchema = z.object({
  aliquotaIbsDiferimento: z.number()
    .min(0)
    .nullable()
    .optional(),

  valorIbsDiferimento: z.number()
    .min(0)
    .nullable()
    .optional(),

  aliquotaCbsDiferimento: z.number()
    .min(0)
    .nullable()
    .optional(),

  valorCbsDiferimento: z.number()
    .min(0)
    .nullable()
    .optional(),
});

type MonofasicoDiferimento = z.infer<typeof MonofasicoDiferimentoSchema>;

export { MonofasicoDiferimento, MonofasicoDiferimentoSchema };
