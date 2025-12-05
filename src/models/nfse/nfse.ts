import { z } from 'zod';
import { OrgaoGeradorSchema, RpsSchema, ServicoSchema } from '.';
import { DestinatarioSchema, EmitenteSchema } from '../auxiliares';
import { NFSeIbsCbsSchema } from './ibs-cbs';


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