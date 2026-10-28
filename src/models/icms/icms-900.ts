import z from 'zod'
import { IntSchema, NumberDefaultZeroSchema } from '../../types/number-type'

// leiauteNFe_v4.00.xsd, ICMSSN900: modBC, vBC, pRedBC, pICMS e vICMS formam um sequence
// minOccurs="0", e o grupo de ST (N17.1) e o crédito do Simples também são opcionais. O
// emissor segue o mesmo contrato (Nullable) e devolve só os grupos que calculou.
export const ICMS900Schema = z.object({
  cst: z.literal('900'),
  origem: z.string(),
  baseCalculo: z.object({
    modalidadeDeterminacao: IntSchema,
    valor: NumberDefaultZeroSchema,
    percentualReducao: NumberDefaultZeroSchema,
  }).nullish(),
  aliquota: NumberDefaultZeroSchema,
  valor: NumberDefaultZeroSchema.nullish(),
  substituicaoTributaria: z.object({
    baseCalculo: z.object({
      modalidadeDeterminacao: IntSchema.pipe(z.number().min(0).max(6)).describe('modBCST de 0 a 6 (MOC 7.0, N18)'),
      valor: NumberDefaultZeroSchema,
      percentualReducao: NumberDefaultZeroSchema,
    }),
    margemValorAdicionado: NumberDefaultZeroSchema,
    aliquota: NumberDefaultZeroSchema,
    valor: NumberDefaultZeroSchema,
    fundoCombatePobreza: z
      .object({
        aliquota: NumberDefaultZeroSchema,
        valorBaseCalculo: NumberDefaultZeroSchema,
        valor: NumberDefaultZeroSchema,
      })
      .optional(),
  }).nullish(),
  creditoSimplesNacional: z.object({
    percentual: NumberDefaultZeroSchema,
    valor: NumberDefaultZeroSchema,
  }).nullish(),
})

export type ICMS900 = z.infer<typeof ICMS900Schema>
