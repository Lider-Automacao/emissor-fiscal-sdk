import { z } from 'zod';

export const ContatoSchema = z.object({
  email: z.email("Formato de e-mail inválido.").nullable().optional(),
  telefone: z.string().nullable().optional(),
});

export type Contato = z.infer<typeof ContatoSchema>;