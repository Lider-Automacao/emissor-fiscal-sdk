import { describe, expect, it, vi } from 'vitest';
import type { EmissorFiscalApi } from '../../../src/api/emissor-fiscal-api.service';
import type { EnvioImpressao } from '../../../src/dtos';
import { ImprimirNfce } from '../../../src/use-cases/nfce/imprimir-nfce';
import { ImprimirNfe } from '../../../src/use-cases/nfe/imprimir-nfe';
import { EmissorFiscalError } from '../../../src/utils/errors/emissor-fiscal.error';

const pdf = Buffer.from('%PDF-1.7 conteudo', 'binary');

const request: EnvioImpressao = {
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
  dados: { xml: '<nfeProc/>', status: 'A' },
};

const casos = [
  { nome: 'ImprimirNfe', rota: '/nfe/imprimir', Classe: ImprimirNfe },
  { nome: 'ImprimirNfce', rota: '/nfce/imprimir', Classe: ImprimirNfce },
];

describe.each(casos)('$nome', ({ rota, Classe }) => {
  it(`posta em ${rota} pedindo arraybuffer e devolve o PDF como Buffer`, async () => {
    const post = vi.fn().mockResolvedValue(pdf);
    const api = { post } as unknown as EmissorFiscalApi;

    const result = await new Classe(api).executa(request);

    expect(post).toHaveBeenCalledWith(rota, expect.objectContaining({
      dados: expect.objectContaining({ xml: '<nfeProc/>', status: 'A' }),
    }), { responseType: 'arraybuffer' });
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.equals(pdf)).toBe(true);
  });

  it('preserva os bytes do PDF sem acrescentar conteúdo (EF-81)', async () => {
    const bytes = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x00, 0xff, 0x80]);
    const post = vi.fn().mockResolvedValue(bytes);
    const api = { post } as unknown as EmissorFiscalApi;

    const result = await new Classe(api).executa(request);

    expect(result.length).toBe(bytes.length);
    expect([...result]).toEqual([...bytes]);
  });

  it('rejeita sem chamar a API quando o status é desconhecido', async () => {
    const post = vi.fn();
    const api = { post } as unknown as EmissorFiscalApi;

    await expect(
      new Classe(api).executa({ ...request, dados: { xml: '<x/>', status: 'Z' as any } }),
    ).rejects.toBeInstanceOf(EmissorFiscalError);
    expect(post).not.toHaveBeenCalled();
  });

  it('rejeita sem chamar a API quando falta o xml', async () => {
    const post = vi.fn();
    const api = { post } as unknown as EmissorFiscalApi;

    await expect(
      new Classe(api).executa({ ...request, dados: { status: 'A' } as any }),
    ).rejects.toBeInstanceOf(EmissorFiscalError);
    expect(post).not.toHaveBeenCalled();
  });

  it('propaga o erro da API', async () => {
    const erro = new EmissorFiscalError('falha de rede');
    const api = { post: vi.fn().mockRejectedValue(erro) } as unknown as EmissorFiscalApi;

    await expect(new Classe(api).executa(request)).rejects.toBe(erro);
  });
});
