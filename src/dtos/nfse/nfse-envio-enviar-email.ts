import { z } from 'zod';
import { ConfiguracoesSchema } from '../../models';

const DadosSchema = z.object({
  email: z.email("Formato de email inválido.").nonempty("O endereço de email é obrigatório."),
  xml: z.string().nonempty("O XML da NFSe é obrigatório para o envio."),
});


export const NfseEnviarEmailSchema = z.object({
  dados: DadosSchema,
  configuracoes: ConfiguracoesSchema,
});

export type NfseEnvioEnviarEmail = z.infer<typeof NfseEnviarEmailSchema>;