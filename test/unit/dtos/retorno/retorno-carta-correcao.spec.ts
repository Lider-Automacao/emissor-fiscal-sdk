import { describe, expect, it } from 'vitest';
import { RetornoCartaCorrecaoSchema } from '../../../../src/dtos/retorno/retorno-carta-correcao';

describe('RetornoCartaCorrecaoSchema', () => {
  const validRetorno = {
    data: '2026-08-31T10:00:00',
    evento: '<procEventoNFe>...</procEventoNFe>',
    protocolo: '135260000000000',
    sequenciaEvento: 1,
    status: 'C',
  };

  it('aceita o retorno de sucesso (status C, mesma convenção de RetornoCancelamento)', () => {
    const result = RetornoCartaCorrecaoSchema.parse(validRetorno);
    expect(result.status).toBe('C');
  });

  it('rejeita status fora de A/C/D/I/O', () => {
    const result = RetornoCartaCorrecaoSchema.safeParse({ ...validRetorno, status: 'X' });
    expect(result.success).toBe(false);
  });

  it('captura data ausente/inválida em vez de falhar (nullish + catch(undefined))', () => {
    const result = RetornoCartaCorrecaoSchema.parse({ ...validRetorno, data: undefined });
    expect(result.data).toBeUndefined();
  });
});
