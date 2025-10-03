import { isEmpty } from '@raicamposs/toolkit';
import z from 'zod';
import { EnderecoSchema } from './endereco';
import { IndicadorInscricaoEstadual } from './indicador-inscricao-estadual';



export const DestinatarioSchema = z.object({
  documento: z.string().min(1, 'O documento (CNPJ/CPF) é obrigatório.'),
  nome: z.string()
    .min(2, 'O nome do destinatário deve ter pelo menos 2 caracteres.')
    .max(60, 'O nome do destinatário não pode exceder 60 caracteres.'),
  indicadorInscricaoEstadual: z.enum(IndicadorInscricaoEstadual).nonoptional('O indicador de Inscrição Estadual é obrigatório.'),
  inscricaoEstadual: z.string()
    .min(1, 'A Inscrição Estadual deve ter pelo menos 1 caractere.')
    .max(15, 'A Inscrição Estadual não pode exceder 15 caracteres.')
    .nullable().optional(),
  codigoEstrangeiro: z.string()
    .min(5, 'O código estrangeiro deve ter pelo menos 5 caracteres.')
    .max(20, 'O código estrangeiro não pode exceder 20 caracteres.')
    .nullable().optional(),
  inscricaoMunicipal: z.string()
    .min(1, 'A Inscrição Municipal deve ter pelo menos 1 caractere.')
    .max(15, 'A Inscrição Municipal não pode exceder 15 caracteres.')
    .nullable().optional(),
  inscricaoSuframa: z.string()
    .min(8, 'A Inscrição SUFRAMA deve ter 8 ou 9 caracteres.')
    .max(9, 'A Inscrição SUFRAMA deve ter no máximo 9 caracteres.')
    .nullable().optional(),
  endereco: EnderecoSchema.nullable().optional(),
})
  .describe('Schema para a entidade TDestinatarioNFCe (Dados do Destinatário)')
  .superRefine((data, ctx) => {
    const ie = data.inscricaoEstadual;
    const indIE = data.indicadorInscricaoEstadual;

    switch (indIE) {
      case IndicadorInscricaoEstadual.ContribuinteICMS: // Contribuinte ICMS
        if (isEmpty(ie)) {
          ctx.addIssue({
            code: 'invalid_value',
            message: 'Indicador de IE igual a 1 exige que a Inscrição Estadual seja informada.',
            path: ['inscricaoEstadual'],
            values: [ie]
          });
        }
        break;
      case IndicadorInscricaoEstadual.ContribuinteIsento:
      case IndicadorInscricaoEstadual.NaoContribuinte:
        if (!isEmpty(ie)) {
          ctx.addIssue({
            code: 'invalid_value',
            message: `Indicador de IE igual a ${indIE} não deve conter Inscrição Estadual.`,
            path: ['inscricaoEstadual'],
            values: [ie]
          });
        }
        break;
    }
  });


export type Destinatario = z.infer<typeof DestinatarioSchema>
