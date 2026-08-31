import { describe, expect, it } from 'vitest';
import { PedidoItemSchema } from '../../../src/dtos/pedido-item';

const baseItem = {
  controleItem: 1,
  codigo: 123,
  codigoBarras: 'SEM GTIN',
  descricao: 'Produto Teste',
  ncm: '12345678',
  exTipi: '',
  cest: null,
  cfop: '5102',
  valorBruto: 100,
  compoeTotal: true,
  valorFrete: 0,
  valorSeguro: 0,
  valorDesconto: 0,
  valorOutros: 0,
  valorLiquido: 100,
  origem: '0',
  cst: '00',
  aliquota: 18,
  aliquotaSt: 0,
  aliquotaSuperSimples: 0,
  percentualReducao: 0,
  cstPis: '01',
  aliquotaPis: 0,
  cstCofins: '01',
  aliquotaCofins: 0,
  valorAproximadoTributos: 0,
  removeIcmsBasePisCofins: false,
  unidade: { comercial: 'UN', tributavel: 'UN' },
  quantidade: { comercial: 1, tributavel: 1 },
  valorUnitario: { comercial: 100, tributavel: 100 },
  destinatarioUF: 'SP',
  emitenteUF: 'SP',
  valorIpi: 0,
  incluirFreteBcIcms: false,
  incluirSeguroBcIcms: false,
  incluirOutrasDespesasBcIcms: false,
  incluirIpiBcIcms: false,
};

describe('PedidoItemSchema', () => {
  it('aceita o item mínimo obrigatório e aplica default no enum de interpretação de redução', () => {
    const result = PedidoItemSchema.parse(baseItem);
    expect(result.interpretacaoPercentualReducao).toBe('PercentualAproveitado');
  });

  it('aceita todos os campos novos (IS, IPI, ICMS-ST/desoneração) quando informados', () => {
    const result = PedidoItemSchema.parse({
      ...baseItem,
      interpretacaoPercentualReducao: 'PercentualReduzido',
      mvaSt: 40,
      percentualReducaoSt: 10,
      percentualReducaoStZerada: false,
      percentualDiferimento: 0,
      aliquotaFcpSt: 2,
      motivoDesoneracao: 9,
      deduzValorDesoneracaoDoItem: true,
      cstIpi: '50',
      aliquotaIpi: 5,
      cstIS: '000',
      classificacaoIS: '1234567',
      aliquotaIS: 1,
      aliquotaEspecificaIS: 0,
      unidadeIS: 'UN',
      quantidadeIS: 1,
      infoComplementares: 'observação do item',
    });

    expect(result.interpretacaoPercentualReducao).toBe('PercentualReduzido');
    expect(result.cstIS).toBe('000');
    expect(result.aliquotaIpi).toBe(5);
  });

  it('rejeita valor de enum fora de PercentualAproveitado/PercentualReduzido', () => {
    const result = PedidoItemSchema.safeParse({
      ...baseItem,
      interpretacaoPercentualReducao: 'Errado',
    });
    expect(result.success).toBe(false);
  });

  it('aceita null explícito nos campos novos nullable (Nullable<T> do Delphi vira null explícito no JSON)', () => {
    const result = PedidoItemSchema.parse({
      ...baseItem,
      mvaSt: null,
      cstIS: null,
      motivoDesoneracao: null,
      deduzValorDesoneracaoDoItem: null,
    });
    expect(result.mvaSt).toBeNull();
    expect(result.cstIS).toBeNull();
  });

  it('aceita os campos novos ausentes do payload (optional, não só nullable)', () => {
    const result = PedidoItemSchema.parse(baseItem);
    expect(result.mvaSt).toBeUndefined();
    expect(result.cstIS).toBeUndefined();
  });

  it('exige as flags de base do ICMS próprio (incluir*BcIcms) - não são opcionais', () => {
    const { incluirFreteBcIcms, ...semFlag } = baseItem;
    const result = PedidoItemSchema.safeParse(semFlag);
    expect(result.success).toBe(false);
  });

  it('exige valorIpi (Double não-nulo no Delphi) - não é opcional', () => {
    const { valorIpi, ...semValorIpi } = baseItem;
    const result = PedidoItemSchema.safeParse(semValorIpi);
    expect(result.success).toBe(false);
  });
});
