import { z } from 'zod';
import { CodigoIbgeMunicipioSchema } from '../auxiliares/codigo-ibge-municipio';
import { UFSchema } from '../auxiliares/ufs';

export const OrgaoGeradorSchema = z.object({
  codigoMunicipio: CodigoIbgeMunicipioSchema,
  uf: UFSchema,
});


export type OrgaoGerador = z.infer<typeof OrgaoGeradorSchema>;