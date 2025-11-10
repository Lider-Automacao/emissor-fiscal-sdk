import { z } from 'zod';

const ImpostoSeletivoSchema = z.object({
  cst: z.string()
    .min(1, 'O CST é obrigatório.'),

  classificacao: z.string()
    .min(1, 'A classificação é obrigatória.'),

  baseCalculo: z.number()
    .min(0, 'A base de cálculo deve ser maior ou igual a zero.')
    .nullable()
    .optional(),

  aliquota: z.number()
    .min(0, 'A alíquota deve ser maior ou igual a zero.')
    .nullable()
    .optional(),

  aliquotaEspecifica: z.number()
    .min(0, 'A alíquota específica deve ser maior ou igual a zero.')
    .nullable()
    .optional(),

  quantidade: z.number()
    .min(0, 'A quantidade deve ser maior ou igual a zero.')
    .nullable()
    .optional(),

  valor: z.number()
    .min(0, 'O valor do imposto seletivo deve ser maior ou igual a zero.')
    .nullable()
    .optional(),

  unidade: z.string()
    .min(1, 'A unidade não pode ser vazia se informada.')
    .nullable()
    .optional(),
});

type ImpostoSeletivo = z.infer<typeof ImpostoSeletivoSchema>;

export { ImpostoSeletivo, ImpostoSeletivoSchema };
