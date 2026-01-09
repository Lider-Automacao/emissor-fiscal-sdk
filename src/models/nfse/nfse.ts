import { z } from 'zod';
import { DestinatarioSchema, EmitenteSchema } from '../auxiliares';
import { OrgaoGeradorSchema } from './orgao-gerador';
import { RpsSchema } from './rps';
import { ServicoSchema } from './servico';


export const NFSeSchema = z.object({
  orgaoGerador: OrgaoGeradorSchema,
  prestador: EmitenteSchema,
  intermediario: DestinatarioSchema.nullable().optional(),
  tomador: DestinatarioSchema,
  rps: RpsSchema,
  servico: ServicoSchema,
});


export type NFSe = z.infer<typeof NFSeSchema>;
