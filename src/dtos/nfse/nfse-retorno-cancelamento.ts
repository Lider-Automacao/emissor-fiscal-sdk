import { z } from 'zod';
import { DateTimeSchema } from '../../types';

export const NfseRetornoCancelamentoSchema = z.object({
  data: DateTimeSchema,
  sucesso: z.boolean(),
  msgCanc: z.string().optional().nullable(),
  situacao: z.string().optional().nullable(),
  idEvento: z.string().optional().nullable(),
  sequenciaEvento: z.string().optional().nullable(),
});

export type NfseRetornoCancelamento = z.infer<typeof NfseRetornoCancelamentoSchema>;

