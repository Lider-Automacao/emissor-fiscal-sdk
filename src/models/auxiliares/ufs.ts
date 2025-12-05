import { z } from 'zod';

export const BRASIL_UFS = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN',
  'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
] as const;

export const UFSchema = z.enum(BRASIL_UFS, "Sigla de UF inválida. Deve ser um dos códigos oficiais (e.g., 'SP', 'RJ', 'MG').");

export type UF = z.infer<typeof UFSchema>;