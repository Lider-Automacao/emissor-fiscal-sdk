import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';
import { CST_IBS_CBS_SCHEMA } from '../CSTSchema';

const TributacaoRegularSchema = z.object({
  cst: CST_IBS_CBS_SCHEMA,
  classificacao: z.string().min(1),
  aliquotaUF: NumberMinZeroSchema,
  valorUF: NumberMinZeroSchema.nullish().default(0),
  aliquotaMunicipio: NumberMinZeroSchema,
  valorMunicipio: NumberMinZeroSchema.nullish().default(0),
  aliquota: NumberMinZeroSchema,
  valor: NumberMinZeroSchema.nullish().default(0),
});

type TributacaoRegular = z.infer<typeof TributacaoRegularSchema>;

export { TributacaoRegular, TributacaoRegularSchema };

