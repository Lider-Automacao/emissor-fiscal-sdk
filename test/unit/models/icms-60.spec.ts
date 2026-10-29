import { describe, expect, it } from 'vitest'
import { ICMS60Schema } from '../../../src/models/icms/icms-60'

const base = { cst: '60', origem: '0', valor: 0 }

describe('ICMS60Schema', () => {
  it('aceita ST retida sem o grupo ufDestino (o emissor só devolve vBCSTRet, pST e vICMSSTRet)', () => {
    const resultado = ICMS60Schema.safeParse({
      ...base,
      substituicaoTributaria: { valorBaseCalculo: 10, aliquota: 17, valor: 1.7 },
    })

    expect(resultado.success).toBe(true)
  })

  it('mantém ufDestino quando o emissor devolve', () => {
    const resultado = ICMS60Schema.parse({
      ...base,
      substituicaoTributaria: {
        valorBaseCalculo: 10,
        aliquota: 17,
        valor: 1.7,
        ufDestino: { valorBaseCalculo: 10, valor: 1.7 },
      },
    })

    expect(resultado.substituicaoTributaria?.ufDestino?.valor).toBe(1.7)
  })
})
