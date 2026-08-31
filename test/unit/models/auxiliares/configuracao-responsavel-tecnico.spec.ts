import { describe, expect, it } from 'vitest';
import { ConfiguracaoResponsavelTecnicoSchema } from '../../../../src/models/auxiliares/configuracao-responsavel-tecnico';
import { ConfiguracoesSchema } from '../../../../src/models/auxiliares/configuracoes';

describe('ConfiguracaoResponsavelTecnicoSchema', () => {
  it('aceita todos os campos preenchidos', () => {
    const result = ConfiguracaoResponsavelTecnicoSchema.parse({
      cnpj: '12345678000199',
      contato: 'Fulano de Tal',
      email: 'contato@empresa.com.br',
      fone: '11999999999',
      idCsrt: 1,
      hashCsrt: 'hash-csrt',
    });
    expect(result.cnpj).toBe('12345678000199');
  });

  it('todos os campos são opcionais - objeto vazio é válido', () => {
    const result = ConfiguracaoResponsavelTecnicoSchema.safeParse({});
    expect(result.success).toBe(true);
  });

  it('rejeita email com formato inválido', () => {
    const result = ConfiguracaoResponsavelTecnicoSchema.safeParse({ email: 'nao-e-email' });
    expect(result.success).toBe(false);
  });
});

describe('ConfiguracoesSchema.responsavelTecnico', () => {
  it('é opcional e default null quando ConfiguracoesSchema não recebe o campo', () => {
    // só testamos o campo isolado, sem montar um Configuracoes completo
    const shape = ConfiguracoesSchema.shape.responsavelTecnico;
    expect(shape.parse(undefined)).toBeNull();
    expect(shape.parse(null)).toBeNull();
  });

  it('valida o objeto aninhado quando informado', () => {
    const shape = ConfiguracoesSchema.shape.responsavelTecnico;
    const result = shape.parse({ cnpj: '12345678000199' });
    expect(result?.cnpj).toBe('12345678000199');
  });
});
