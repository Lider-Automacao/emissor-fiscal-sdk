import { z } from "zod";

export const NfseRetornoConsultaDpsSchema = z.object({
  dps: z.string().optional().nullable(),
  xml: z.string().optional().nullable(),
});

export type NfseRetornoConsultaDps = z.infer<
  typeof NfseRetornoConsultaDpsSchema
>;
