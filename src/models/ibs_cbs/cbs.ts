import { z } from 'zod';
import { NumberMinZeroDefaultZeroSchema } from '../../types';
import { Devolucao, DevolucaoSchema } from './devolucao';
import { Diferimento, DiferimentoSchema } from './diferimento';
import { Reducao, ReducaoSchema } from './reducao';


const CbsSchema = z.object({
  aliquota: NumberMinZeroDefaultZeroSchema,
  valor: NumberMinZeroDefaultZeroSchema,
  reducao: ReducaoSchema.nullable().optional(),
  devolucao: DevolucaoSchema.nullable().optional(),
  diferimento: DiferimentoSchema.nullable().optional(),
});

type Cbs = z.infer<typeof CbsSchema> & {
  reducao?: Reducao | null;
  devolucao?: Devolucao | null;
  diferimento?: Diferimento | null;
};

export { Cbs, CbsSchema };

