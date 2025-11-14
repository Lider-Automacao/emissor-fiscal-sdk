import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';
import { MonofasicoDiferimento, MonofasicoDiferimentoSchema } from './monofasico_diferimento';
import { MonofasicoPadrao, MonofasicoPadraoSchema } from './monofasico_padrao';
import { MonofasicoRetencao, MonofasicoRetencaoSchema } from './monofasico_retencao';
import { MonofasicoRetidoAnteriormente, MonofasicoRetidoAnteriormenteSchema } from './monofasico_retido_anteriormente';


const MonofasicoSchema = z.object({
  valorTotalIbs: NumberMinZeroSchema
    .nullable()
    .optional(),
  valorTotalCbs: NumberMinZeroSchema
    .nullable()
    .optional(),
  padrao: MonofasicoPadraoSchema
    .nullable()
    .optional(),

  retencao: MonofasicoRetencaoSchema
    .nullable()
    .optional(),

  retidoAnteriormente: MonofasicoRetidoAnteriormenteSchema
    .nullable()
    .optional(),

  diferimento: MonofasicoDiferimentoSchema
    .nullable()
    .optional(),
});

type Monofasico = z.infer<typeof MonofasicoSchema> & {
  padrao?: MonofasicoPadrao | null;
  retencao?: MonofasicoRetencao | null;
  retidoAnteriormente?: MonofasicoRetidoAnteriormente | null;
  diferimento?: MonofasicoDiferimento | null;
};

export { Monofasico, MonofasicoSchema };

