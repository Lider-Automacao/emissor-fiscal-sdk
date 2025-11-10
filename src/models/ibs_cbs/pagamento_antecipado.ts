import { z } from 'zod';

const PagamentoAntecipadoSchema = z.object({
  chave: z.string()
    .regex(/^(\d{2})(\d{4})(\d{14})(55)(\d{3})(\d{9})(\d)(\d{8})(\d)$/),
});

type PagamentoAntecipado = z.infer<typeof PagamentoAntecipadoSchema>;

export { PagamentoAntecipado, PagamentoAntecipadoSchema };
