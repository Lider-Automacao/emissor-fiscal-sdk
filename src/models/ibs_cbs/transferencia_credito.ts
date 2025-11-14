import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

const TransferenciaCreditoSchema = z.object({
  valorIbs: NumberMinZeroSchema,
  valorCbs: NumberMinZeroSchema,
});

type TransferenciaCredito = z.infer<typeof TransferenciaCreditoSchema>;

export { TransferenciaCredito, TransferenciaCreditoSchema };

