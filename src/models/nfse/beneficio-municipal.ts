import { z } from 'zod';
import { PercentualSchema } from '../../types';

export const BeneficioMunicipalSchema = z.object({
  tipo: z.union([
    z.literal(0).describe("Isenção"),
    z.literal(1).describe("Redução de Base de Cálculo - Percentual"),
    z.literal(2).describe("Redução de Base de Cálculo - Valor"),
    z.literal(3).describe("Aliquota de ISS"),
  ]),
  codigoBeneficio: z.string()
    .min(1, "O código do benefício é obrigatório")
    .max(20, "O código do benefício deve ter no máximo 20 caracteres"),
  aliquota: PercentualSchema,
});


export type BeneficioMunicipal = z.infer<typeof BeneficioMunicipalSchema>;