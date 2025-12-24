import { z } from 'zod';
import { EnderecoSchema } from '../auxiliares';

export const ObraSchema = z.object({
  codigoObra: z.string()
    .min(1, "O código da obra é obrigatório")
    .max(15, "O código da obra deve ter no máximo 15 caracteres"),
  art: z.string()
    .min(1, "A ART é obrigatória")
    .max(15, "A ART deve ter no máximo 15 caracteres"),
  endereco: EnderecoSchema.nullable().optional(),
});


export type Obra = z.infer<typeof ObraSchema>;