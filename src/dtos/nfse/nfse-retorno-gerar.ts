import { z } from 'zod';

export const NfseRetornoGerarSchema = z.object({
  id: z.string().optional().nullable(),
  xml: z.string().nonempty("O XML deve estar presente na resposta de geração."),
});

export type NfseRetornoGerar = z.infer<typeof NfseRetornoGerarSchema>;