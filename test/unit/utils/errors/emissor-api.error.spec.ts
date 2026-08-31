import { describe, expect, it } from 'vitest';
import { EmissorApiError } from '../../../../src/utils/errors/emissor-api.error';

describe('EmissorApiError', () => {
  it('expõe cada campo cru individualmente (shape do EHorseException/TCustomError)', () => {
    const err = new EmissorApiError({
      type: 'Error',
      title: 'Gerar Carta de Correção',
      code: 422,
      error: 'Texto de correção inválido',
      hint: 'ajuste o texto',
      unit: 'TNFeMetodosService',
      detail: 'O texto da correção deve ter no mínimo 15 caracteres.',
    });

    expect(err.error).toBe('Texto de correção inválido');
    expect(err.title).toBe('Gerar Carta de Correção');
    expect(err.unit).toBe('TNFeMetodosService');
    expect(err.hint).toBe('ajuste o texto');
    expect(err.code).toBe(422);
    expect(err.type).toBe('Error');
    expect(err.detail).toBe('O texto da correção deve ter no mínimo 15 caracteres.');
  });

  describe('message', () => {
    it('prioriza error sobre unit/title/message quando error vem populado (garantia do ErrorClassifier)', () => {
      const err = new EmissorApiError({
        error: 'Texto de correção inválido',
        title: 'Gerar Carta de Correção',
        unit: 'TNFeMetodosService',
        message: 'não deveria aparecer',
      });
      expect(err.message).toBe('Texto de correção inválido');
    });

    it('cai para title quando error vem vazio/ausente', () => {
      const err = new EmissorApiError({ title: 'Erro na emissão NFCe', unit: 'TNFCeMetodosService' });
      expect(err.message).toBe('Erro na emissão NFCe');
    });

    it('cai para message (payload genérico fora do shape Horse, ex.: erro cru do Axios)', () => {
      const err = new EmissorApiError({ statusCode: 404, message: 'Not found' });
      expect(err.message).toBe('Not found');
    });

    it('unit é last-resort - só aparece quando nada mais existe', () => {
      const err = new EmissorApiError({ unit: 'TNFeMetodosService' });
      expect(err.message).toBe('TNFeMetodosService');
    });

    it('retorna null quando o payload não tem nenhum campo reconhecido', () => {
      const err = new EmissorApiError({ somethingElse: 'x' });
      expect(err.message).toBeNull();
    });
  });

  describe('description', () => {
    it('retorna detail como texto simples quando não é um array de erros de validação', () => {
      const err = new EmissorApiError({ detail: 'Falha na validação dos dados da nota: 3146' });
      expect(err.description).toBe('Falha na validação dos dados da nota: 3146');
    });

    it('retorna undefined quando detail não é string', () => {
      const err = new EmissorApiError({ detail: 123 });
      expect(err.description).toBeUndefined();
    });

    it('formata array de erros de validação (field + error)', () => {
      const err = new EmissorApiError({
        detail: JSON.stringify([{ field: 'dados.correcao', error: 'muito curto' }]),
      });
      expect(err.description).toContain('dados.correcao: muito curto');
    });
  });
});
