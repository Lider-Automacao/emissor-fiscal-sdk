import { describe, expect, it, vi } from 'vitest';
import type { EmissorFiscalApi } from '../../../../src/api/emissor-fiscal-api.service';
import type { EnvioCartaCorrecao } from '../../../../src/dtos';
import { GerarCartaCorrecaoNfe } from '../../../../src/use-cases/nfe/gerar-carta-correcao-nfe';
import { EmissorFiscalError } from '../../../../src/utils/errors/emissor-fiscal.error';

const validRequest: EnvioCartaCorrecao = {
  configuracoes: {
    certificado: { arquivoBase64: 'dGVzdA==', senha: 'senha123' },
    configuracoesEnvio: { modelo: 55 },
    emitente: {
      documento: '01103144000136',
      razao: 'Empresa Teste LTDA',
      inscicaoEstadual: '123456789',
      regimeTributario: 1,
    },
  } as any,
  dados: {
    chaveAcesso: '35260600000000000000550010000000011000000010',
    correcao: 'Correção do endereço de entrega informado na nota.',
    sequenciaEvento: 1,
  },
};

describe('GerarCartaCorrecaoNfe', () => {
  it('posta em /nfe/carta-correcao e retorna a resposta parseada', async () => {
    const post = vi.fn().mockResolvedValue({
      data: '2026-08-31T10:00:00',
      evento: '<procEventoNFe>...</procEventoNFe>',
      protocolo: '135260000000000',
      sequenciaEvento: 1,
      status: 'C',
    });
    const api = { post } as unknown as EmissorFiscalApi;

    const result = await new GerarCartaCorrecaoNfe(api).executa(validRequest);

    expect(post).toHaveBeenCalledWith('/nfe/carta-correcao', expect.objectContaining({
      dados: expect.objectContaining({ chaveAcesso: validRequest.dados.chaveAcesso }),
    }));
    expect(result.status).toBe('C');
    expect(result.protocolo).toBe('135260000000000');
  });

  it('rejeita sem chamar a API quando correcao tem menos de 15 caracteres', async () => {
    const post = vi.fn();
    const api = { post } as unknown as EmissorFiscalApi;

    await expect(
      new GerarCartaCorrecaoNfe(api).executa({
        ...validRequest,
        dados: { ...validRequest.dados, correcao: 'curto' },
      }),
    ).rejects.toThrow(EmissorFiscalError);

    expect(post).not.toHaveBeenCalled();
  });

  it('rejeita sem chamar a API quando sequenciaEvento está fora de 1-20', async () => {
    const post = vi.fn();
    const api = { post } as unknown as EmissorFiscalApi;

    await expect(
      new GerarCartaCorrecaoNfe(api).executa({
        ...validRequest,
        dados: { ...validRequest.dados, sequenciaEvento: 21 },
      }),
    ).rejects.toThrow(EmissorFiscalError);

    expect(post).not.toHaveBeenCalled();
  });
});
