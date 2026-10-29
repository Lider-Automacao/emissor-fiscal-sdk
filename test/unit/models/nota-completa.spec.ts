import { describe, expect, it } from 'vitest';
import { NfceItemSchema } from '../../../src/models/nfce/nfce-item';
import { NfceSchema } from '../../../src/models/nfce/nfce';
import { NfeItemSchema } from '../../../src/models/nfe/nfe-item';
import { NfeSchema } from '../../../src/models/nfe/nfe';

const chave = '35260112345678000199550010000000011000000019';

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

const emitente = {
  documento: '01103144000136',
  razao: 'Empresa Teste LTDA',
  inscicaoEstadual: '123456789',
  regimeTributario: 1,
};

const cabecalho = {
  ambiente: 2,
  numero: 1,
  serie: 1,
  dataEmissao: '2026-10-21T10:00:00-03:00',
  dataSaidaEntrada: '2026-10-21T10:00:00-03:00',
  saida: true,
  versaoProcesso: '1.0',
  identificacaoDestino: 1,
  codigoMunicipioFatoGerador: 3550308,
  emitente,
  itens: [item],
  total: {},
  pagamento: { troco: 0, itens: [{ meio: '01', valor: 10, aVista: true }] },
};

const nfe = { ...cabecalho, modelo: 55, finalidade: 1, presencial: 1, tipoImpressao: 1, tipoEmissao: 1 };
const nfce = { ...cabecalho, modelo: 65, finalidade: 1, presencial: 1, tipoImpressao: 4, tipoEmissao: 1 };

describe('NfeSchema (documento completo)', () => {
  it('aceita a nota mínima e aplica os defaults dos grupos novos', () => {
    const result = NfeSchema.parse(nfe);

    expect(result.documentosReferenciados).toEqual([]);
    expect(result.transporte).toBeUndefined();
    expect(result.itens[0].indicadorBemMovelUsado).toBe('bmuNaoInformado');
  });

  it('mantém o código numérico da chave para a emissão reaproveitar', () => {
    const result = NfeSchema.parse({ ...nfe, codigoNumerico: '00012345' });

    expect(result.codigoNumerico).toBe('00012345');
  });

  it('recusa código numérico fora de 8 dígitos', () => {
    expect(NfeSchema.safeParse({ ...nfe, codigoNumerico: '123' }).success).toBe(false);
  });

  it('aceita nota de devolução com item referenciado e pagamento 90', () => {
    const result = NfeSchema.safeParse({
      ...nfe,
      finalidade: 4,
      pagamento: { troco: 0, itens: [{ meio: '90', valor: 0, aVista: true }] },
      itens: [{ ...item, documentoReferenciado: { chaveAcesso: chave, numeroItem: 1 } }],
    });

    expect(result.success).toBe(true);
  });

  it('aceita nota complementar com NF-e referenciada, transporte, cobrança e informações adicionais', () => {
    const result = NfeSchema.safeParse({
      ...nfe,
      finalidade: 2,
      documentosReferenciados: [{ tipo: 'tdrNFe', chaveAcesso: chave }],
      transporte: {
        modalidadeFrete: 1,
        transportador: { documento: '01103144000136', nome: 'Transportes SA', uf: 'SP' },
        volumes: [{ quantidade: 2, pesoBruto: 3.5, lacres: ['L1', 'L2'] }],
      },
      cobranca: {
        fatura: { numero: '10', valorOriginal: 10, valorLiquido: 10 },
        duplicatas: [{ numero: '001', vencimento: '2026-11-21T00:00:00-03:00', valor: 10 }],
      },
      informacoesAdicionais: { fisco: 'texto ao fisco', processos: [{ numero: '123', origem: 1 }] },
      compraGovernamental: {
        tipoEnte: 'tegEstado',
        percentualReducao: 5,
        tipoOperacao: 'togFornecimentoComPagamentoPosterior',
      },
      indicadorIntermediador: 0,
    });

    expect(result.success).toBe(true);
  });

  it('recusa finalidade, presencial e tipo de impressão fora dos domínios', () => {
    expect(NfeSchema.safeParse({ ...nfe, finalidade: 0 }).success).toBe(false);
    expect(NfeSchema.safeParse({ ...nfe, presencial: 6 }).success).toBe(false);
    expect(NfeSchema.safeParse({ ...nfe, tipoImpressao: 7 }).success).toBe(false);
  });

  it('recusa referência de documento com tipo desconhecido', () => {
    const result = NfeSchema.safeParse({ ...nfe, documentosReferenciados: [{ tipo: 'tdrXYZ' }] });

    expect(result.success).toBe(false);
  });

  it('aceita o item com IPI e valores líquidos', () => {
    const result = NfeItemSchema.parse({
      ...item,
      tributos: { ...item.tributos, ipi: { cst: '50', baseCalculo: 10, aliquota: 5, valor: 0.5 } },
      valorUnitarioLiquido: 9.5,
      valorProdutoLiquido: 9.5,
      icmsPrevisto: 1.2,
    });

    expect(result.tributos.ipi?.cst).toBe('50');
    expect(result.valorProdutoLiquido).toBe(9.5);
    expect(result.icmsPrevisto).toBe(1.2);
  });

  it('aceita números como string nos campos numéricos novos', () => {
    const result = NfeItemSchema.parse({ ...item, valorUnitarioLiquido: '9.5' });

    expect(result.valorUnitarioLiquido).toBe(9.5);
  });

  it('recusa item referenciado com chave inválida', () => {
    const result = NfeItemSchema.safeParse({
      ...item,
      documentoReferenciado: { chaveAcesso: '123', numeroItem: 1 },
    });

    expect(result.success).toBe(false);
  });
});

