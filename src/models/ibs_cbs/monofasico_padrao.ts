import { z } from 'zod';

const MonofasicoPadraoSchema = z.object({
  quantidade: z.number()
    .min(0)
    .nullable()
    .optional(),

  aliquotaAdRemIbs: z.number()
    .min(0)
    .nullable()
    .optional(),

  aliquotaAdRemCbs: z.number()
    .min(0)
    .nullable()
    .optional(),

  valorIbs: z.number()
    .min(0)
    .nullable()
    .optional(),

  valorCbs: z.number()
    .min(0)
    .nullable()
    .optional(),
});

type MonofasicoPadrao = z.infer<typeof MonofasicoPadraoSchema>;

export { MonofasicoPadrao, MonofasicoPadraoSchema };
