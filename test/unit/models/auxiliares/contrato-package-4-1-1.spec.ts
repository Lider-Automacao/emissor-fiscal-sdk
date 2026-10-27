import { describe, expect, it } from 'vitest';
import { ConfiguracaoCertificadoSchema } from '../../../../src/models/auxiliares/configuracao-certificado';
import { ConfiguracoesEnvioSchema } from '../../../../src/models/auxiliares/configuracoes-envio';
import { CobrancaSchema } from '../../../../src/models/auxiliares/cobranca';
import { DFeReferenciadoItemSchema, DocumentoReferenciadoNotaSchema } from '../../../../src/models/auxiliares/documento-referenciado';
import { InformacoesAdicionaisSchema } from '../../../../src/models/auxiliares/informacoes-adicionais';
import { TotalSchema } from '../../../../src/models/auxiliares/total';
import { TransporteSchema } from '../../../../src/models/auxiliares/transporte';
import { CompraGovernamentalSchema } from '../../../../src/models/ibs_cbs/compra_governamental';
import { NfceSchema } from '../../../../src/models/nfce/nfce';
import { NfeSchema } from '../../../../src/models/nfe/nfe';

const chave = '35260112345678000199550010000000011000000019';

describe('TransporteSchema', () => {
  it('aceita modalidade sem transporte e aplica listas vazias', () => {
    const result = TransporteSchema.parse({ modalidadeFrete: 9 });
    expect(result.reboques).toEqual([]);
    expect(result.volumes).toEqual([]);
  });

  it('recusa modalidade fora de 0 a 4 e 9', () => {
    expect(TransporteSchema.safeParse({ modalidadeFrete: 5 }).success).toBe(false);
  });

  it('recusa mais de 5 reboques', () => {
    const reboque = { placa: 'ABC1234', uf: 'SP' };
    const result = TransporteSchema.safeParse({ modalidadeFrete: 0, reboques: Array(6).fill(reboque) });
    expect(result.success).toBe(false);
  });

  it('recusa documento de transportador que não é CPF nem CNPJ', () => {
    const result = TransporteSchema.safeParse({
      modalidadeFrete: 0,
      transportador: { documento: '123', nome: 'Transportadora' },
    });
    expect(result.success).toBe(false);
  });
});

describe('CobrancaSchema', () => {
  it('aceita fatura com duplicatas numeradas em 3 algarismos', () => {
    const result = CobrancaSchema.safeParse({
      fatura: { numero: '1', valorOriginal: 100, valorLiquido: 100 },
      duplicatas: [{ numero: '001', vencimento: '2026-12-01T00:00:00-03:00', valor: 100 }],
    });
    expect(result.success).toBe(true);
  });

  it('recusa duplicata com número fora do padrão 001', () => {
    const result = CobrancaSchema.safeParse({
      duplicatas: [{ numero: '1', vencimento: '2026-12-01T00:00:00-03:00', valor: 100 }],
    });
    expect(result.success).toBe(false);
  });
});

describe('InformacoesAdicionaisSchema', () => {
  it('recusa mais de 10 observações do contribuinte', () => {
    const campo = { campo: 'a', texto: 'b' };
    const result = InformacoesAdicionaisSchema.safeParse({ observacoesContribuinte: Array(11).fill(campo) });
    expect(result.success).toBe(false);
  });

  it('recusa origem de processo fora de 0, 1, 2, 3 e 9', () => {
    const result = InformacoesAdicionaisSchema.safeParse({ processos: [{ numero: '1', origem: 4 }] });
    expect(result.success).toBe(false);
  });
});

describe('DocumentoReferenciadoNotaSchema', () => {
  it('serializa o tipo como identifier Delphi', () => {
    expect(DocumentoReferenciadoNotaSchema.safeParse({ tipo: 'tdrNFe', chaveAcesso: chave }).success).toBe(true);
    expect(DocumentoReferenciadoNotaSchema.safeParse({ tipo: 'nfe', chaveAcesso: chave }).success).toBe(false);
  });

  it('exige somente um entre cnpj e cpf no produtor', () => {
    const base = {
      tipo: 'tdrNFP', codigoUf: 35, anoMes: '2601', inscricaoEstadual: 'ISENTO', modelo: '04', serie: 1, numero: 10,
    };
    expect(DocumentoReferenciadoNotaSchema.safeParse({ ...base, cpf: '12345678901' }).success).toBe(true);
    expect(DocumentoReferenciadoNotaSchema.safeParse(base).success).toBe(false);
    expect(DocumentoReferenciadoNotaSchema.safeParse({ ...base, cpf: '12345678901', cnpj: '12345678000199' }).success).toBe(false);
  });

  it('limita numeroItem do item referenciado a 1 a 999', () => {
    expect(DFeReferenciadoItemSchema.safeParse({ chaveAcesso: chave, numeroItem: 999 }).success).toBe(true);
    expect(DFeReferenciadoItemSchema.safeParse({ chaveAcesso: chave, numeroItem: 1000 }).success).toBe(false);
  });
});

