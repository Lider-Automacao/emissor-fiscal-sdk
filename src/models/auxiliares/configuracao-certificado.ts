import z from 'zod/v4/classic/external.cjs';


export const ConfiguracaoCertificadoSchema = z.object({
  arquivoBase64: z.base64("O arquivo do certificado é obrigatório."),
  senha: z.string().trim().nonempty('O arquivo do certificado é obrigatório.'),
});

export type ConfiguracaoCertificado = z.infer<typeof ConfiguracaoCertificadoSchema>;

