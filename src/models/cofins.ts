import z from 'zod'
import { NumberSchema } from '../types/number-type'
import { CSOSNSchema } from './CSOSNSchema'
import { CSTSchema } from './CSTSchema'
import { SubstituicaoTributariaSchema } from './substituicao-tributaria'

export const CofinsSchema = z.object({
  cst: z.union([CSTSchema, CSOSNSchema]).default('49'),
  baseCalculo: NumberSchema.default(0),
  aliquota: NumberSchema.default(0),
  valor: NumberSchema.default(0),
  quantidadeVendida: NumberSchema.default(0),
  aliquotaReais: NumberSchema.default(0),
  substituicaoTributaria: SubstituicaoTributariaSchema.optional().nullable(),
})

export type Cofins = z.infer<typeof CofinsSchema>
