import z from "zod";

export const CredenciaisApiSchema = z.object({
  usuario: z.string(),
  senha: z.string(),
  url: z.url(),
})

export type Credenciais = z.infer<typeof CredenciaisApiSchema>


