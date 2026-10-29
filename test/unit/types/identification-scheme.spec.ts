import { describe, expect, it } from 'vitest'
import { CPF_CNPJ_SCHEME } from '../../../src/types/identification-scheme.zod'

describe('CPF_CNPJ_SCHEME', () => {
  it.each([
    ['CNPJ numérico sem máscara', '11345254000168'],
    ['CNPJ numérico com máscara', '11.345.254/0001-68'],
    ['CNPJ alfanumérico sem máscara', '12ABC34501DE35'],
    ['CNPJ alfanumérico com máscara', '12.ABC.345/01DE-35'],
    ['CNPJ alfanumérico em minúsculas', '12.abc.345/01de-35'],
    ['CPF sem máscara', '52998224725'],
    ['CPF com máscara', '529.982.247-25'],
  ])('aceita %s', (_descricao, documento) => {
    expect(CPF_CNPJ_SCHEME.safeParse(documento).success).toBe(true)
  })

  it.each([
    ['CNPJ alfanumérico com dígito verificador errado', '12ABC34501DE36'],
    ['CNPJ numérico com dígito verificador errado', '11345254000169'],
    ['CPF com dígito verificador errado', '52998224726'],
    ['CPF com letras', '5299822472A'],
    ['documento vazio', ''],
  ])('recusa %s', (_descricao, documento) => {
    expect(CPF_CNPJ_SCHEME.safeParse(documento).success).toBe(false)
  })
})
