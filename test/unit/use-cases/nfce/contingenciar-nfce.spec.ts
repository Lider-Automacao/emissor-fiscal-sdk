import { describe, expect, it, vi } from 'vitest';
import { EmissorFiscalApi } from '../../../../src/api/emissor-fiscal-api.service';
import type { EnvioNfceApi } from '../../../../src/dtos';
import { ContingenciarNfce } from '../../../../src/use-cases/nfce/contingenciar-nfce';
import { NfceService } from '../../../../src/services/nfce.service';
import { EmissorFiscalError } from '../../../../src/utils/errors/emissor-fiscal.error';

const chaveAcesso = '35261012345678000195650010000000011000000019';
const dataContingencia = '2026-10-29T10:00:00-03:00';

const emitente = {
  documento: '01103144000136',
  razao: 'Empresa Teste LTDA',
  inscicaoEstadual: '123456789',
  regimeTributario: 1,
};

const item = {
  controleItem: 1,
  codigo: '1',
  descricao: 'Produto',
  cfop: '5102',
  valorBruto: 10,
  tributos: {
    icms: { cst: '102', origem: '0' },
    pis: {},
    cofins: {},
    valorAproximadoTributos: 0,
  },
  compoeTotal: true,
  valorFrete: 0,
  valorSeguro: 0,
  valorDesconto: 0,
  valorOutros: 0,
  unidade: { comercial: 'UN', tributavel: 'UN' },
  quantidade: { comercial: 1, tributavel: 1 },
  valorUnitario: { comercial: 10, tributavel: 10 },
};

const requestContingencia: EnvioNfceApi = {
  configuracoes: {
    certificado: { arquivoBase64: 'dGVzdA==', senha: 'senha123' },
    configuracoesEnvio: { modelo: 65, ambiente: 2, tipoEmissao: 9, idCSC: '000001', csc: 'CSC-FICTICIO-DE-TESTE' },
    emitente,
  },
  nfce: {
    ambiente: 2,
    modelo: 65,
    numero: 1,
    serie: 1,
    finalidade: 1,
    presencial: 1,
    tipoImpressao: 4,
    tipoEmissao: 9,
    dataEmissao: dataContingencia,
    dataSaidaEntrada: dataContingencia,
    dataContingencia,
    motivoContingencia: 'SEFAZ fora do ar, emissao em contingencia',
    saida: true,
    versaoProcesso: '1.0',
    identificacaoDestino: 1,
    codigoMunicipioFatoGerador: 3550308,
    emitente,
    itens: [item],
    total: {},
    pagamento: { troco: 0, itens: [{ meio: '01', valor: 10, aVista: true }] },
  },
} as EnvioNfceApi;

const retornoContingencia = {
  data: dataContingencia,
  dataContigencia: dataContingencia,
  protocolo: 'CONTIGENCIA',
  chaveAcesso,
  status: 'O',
  statusDescricao: 'contingencia',
  codigoStatus: 0,
  xml: '<NFe><infNFe/></NFe>',
  numero: 1,
  serie: 1,
};

function criaApi(resposta: unknown) {
  const api = new EmissorFiscalApi({ url: 'http://localhost', usuario: 'user', senha: 'pass' });
  const post = vi.spyOn(api, 'post').mockResolvedValue(resposta);
  return { api, post };
}

describe('ContingenciarNfce', () => {
  it('envia a nota para a rota de contingência do emissor, e não para a de emissão', async () => {
    const { api, post } = criaApi(retornoContingencia);

    await new ContingenciarNfce(api).executa(requestContingencia);

    expect(post).toHaveBeenCalledTimes(1);
    expect(post.mock.calls[0][0]).toBe('/nfce/contingenciar');
  });

  it('manda ao emissor a data e a justificativa da contingência', async () => {
    const { api, post } = criaApi(retornoContingencia);

    await new ContingenciarNfce(api).executa(requestContingencia);

    expect(post.mock.calls[0][1]).toMatchObject({
      nfce: {
        tipoEmissao: 9,
        dataContingencia,
        motivoContingencia: 'SEFAZ fora do ar, emissao em contingencia',
      },
    });
  });

  it('devolve a nota em contingência com a chave e o XML assinado', async () => {
    const { api } = criaApi(retornoContingencia);

    const resultado = await new ContingenciarNfce(api).executa(requestContingencia);

    expect(resultado).toMatchObject({
      status: 'O',
      chaveAcesso,
      protocolo: 'CONTIGENCIA',
      xml: '<NFe><infNFe/></NFe>',
    });
  });

  it('recusa o pedido inválido antes de chamar o emissor', async () => {
    const { api, post } = criaApi(retornoContingencia);
    const invalido = { ...requestContingencia, nfce: undefined } as unknown as EnvioNfceApi;

    await expect(new ContingenciarNfce(api).executa(invalido)).rejects.toBeInstanceOf(EmissorFiscalError);
    expect(post).not.toHaveBeenCalled();
  });

  it('falha quando o retorno do emissor não é reconhecido', async () => {
    const { api } = criaApi({ ...retornoContingencia, status: 'X' });

    await expect(new ContingenciarNfce(api).executa(requestContingencia)).rejects.toThrow();
  });
});

describe('NfceService.contingenciar', () => {
  it('delega ao caso de uso de contingência', async () => {
    const { api, post } = criaApi(retornoContingencia);

    const resultado = await new NfceService(api).contingenciar(requestContingencia);

    expect(post.mock.calls[0][0]).toBe('/nfce/contingenciar');
    expect(resultado.chaveAcesso).toBe(chaveAcesso);
  });
});
