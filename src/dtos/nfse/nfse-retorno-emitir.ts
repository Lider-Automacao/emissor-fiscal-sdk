import { z } from 'zod';
import { DateTimeSchema } from '../../types';

export const NfseRetornoEmitirSchema = z.object({
  id: z.string().optional().nullable(),
  idRps: z.string().optional().nullable(),
  protocolo: z.string().optional().nullable(),
  lote: z.string().optional().nullable(),

  numero: z.string().optional().nullable(),
  numeroRps: z.string().optional().nullable(),
  codigoVerificacao: z.string().optional().nullable(),

  status: z.string().optional().nullable(),
  envio: DateTimeSchema,
  xml: z.string().optional().nullable(),
});

export type NfseRetornoEmitir = z.infer<typeof NfseRetornoEmitirSchema>;