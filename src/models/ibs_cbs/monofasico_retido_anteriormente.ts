import { z } from 'zod';

const MonofasicoRetidoAnteriormenteSchema = z.object({
  quantidadeRetida: z.number()
    .min(0)
    .nullable()
    .optional(),

  aliquotaAdRemIbsRetida: z.number()
    .min(0)
    .nullable()
    .optional(),

  valorIbsRetido: z.number()
    .min(0)
    .nullable()
    .optional(),

  aliquotaAdRemCbsRetida: z.number()
    .min(0)
    .nullable()
    .optional(),

  valorCbsRetida: z.number()
    .min(0)
    .nullable()
    .optional(),
});

type MonofasicoRetidoAnteriormente = z.infer<typeof MonofasicoRetidoAnteriormenteSchema>;

export { MonofasicoRetidoAnteriormente, MonofasicoRetidoAnteriormenteSchema };

