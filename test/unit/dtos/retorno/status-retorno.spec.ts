import { describe, expect, it } from 'vitest'
import { RetornoCancelamentoSchema } from '../../../../src/dtos/retorno/retorno-cancelamento'
import { RetornoCartaCorrecaoSchema } from '../../../../src/dtos/retorno/retorno-carta-correcao'
import { RetornoConsultaSchema } from '../../../../src/dtos/retorno/retorno-consulta'
import { RetornoEnvioApiSchema } from '../../../../src/dtos/retorno/retorno-envio'
import { StatusRetornoSchema } from '../../../../src/models/auxiliares/status'

const envio = (status: unknown) => ({
  protocolo: '135260000000001',
  chaveAcesso: '3'.repeat(44),
  status,
  xml: '<nfeProc/>',
  numero: 1,
  serie: 1,
})

const consulta = (status: unknown) => ({
  protocolo: '135260000000001',
  chaveAcesso: '3'.repeat(44),
  status,
})

const cancelamento = (status: unknown) => ({
  evento: '<procEventoNFe/>',
  protocolo: '135260000000001',
  status,
})

const cartaCorrecao = (status: unknown) => ({
  evento: '<procEventoNFe/>',
  protocolo: '135260000000001',
  sequenciaEvento: 1,
  status,
})

describe('StatusRetornoSchema', () => {
  it.each([
    ['sdAutorizada', 'A'],
    ['sdDenegada', 'D'],
    ['sdCancelada', 'C'],
    ['sdCanceladaPorSubstituicao', 'C'],
    ['sdContingencia', 'O'],
    ['sdInutilizada', 'I'],
    ['sdEventoRegistrado', 'A'],
  ])('traduz o enum do emissor %s para a letra %s', (nomeDoEnum, letra) => {
    expect(StatusRetornoSchema.parse(nomeDoEnum)).toBe(letra)
  })

  it.each([
    ['autorizada', 'A'],
    ['denegada', 'D'],
    ['cancelada', 'C'],
    ['cancelada_por_substituicao', 'C'],
    ['contingencia', 'O'],
    ['inutilizada', 'I'],
    ['evento_registrado', 'A'],
  ])('traduz o texto statusDescricao %s para a letra %s', (texto, letra) => {
    expect(StatusRetornoSchema.parse(texto)).toBe(letra)
  })

  it.each(['A', 'C', 'D', 'I', 'O'])('mantém a letra %s do emissor anterior', (letra) => {
    expect(StatusRetornoSchema.parse(letra)).toBe(letra)
  })

  it('ignora caixa e espaços nas pontas', () => {
    expect(StatusRetornoSchema.parse(' SDAUTORIZADA ')).toBe('A')
  })

  it.each(['sdNaoDefinido', '', 'R', 'xyz', 1, null, undefined])(
    'rejeita o valor %s, que não é um status de documento',
    (valor) => {
      expect(StatusRetornoSchema.safeParse(valor).success).toBe(false)
    },
  )
})

describe.each([
  ['RetornoEnvioApiSchema', RetornoEnvioApiSchema, envio],
  ['RetornoConsultaSchema', RetornoConsultaSchema, consulta],
  ['RetornoCancelamentoSchema', RetornoCancelamentoSchema, cancelamento],
  ['RetornoCartaCorrecaoSchema', RetornoCartaCorrecaoSchema, cartaCorrecao],
])('%s aceita o status no formato novo do emissor', (_nome, schema, monta) => {
  it('lê sdAutorizada como A', () => {
    expect(schema.parse(monta('sdAutorizada')).status).toBe('A')
  })

  it('continua lendo a letra A', () => {
    expect(schema.parse(monta('A')).status).toBe('A')
  })

  it('rejeita um status desconhecido', () => {
    expect(schema.safeParse(monta('desconhecido')).success).toBe(false)
  })
})

describe('retornos que carregam outros status do documento', () => {
  it('RetornoEnvioApiSchema lê sdContingencia como O e sdDenegada como D', () => {
    expect(RetornoEnvioApiSchema.parse(envio('sdContingencia')).status).toBe('O')
    expect(RetornoEnvioApiSchema.parse(envio('sdDenegada')).status).toBe('D')
  })

  it('RetornoCancelamentoSchema lê sdCancelada como C', () => {
    expect(RetornoCancelamentoSchema.parse(cancelamento('sdCancelada')).status).toBe('C')
  })

  it('RetornoCartaCorrecaoSchema lê sdEventoRegistrado como A', () => {
    expect(RetornoCartaCorrecaoSchema.parse(cartaCorrecao('sdEventoRegistrado')).status).toBe('A')
  })
})

describe('campos de situação que o emissor devolve ao lado do status', () => {
  it('RetornoEnvioApiSchema preserva codigoStatus (cStat da SEFAZ) e statusDescricao', () => {
    const result = RetornoEnvioApiSchema.parse({ ...envio('sdAutorizada'), codigoStatus: 100, statusDescricao: 'autorizada' })

    expect(result.codigoStatus).toBe(100)
    expect(result.statusDescricao).toBe('autorizada')
  })

  it('RetornoEnvioApiSchema aceita o retorno sem esses campos (emissor anterior)', () => {
    const result = RetornoEnvioApiSchema.parse(envio('A'))

    expect(result.codigoStatus).toBeUndefined()
    expect(result.statusDescricao).toBeUndefined()
  })

  it('RetornoConsultaSchema preserva codigoStatus e statusDescricao', () => {
    const result = RetornoConsultaSchema.parse({ ...consulta('sdCancelada'), codigoStatus: 101, statusDescricao: 'cancelada' })

    expect(result.codigoStatus).toBe(101)
    expect(result.statusDescricao).toBe('cancelada')
  })

  it('RetornoCancelamentoSchema preserva statusDescricao', () => {
    const result = RetornoCancelamentoSchema.parse({ ...cancelamento('sdCancelada'), statusDescricao: 'cancelada' })

    expect(result.statusDescricao).toBe('cancelada')
  })
})
