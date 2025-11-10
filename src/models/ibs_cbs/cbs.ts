import { z } from 'zod';
import { Devolucao, DevolucaoSchema } from './devolucao';
import { Diferimento, DiferimentoSchema } from './diferimento';
import { Reducao, ReducaoSchema } from './reducao';


const CbsSchema = z.object({
  aliquota: z.number()
    .min(0),
  valor: z.number()
    .min(0),
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
