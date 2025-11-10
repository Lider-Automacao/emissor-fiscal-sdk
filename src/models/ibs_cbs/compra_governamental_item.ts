import { z } from 'zod';

const CompraGovernamentalItemSchema = z.object({
  aliquotaUF: z.number()
    .min(0),
  valorUF: z.number()
    .min(0),
  aliquotaMunicipio: z.number()
    .min(0),
  valorMunicipio: z.number()
    .min(0),
  aliquotaCbs: z.number()
    .min(0),
  valorCbs: z.number()
    .min(0),
});

type CompraGovernamentalItem = z.infer<typeof CompraGovernamentalItemSchema>;

export { CompraGovernamentalItem, CompraGovernamentalItemSchema };