describe('NfceSchema (documento completo)', () => {
  it('aceita a nota mínima', () => {
    expect(NfceSchema.safeParse(nfce).success).toBe(true);
  });

  it('aceita entrega a domicílio com transporte e intermediador', () => {
    const result = NfceSchema.safeParse({
      ...nfce,
      presencial: 4,
      indicadorIntermediador: 1,
      transporte: {
        modalidadeFrete: 0,
        transportador: { documento: '01103144000136', nome: 'Entregas LTDA' },
      },
    });

    expect(result.success).toBe(true);
  });

  it('aceita presencial 5 com município do fato gerador do IBS', () => {
    const result = NfceSchema.safeParse({ ...nfce, presencial: 5, codigoMunicipioFatoGeradorIbs: 3550308 });

    expect(result.success).toBe(true);
  });

  it('mantém o código numérico da chave para reenvio de contingência', () => {
    const result = NfceSchema.parse({ ...nfce, codigoNumerico: '00012345' });

    expect(result.codigoNumerico).toBe('00012345');
  });

  it('recusa finalidade diferente de 1 (rej. 715)', () => {
    expect(NfceSchema.safeParse({ ...nfce, finalidade: 4 }).success).toBe(false);
  });

  it('aceita o item com valores líquidos e bem móvel usado', () => {
    const result = NfceItemSchema.parse({
      ...item,
      valorUnitarioLiquido: 9.5,
      valorProdutoLiquido: 9.5,
      indicadorBemMovelUsado: 'bmuBemMovelUsado',
    });

    expect(result.indicadorBemMovelUsado).toBe('bmuBemMovelUsado');
  });

  it('recusa indicador de bem móvel usado fora dos identifiers do Delphi', () => {
    expect(NfceItemSchema.safeParse({ ...item, indicadorBemMovelUsado: 1 }).success).toBe(false);
  });

  it('não define o grupo de IPI no item (a NFC-e não aceita)', () => {
    const result = NfceItemSchema.parse({
      ...item,
      tributos: { ...item.tributos, ipi: { cst: '50' } },
    });

    expect(result.tributos).not.toHaveProperty('ipi');
  });
});
