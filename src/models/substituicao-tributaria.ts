import z from 'zod'
import { NumberSchema } from '../types/number-type'

export const SubstituicaoTributariaSchema = z.object({
  baseCalculo: NumberSchema,
  aliquota: NumberSchema,
  quantidadeVendida: NumberSchema,
  aliquotaReais: NumberSchema,
  valor: NumberSchema,
})

export type SubstituicaoTributaria = z.infer<
  typeof SubstituicaoTributariaSchema
>
