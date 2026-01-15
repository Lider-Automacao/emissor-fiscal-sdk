import { z } from 'zod';
import { DestinatarioSchema, EmitenteSchema } from '../auxiliares';
import { OrgaoGeradorSchema } from './orgao-gerador';
import { RpsSchema } from './rps';
import { ServicoSchema } from './servico';


const DestinatarioNFSeSchema = DestinatarioSchema.safeExtend({
  nome: z.string()
    .min(2, 'O nome do destinatário deve ter pelo menos 2 caracteres.')
    .max(150, 'O nome do destinatário não pode exceder 150 caracteres.'),
});


export const NFSeSchema = z.object({
  orgaoGerador: OrgaoGeradorSchema,
  prestador: EmitenteSchema,
  intermediario: DestinatarioNFSeSchema.nullable().optional(),
  tomador: DestinatarioNFSeSchema,
  rps: RpsSchema,
  servico: ServicoSchema,
});


export type NFSe = z.infer<typeof NFSeSchema>;
