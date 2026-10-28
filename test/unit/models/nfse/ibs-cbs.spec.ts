import { describe, expect, it } from 'vitest';
import { NfseIbsCbsSchema } from '../../../../src/models/nfse/ibs-cbs';

const ibsCbsBase = {
  cst: '000',
  classificacaoTributaria: '000001',
};

describe('NfseIbsCbsSchema.codigoIndicadorOperacao', () => {
  it('aceita o código de 6 dígitos do Anexo VII', () => {
    const result = NfseIbsCbsSchema.parse({ ...ibsCbsBase, codigoIndicadorOperacao: '100301' });
    expect(result.codigoIndicadorOperacao).toBe('100301');
  });

  it('é opcional - prefeituras fora do padrão nacional não usam', () => {
    const result = NfseIbsCbsSchema.safeParse(ibsCbsBase);
    expect(result.success).toBe(true);
  });

  it('aceita null', () => {
    const result = NfseIbsCbsSchema.safeParse({ ...ibsCbsBase, codigoIndicadorOperacao: null });
    expect(result.success).toBe(true);
  });

  it('rejeita código fora do formato de 6 dígitos', () => {
    const result = NfseIbsCbsSchema.safeParse({ ...ibsCbsBase, codigoIndicadorOperacao: '10030' });
    expect(result.success).toBe(false);
  });
});
