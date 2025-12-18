import { z } from 'zod';
import { DestinatarioSchema, EmitenteSchema } from '../auxiliares';
import { NFSeIbsCbsSchema } from './ibs-cbs';
import { OrgaoGeradorSchema } from './orgao-gerador';
import { RpsSchema } from './rps';
import { ServicoSchema } from './servico';


export const NFSeSchema = z.object({
  prestador: EmitenteSchema,
  tomador: DestinatarioSchema,
  orgaoGerador: OrgaoGeradorSchema,
  rps: RpsSchema,
  servico: ServicoSchema,
  intermediario: DestinatarioSchema.nullable().optional(),
  ibsCbs: NFSeIbsCbsSchema.nullable().optional(),
});


export type NFSe = z.infer<typeof NFSeSchema>;