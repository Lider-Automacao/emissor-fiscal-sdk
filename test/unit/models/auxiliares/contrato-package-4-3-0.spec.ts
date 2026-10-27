import { describe, expect, it } from 'vitest';
import { RetornoConsultaSchema } from '../../../../src/dtos/retorno/retorno-consulta';
import { ConfiguracoesEnvioSchema } from '../../../../src/models/auxiliares/configuracoes-envio';
import { ICMS900Schema } from '../../../../src/models/icms/icms-900';

describe('contrato do package 4.3.0', () => {
  it('RetornoConsulta aceita xmlLocalConfere', () => {
    const base = { protocolo: '1', status: 'A', chaveAcesso: '1' };
    expect(RetornoConsultaSchema.parse({ ...base, xmlLocalConfere: true }).xmlLocalConfere).toBe(true);
    expect(RetornoConsultaSchema.parse(base).xmlLocalConfere).toBeUndefined();
  });

  it('ConfiguracoesEnvio aceita tempoLimiteMs e limiteSemDestinatario', () => {
    expect(ConfiguracoesEnvioSchema.safeParse({ modelo: 55, tempoLimiteMs: 30000 }).success).toBe(true);
    expect(ConfiguracoesEnvioSchema.safeParse({ modelo: 55, tempoLimiteMs: 0 }).success).toBe(false);
    const nfce = { modelo: 65, versaoQrCode: 3, limiteSemDestinatario: 5000 };
    expect(ConfiguracoesEnvioSchema.parse(nfce)).toMatchObject({ limiteSemDestinatario: 5000 });
  });

  it('ICMS900 ST aceita modBCST até 6 e recusa 7', () => {
    const bc = (m: number) => ({ modalidadeDeterminacao: m, valor: 0, percentualReducao: 0 });
    const ok = (m: number) => ICMS900Schema.safeParse({
      cst: '900', origem: '0', baseCalculo: bc(3), aliquota: 0, valor: 0,
      substituicaoTributaria: { baseCalculo: bc(m), margemValorAdicionado: 0, aliquota: 0, valor: 0 },
      creditoSimplesNacional: { percentual: 0, valor: 0 },
    }).success;
    expect(ok(6)).toBe(true);
    expect(ok(7)).toBe(false);
  });
});
