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
  const executa = (resposta: unknown, request: EnvioInutilizacao = validRequest) => {
    const api = new EmissorFiscalApi({ url: 'http://localhost', usuario: 'user', senha: 'pass' });
    const post = vi.spyOn(api, 'post').mockResolvedValue(resposta);
    return { post, promise: new Classe(api).executa(request) };
  };

  const comDados = (dados: Partial<EnvioInutilizacao['dados']>): EnvioInutilizacao => ({
    ...validRequest,
    dados: { ...validRequest.dados, ...dados },
  });

  it.each([10, 50])('aceita retorno de faixa com %i numeros (EF-94, EF-102)', async (quantidade) => {
    const retorno = Array.from({ length: quantidade }, (_, i) => ({
      ...retornoEmissor,
      numero: 100 + i,
      protocolo: String(135260000000000 + i),
    }));

    const { post, promise } = executa(retorno, comDados({ numeroInicial: 100, numeroFinal: 99 + quantidade }));

    const result = await promise;

    expect(result).toHaveLength(quantidade);
    expect(result[0].numero).toBe('100');
    expect(result[quantidade - 1].numero).toBe(String(99 + quantidade));
    expect(post.mock.calls[0][1]).toMatchObject({ dados: { numeroInicial: 100, numeroFinal: 99 + quantidade } });
  });

  // Manual de Orientação do Contribuinte: xJust de 15 a 255 caracteres, sem espaços no início/fim
  it.each([
    ['15 caracteres com acentos', 'Digitação errada', 'Digitação errada'],
    ['espacos nas pontas', '  Falha na emissao  ', 'Falha na emissao'],
    ['255 caracteres', 'a'.repeat(255), 'a'.repeat(255)],
    ['255 caracteres com espacos nas pontas', ` ${'a'.repeat(255)} `, 'a'.repeat(255)],
  ])('envia a justificativa sem espacos nas pontas: %s (EF-95)', async (_nome, motivo, esperado) => {
    const { post, promise } = executa([retornoEmissor], comDados({ motivo }));

    await promise;

    expect(post.mock.calls[0][1]).toMatchObject({ dados: { motivo: esperado } });
  });

  it.each([
    ['14 caracteres', 'a'.repeat(14)],
    ['14 caracteres com espacos nas pontas', `  ${'a'.repeat(14)}  `],
    ['256 caracteres (EF-96)', 'a'.repeat(256)],
  ])('rejeita sem chamar a API justificativa fora de 15-255: %s', async (_nome, motivo) => {
    const { post, promise } = executa([retornoEmissor], comDados({ motivo }));

    await expect(promise).rejects.toBeInstanceOf(EmissorFiscalError);
    expect(post).not.toHaveBeenCalled();
  });

  it.each([999, 909, 990])('aceita serie %i e devolve a serie como texto (EF-98)', async (serie) => {
    const { post, promise } = executa([{ ...retornoEmissor, serie }], comDados({ serie }));

    const [item] = await promise;

    expect(item.serie).toBe(String(serie));
    expect(post.mock.calls[0][1]).toMatchObject({ dados: { serie } });
  });

  it('aceita faixa do ano anterior e envia o ano informado (EF-97)', async () => {
    const { post, promise } = executa([retornoEmissor], comDados({ ano: 2025 }));

    await promise;

    expect(post.mock.calls[0][1]).toMatchObject({ dados: { ano: 2025 } });
  });

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

  it('aceita retorno com varias notas inutilizadas e preserva a ordem (EF-85)', async () => {
    const { promise } = executa([
      { ...retornoEmissor, numero: 10, protocolo: '135260000000001' },
      { ...retornoEmissor, numero: 11, protocolo: '135260000000002' },
      { ...retornoEmissor, numero: 12, protocolo: '135260000000003' },
    ]);

    const result = await promise;

    expect(result.map((r) => r.numero)).toEqual(['10', '11', '12']);
    expect(result.map((r) => r.protocolo)).toEqual(['135260000000001', '135260000000002', '135260000000003']);
    expect(result.every((r) => r.status === 'I')).toBe(true);
  });

  it('rejeita o retorno inteiro quando uma das notas vem invalida', async () => {
    const { promise } = executa([retornoEmissor, { ...retornoEmissor, numero: 11, status: 'XYZ' }]);

    await expect(promise).rejects.toBeInstanceOf(EmissorFiscalError);
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
