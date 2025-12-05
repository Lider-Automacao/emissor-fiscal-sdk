import z from 'zod';


export const ConfiguracaoEmailSchema = z.object({
  host: z.string().trim().nonempty(),
  password: z.string().trim().nonempty(),
  port: z.coerce.string().trim().nonempty().regex(/^\d+$/, 'A porta deve ser um número inteiro.'),
  userName: z.string().trim().nonempty(),
});

export type ConfiguracaoEmail = z.infer<typeof ConfiguracaoEmailSchema>;
