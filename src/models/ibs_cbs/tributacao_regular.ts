import { z } from 'zod';

const TributacaoRegularSchema = z.object({
  cst: z.string().min(1),
  classificacao: z.string().min(1),
  aliquotaUF: z.number().min(0),
  valorUF: z.number().min(0).default(0),
  aliquotaMunicipio: z.number().min(0),
  valorMunicipio: z.number().min(0).default(0),
  aliquota: z.number().min(0),
  valor: z.number().min(0).default(0),
});

type TributacaoRegular = z.infer<typeof TributacaoRegularSchema>;

export { TributacaoRegular, TributacaoRegularSchema };

