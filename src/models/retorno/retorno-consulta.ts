import z from 'zod'
import { NullishString } from '../../types'
import { StatusSchema } from '../status'

export const RetornoConsultaSchema = z.object({
  data: z.date(),
  status: StatusSchema,
  protocolo: z.string(),
  xml: NullishString,
})

export type RetornoConsulta = z.infer<typeof RetornoConsultaSchema>
