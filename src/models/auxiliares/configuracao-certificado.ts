import z from 'zod';

const ConfiguracaoCertificadoArquivoSchema = z.object({
  arquivoBase64: z.base64("O arquivo do certificado é obrigatório."),
  senha: z.string().trim().nonempty('A senha do certificado é obrigatória.'),
  certificadoInstalado: z.literal(false).optional(),
  numeroSerie: z.string().nullish(),
});

const ConfiguracaoCertificadoInstaladoSchema = z.object({
  certificadoInstalado: z.literal(true),
  numeroSerie: z.string().trim().nonempty('O número de série do certificado instalado é obrigatório.'),
  arquivoBase64: z.string().nullish(),
  senha: z.string().nullish(),
});

export const ConfiguracaoCertificadoSchema = z.union([
  ConfiguracaoCertificadoArquivoSchema,
  ConfiguracaoCertificadoInstaladoSchema,
]);

export type ConfiguracaoCertificado = z.infer<typeof ConfiguracaoCertificadoSchema>;
