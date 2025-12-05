import { z } from 'zod';

export const CodigoIbgeMunicipioSchema = z.coerce.string()
  .length(7, "O código do município IBGE deve ter exatamente 7 dígitos.")
  .regex(/^\d+$/, "O código do município IBGE deve conter apenas números.")
  .transform(val => Number.parseInt(val));

export type CodigoIbgeMunicipio = z.infer<typeof CodigoIbgeMunicipioSchema>;