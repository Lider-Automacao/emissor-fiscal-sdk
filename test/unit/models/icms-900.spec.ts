import { describe, expect, it } from 'vitest'
import { ICMS900Schema } from '../../../src/models/icms/icms-900'

const baseCalculo = { modalidadeDeterminacao: 3, valor: 50, percentualReducao: 0 }
const substituicaoTributaria = {
  baseCalculo: { modalidadeDeterminacao: 4, valor: 65, percentualReducao: 0 },
  margemValorAdicionado: 30,
  aliquota: 17,
  valor: 11.05,
}

// leiauteNFe_v4.00.xsd, ICMSSN900: modBC, vBC, pRedBC, pICMS e vICMS formam um sequence
// minOccurs="0"; o grupo de ST e o crédito do Simples também são opcionais.
describe('ICMS900Schema', () => {
  it('aceita o retorno mínimo do cálculo do emissor, sem destaque de ICMS (WF-2016)', () => {
    const result = ICMS900Schema.safeParse({ cst: '900', origem: '0', aliquota: 0 })

    expect(result.success).toBe(true)
  })

  it('não inventa os grupos opcionais quando o emissor não os devolve', () => {
    const result = ICMS900Schema.parse({ cst: '900', origem: '0', aliquota: 0 })

    expect(result.baseCalculo).toBeUndefined()
    expect(result.substituicaoTributaria).toBeUndefined()
    expect(result.creditoSimplesNacional).toBeUndefined()
  })

  it('aceita só o crédito do Simples, como o emissor devolve com aliquotaSuperSimples (WF-2017)', () => {
    const result = ICMS900Schema.parse({
      cst: '900', origem: '0', aliquota: 0,
      creditoSimplesNacional: { percentual: 2, valor: 1 },
    })

    expect(result.creditoSimplesNacional).toEqual({ percentual: 2, valor: 1 })
  })

  it('aceita o destaque completo do ICMS próprio, com ST e crédito', () => {
    const result = ICMS900Schema.safeParse({
      cst: '900', origem: '0', baseCalculo, aliquota: 17, valor: 8.5,
      substituicaoTributaria,
      creditoSimplesNacional: { percentual: 2, valor: 1 },
    })

    expect(result.success).toBe(true)
  })

  it('continua recusando a CST diferente de 900', () => {
    expect(ICMS900Schema.safeParse({ cst: '102', origem: '0', aliquota: 0 }).success).toBe(false)
  })

  it('continua recusando modBCST acima de 6 quando o grupo de ST é informado', () => {
    const result = ICMS900Schema.safeParse({
      cst: '900', origem: '0', aliquota: 0,
      substituicaoTributaria: { ...substituicaoTributaria, baseCalculo: { ...substituicaoTributaria.baseCalculo, modalidadeDeterminacao: 7 } },
    })

    expect(result.success).toBe(false)
  })
})
