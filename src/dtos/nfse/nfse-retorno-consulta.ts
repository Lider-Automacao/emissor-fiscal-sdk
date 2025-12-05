import { z } from 'zod';
import { DateSchema } from '../../types';

export const NfseRetornoConsultaSchema = z.object({
  id: z.string().optional().nullable(),
  protocolo: z.string().optional().nullable(),
  lote: z.string().optional().nullable(),

  numero: z.string().optional().nullable(),
  serie: z.string().optional().nullable(),
  codigoVerificacao: z.string().optional().nullable(),
  numeroRps: z.string().optional().nullable(),
  serieRps: z.string().optional().nullable(),

  situacao: z.string().optional().nullable(),
  status: z.string().optional().nullable(),

  envio: DateSchema,
  xml: z.string().optional().nullable(),
});

export type NfseRetornoConsulta = z.infer<typeof NfseRetornoConsultaSchema>;