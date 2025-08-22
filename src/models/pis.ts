import z from 'zod'
import { NumberSchema } from '../types/number-type'
import { SubstituicaoTributariaSchema } from './substituicao-tributaria'

export const PisSchema = z.object({
  cst: z.string().optional().default('49'),
  baseCalculo: NumberSchema.default(0),
  aliquota: NumberSchema.default(0),
  valor: NumberSchema.default(0),
  quantidadeVendida: NumberSchema.default(0),
  aliquotaReais: NumberSchema.default(0),
  substituicaoTributaria: SubstituicaoTributariaSchema.optional().nullable(),
})

export type Pis = z.infer<typeof PisSchema>
