import { z } from 'zod';

const TransferenciaCreditoSchema = z.object({
  valorIbs: z.number()
    .min(0),

  valorCbs: z.number()
    .min(0),
});

type TransferenciaCredito = z.infer<typeof TransferenciaCreditoSchema>;

export { TransferenciaCredito, TransferenciaCreditoSchema };
