import z from 'zod';


export const ConfiguracaoResponsavelTecnicoSchema = z.object({
  cnpj: z.string().nullable().optional(),
  contato: z.string().nullable().optional(),
  email: z.email().nullable().optional(),
  fone: z.string().nullable().optional(),
  idCsrt: z.number().int().nullable().optional(),
  hashCsrt: z.string().nullable().optional(),
});

export type ConfiguracaoResponsavelTecnico = z.infer<typeof ConfiguracaoResponsavelTecnicoSchema>;
