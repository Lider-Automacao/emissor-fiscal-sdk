import z from 'zod';


export const ConfiguracaoCertificadoSchema = z.object({
  arquivoBase64: z.base64("O arquivo do certificado é obrigatório."),
  senha: z.string().trim().nonempty('O arquivo do certificado é obrigatório.'),
});

export type ConfiguracaoCertificado = z.infer<typeof ConfiguracaoCertificadoSchema>;

