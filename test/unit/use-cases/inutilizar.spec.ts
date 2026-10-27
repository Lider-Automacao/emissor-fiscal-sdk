import { describe, expect, it, vi } from 'vitest';
import { EmissorFiscalApi } from '../../../src/api/emissor-fiscal-api.service';
import type { EnvioInutilizacao } from '../../../src/dtos';
import { InutilizarNfce } from '../../../src/use-cases/nfce/inutilizar-nfce';
import { InutilizarNfe } from '../../../src/use-cases/nfe/inutilizar-nfe';
import { EmissorFiscalError } from '../../../src/utils/errors/emissor-fiscal.error';

const validRequest: EnvioInutilizacao = {
  configuracoes: {
    certificado: { arquivoBase64: 'dGVzdA==', senha: 'senha123' },
    configuracoesEnvio: { modelo: 55 },
    emitente: {
      documento: '01103144000136',
      razao: 'Empresa Teste LTDA',
      inscicaoEstadual: '123456789',
      regimeTributario: 1,
    },
  },
  dados: {
    ano: 2026,
    serie: 1,
    numeroInicial: 10,
    numeroFinal: 10,
    motivo: 'Numeracao pulada por falha na emissao',
  },
};

const retornoEmissor = {
  dataRecibo: '2026-10-27T10:00:00',
  evento: '<procInutNFe>...</procInutNFe>',
  protocolo: '135260000000001',
  motivo: 'Inutilizacao de numero homologado',
  status: 'sdInutilizada',
  numero: 10,
  serie: 1,
};

const casos = [
  { nome: 'NFC-e', Classe: InutilizarNfce, rota: '/nfce/inutilizar' },
  { nome: 'NF-e', Classe: InutilizarNfe, rota: '/nfe/inutilizar' },
] as const;

describe.each(casos)('Inutilizar $nome', ({ Classe, rota }) => {
  const executa = (resposta: unknown) => {
    const api = new EmissorFiscalApi({ url: 'http://localhost', usuario: 'user', senha: 'pass' });
    const post = vi.spyOn(api, 'post').mockResolvedValue(resposta);
    return { post, promise: new Classe(api).executa(validRequest) };
  };

  it('aceita retorno do emissor com numero/serie numericos e status sdInutilizada (EF-83)', async () => {
    const { post, promise } = executa([retornoEmissor]);

    const result = await promise;

    expect(post.mock.calls[0][0]).toBe(rota);
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('I');
    expect(result[0].numero).toBe('10');
    expect(result[0].serie).toBe('1');
    expect(result[0].protocolo).toBe('135260000000001');
  });

  it('continua aceitando status no formato do SDK e numero/serie em texto', async () => {
    const { promise } = executa([{ ...retornoEmissor, status: 'I', numero: '10', serie: '1' }]);

    const [item] = await promise;

    expect(item.status).toBe('I');
    expect(item.numero).toBe('10');
    expect(item.serie).toBe('1');
  });

  it('aceita retorno sem evento', async () => {
    const { evento: _evento, ...semEvento } = retornoEmissor;
    const { promise } = executa([semEvento]);

    await expect(promise).resolves.toHaveLength(1);
  });

  it('lanca EmissorFiscalError (nao ZodError) quando status e desconhecido', async () => {
    const { promise } = executa([{ ...retornoEmissor, status: 'XYZ' }]);

    const erro = await promise.catch((e) => e);

    expect(erro).toBeInstanceOf(EmissorFiscalError);
    expect(erro.name).toBe('EmissorFiscalError');
    expect(erro.message).toMatch(/homologada na SEFAZ/);
  });

  it('lanca EmissorFiscalError quando campo obrigatorio vem ausente ou nulo', async () => {
    const semProtocolo = executa([{ ...retornoEmissor, protocolo: undefined }]);
    const numeroNulo = executa([{ ...retornoEmissor, numero: null }]);

    await expect(semProtocolo.promise).rejects.toBeInstanceOf(EmissorFiscalError);
    await expect(numeroNulo.promise).rejects.toBeInstanceOf(EmissorFiscalError);
  });
});
