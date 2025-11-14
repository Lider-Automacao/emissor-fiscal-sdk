import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';
import { CST_IBS_CBS_SCHEMA } from '../CSTSchema';

const ImpostoSeletivoSchema = z.object({
  cst: CST_IBS_CBS_SCHEMA,
  classificacao: z.string()
    .min(1),
  baseCalculo: NumberMinZeroSchema
    .nullable()
    .optional(),
  aliquota: NumberMinZeroSchema
    .nullable()
    .optional(),
  aliquotaEspecifica: NumberMinZeroSchema
    .nullable()
    .optional(),
  quantidade: NumberMinZeroSchema
    .nullable()
    .optional(),
  valor: NumberMinZeroSchema
    .nullable()
    .optional(),
  unidade: z.string()
    .min(1)
    .nullable()
    .optional(),
});

type ImpostoSeletivo = z.infer<typeof ImpostoSeletivoSchema>;

export { ImpostoSeletivo, ImpostoSeletivoSchema };