describe('CompraGovernamentalSchema', () => {
  it('usa os identifiers dos enums Delphi', () => {
    const result = CompraGovernamentalSchema.parse({
      tipoEnte: 'tegMunicipio',
      percentualReducao: 10,
      tipoOperacao: 'togFornecimentoComPagamentoPosterior',
    });
    expect(result.documentosAnteriores).toEqual([]);
  });

  it('recusa valor numérico no lugar do identifier', () => {
    const result = CompraGovernamentalSchema.safeParse({ tipoEnte: 3, percentualReducao: 10, tipoOperacao: 0 });
    expect(result.success).toBe(false);
  });
});

describe('TotalSchema', () => {
  it('aceita valorLiquidoTotal opcional', () => {
    expect(TotalSchema.parse({}).valorLiquidoTotal).toBeUndefined();
    expect(TotalSchema.parse({ valorLiquidoTotal: 9.5 }).valorLiquidoTotal).toBe(9.5);
  });
});

describe('ConfiguracoesEnvioSchema (NFC-e)', () => {
  const base = { modelo: 65, ambiente: 2 };

  it('exige idCSC e csc no QR Code versão 2 ou sem versão', () => {
    expect(ConfiguracoesEnvioSchema.safeParse(base).success).toBe(false);
    expect(ConfiguracoesEnvioSchema.safeParse({ ...base, versaoQrCode: 2 }).success).toBe(false);
    expect(ConfiguracoesEnvioSchema.safeParse({ ...base, versaoQrCode: 2, idCSC: '1', csc: 'abc' }).success).toBe(true);
  });

  it('dispensa o CSC no QR Code versão 3', () => {
    expect(ConfiguracoesEnvioSchema.safeParse({ ...base, versaoQrCode: 3 }).success).toBe(true);
  });

  it('recusa versão de QR Code fora de 2 e 3', () => {
    expect(ConfiguracoesEnvioSchema.safeParse({ ...base, versaoQrCode: 1, idCSC: '1', csc: 'abc' }).success).toBe(false);
  });
});

describe('ConfiguracaoCertificadoSchema', () => {
  it('aceita arquivo com senha', () => {
    const result = ConfiguracaoCertificadoSchema.safeParse({ arquivoBase64: 'YWJj', senha: '123' });
    expect(result.success).toBe(true);
  });

  it('aceita certificado instalado com número de série', () => {
    const result = ConfiguracaoCertificadoSchema.safeParse({ certificadoInstalado: true, numeroSerie: 'ABC123' });
    expect(result.success).toBe(true);
  });

  it('recusa certificado instalado sem número de série e arquivo sem senha', () => {
    expect(ConfiguracaoCertificadoSchema.safeParse({ certificadoInstalado: true }).success).toBe(false);
    expect(ConfiguracaoCertificadoSchema.safeParse({ arquivoBase64: 'YWJj' }).success).toBe(false);
  });
});

describe('cabeçalho de NFe e NFCe', () => {
  const nfeShape = NfeSchema.shape;
  const nfceShape = NfceSchema.shape;

  it('NFe aceita finalidades de 1 a 6 e NFCe somente 1', () => {
    for (const finalidade of [1, 2, 3, 4, 5, 6]) {
      expect(nfeShape.finalidade.safeParse(finalidade).success).toBe(true);
    }
    expect(nfeShape.finalidade.safeParse(7).success).toBe(false);
    expect(nfceShape.finalidade.safeParse(2).success).toBe(false);
  });

  it('NFe aceita indicador de presença 0 a 5 e 9; NFCe somente 1, 4 e 5', () => {
    for (const presencial of [0, 1, 2, 3, 4, 5, 9]) {
      expect(nfeShape.presencial.safeParse(presencial).success).toBe(true);
    }
    expect(nfeShape.presencial.safeParse(6).success).toBe(false);
    expect(nfceShape.presencial.safeParse(5).success).toBe(true);
    expect(nfceShape.presencial.safeParse(2).success).toBe(false);
  });

  it('NFe aceita DANFE Simplificado Tipo 2 (tipoImpressao 6)', () => {
    expect(nfeShape.tipoImpressao.safeParse(6).success).toBe(true);
  });

  it('NFCe valida o código numérico de 8 dígitos', () => {
    expect(nfceShape.codigoNumerico.safeParse('12345678').success).toBe(true);
    expect(nfceShape.codigoNumerico.safeParse('123').success).toBe(false);
  });

  it('indicadorIntermediador aceita somente 0 e 1', () => {
    expect(nfeShape.indicadorIntermediador.safeParse(1).success).toBe(true);
    expect(nfeShape.indicadorIntermediador.safeParse(2).success).toBe(false);
  });

  it('NFe limita documentosReferenciados a 500 e assume lista vazia', () => {
    expect(nfeShape.documentosReferenciados.parse(undefined)).toEqual([]);
    const referencia = { tipo: 'tdrNFe', chaveAcesso: chave };
    expect(nfeShape.documentosReferenciados.safeParse(Array(501).fill(referencia)).success).toBe(false);
  });
});
