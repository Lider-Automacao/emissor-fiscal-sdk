import { z } from 'zod';
import { NumberMinZeroSchema } from '../../types';

// O Neon serializa o enum Delphi como o identifier literal (ADR 0001)
const TipoEnteGovernamentalSchema = z.enum([
  'tegUniao',
  'tegEstado',
  'tegDistritoFederal',
  'tegMunicipio',
  'tegConsorcioPublico',
  'tegComiteGestorIbs',
]);

const TipoOperacaoGovernamentalSchema = z.enum([
  'togFornecimentoComPagamentoPosterior',
  'togRecebimentoComFornecimentoRealizado',
  'togFornecimentoComPagamentoRealizado',
  'togRecebimentoComFornecimentoPosterior',
]);

const CompraGovernamentalSchema = z.object({
  tipoEnte: TipoEnteGovernamentalSchema,
  percentualReducao: NumberMinZeroSchema,
  tipoOperacao: TipoOperacaoGovernamentalSchema,
  documentosAnteriores: z.array(z.string().regex(/^\d{44}$/)).max(99).default([]),
}).describe('Grupo gCompraGov (BB) da NF-e; a NFC-e não aceita (rej. 1006)');

type CompraGovernamental = z.infer<typeof CompraGovernamentalSchema>;

export { CompraGovernamental, CompraGovernamentalSchema, TipoEnteGovernamentalSchema, TipoOperacaoGovernamentalSchema };
