import z from 'zod';
import { NumberSchema } from '../../types/number-type';

export const IpiSchema = z.object({
  cst: z.string().min(1),
  baseCalculo: NumberSchema.nullish(),
  aliquota: NumberSchema.nullish(),
  valor: NumberSchema.nullish(),
  quantidadeUnidade: NumberSchema.nullish(),
  valorUnidade: NumberSchema.nullish(),
}).describe('IPI do item. A NFC-e não aceita o grupo');

export type Ipi = z.infer<typeof IpiSchema>;
