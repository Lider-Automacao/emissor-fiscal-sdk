import { describe, expect, it } from 'vitest';
import { EnvioCartaCorrecaoSchema } from '../../../../src/dtos/envio/envio-carta-correcao';

// Testamos `dados` isolado (via .shape) em vez de montar um `configuracoes`
// completo/válido - a regra de negócio relevante aqui é a validação de
// correcao/sequenciaEvento, que espelha TValidaCartaCorrecaoUseCase.Valida.
const dadosSchema = EnvioCartaCorrecaoSchema.shape.dados;

describe('EnvioCartaCorrecaoSchema.dados', () => {
  const validDados = {
    chaveAcesso: '35260600000000000000550010000000011000000010',
    correcao: 'Correção do endereço de entrega informado na nota.',
    sequenciaEvento: 1,
  };

  it('aceita dados válidos', () => {
    expect(dadosSchema.safeParse(validDados).success).toBe(true);
  });

  it('rejeita correcao com menos de 15 caracteres', () => {
    const result = dadosSchema.safeParse({ ...validDados, correcao: 'muito curto' });
    expect(result.success).toBe(false);
  });

  it('rejeita correcao com mais de 1000 caracteres', () => {
    const result = dadosSchema.safeParse({ ...validDados, correcao: 'a'.repeat(1001) });
    expect(result.success).toBe(false);
  });

  it('aceita correcao no limite (15 e 1000 caracteres)', () => {
    expect(dadosSchema.safeParse({ ...validDados, correcao: 'a'.repeat(15) }).success).toBe(true);
    expect(dadosSchema.safeParse({ ...validDados, correcao: 'a'.repeat(1000) }).success).toBe(true);
  });

  it('rejeita sequenciaEvento fora do intervalo 1-20', () => {
    expect(dadosSchema.safeParse({ ...validDados, sequenciaEvento: 0 }).success).toBe(false);
    expect(dadosSchema.safeParse({ ...validDados, sequenciaEvento: 21 }).success).toBe(false);
  });

  it('aceita sequenciaEvento no limite (1 e 20)', () => {
    expect(dadosSchema.safeParse({ ...validDados, sequenciaEvento: 1 }).success).toBe(true);
    expect(dadosSchema.safeParse({ ...validDados, sequenciaEvento: 20 }).success).toBe(true);
  });
});
