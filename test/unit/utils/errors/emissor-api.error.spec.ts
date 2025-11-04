import { describe, expect, it } from 'vitest';
import { EmissorApiError } from '../../../../src/utils/errors/emissor-api.error';

describe('EmissorApiError', () => {
  it('should create an instance with message, originalError, and details', () => {
    const err = new EmissorApiError({
      "type": "Error",
      "code": 409,
      "error": "Erro na validação de entrada",
      "detail": "[{\"field\":\"Config\",\"error\":[{\"field\":\"idCSC\",\"error\":\"Deve ser maior ou igual que 1\"},{\"field\":\"csc\",\"error\":\"Deve ser maior ou igual que 1\"}]}]"
    });

    expect(err.message).toBe('Erro na validação de entrada');
    expect(err.description).toBe(`Erros de Validação Encontrados:
- Config.idCSC: Deve ser maior ou igual que 1
- Config.csc: Deve ser maior ou igual que 1`);

  });

  // it('should create an instance with message, originalError, and details', () => {
  //   const err = new EmissorApiError({
  //     "error": "0",
  //     "unit": "Erro na emissão NFCe",
  //     "detail": "Falha na validação dos dados da nota: 3146"
  //   });

  //   expect(err.message).toBe('Erro na validação de entrada');

  // });
});