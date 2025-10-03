import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'
import { DestinatarioSchema } from '../destinatario'
import { EmitenteSchema } from '../emitente'
import { PagamentoSchema } from '../pagamento'
import { TotalSchema } from '../total'
import { NfceItemSchema } from './nfce-item'

export const NfceSchema = z.object({
  ambiente: IntSchema,
  modelo: IntSchema.default(65),
  numero: IntSchema,
  serie: IntSchema,
  finalidade: z.literal(1),
  natureza: z.string().default('VENDA'),
  dataEmissao: z.iso.datetime({ offset: true }),
  dataSaidaEntrada: z.iso.datetime({ offset: true }),
  dataContingencia: z.iso.datetime({ offset: true }).optional(),
  justificativaContingencia: z.string().optional(),
  saida: z.boolean(),
  versaoProcesso: z.string(),
  presencial: z.union([z.literal(1), z.literal(4)]),
  tipoImpressao: z.union([z.literal(4), z.literal(5)]),
  tipoEmissao: z.number().int(), //z.union([z.literal(0), z.literal(8)]),
  identificacaoDestino: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  codigoMunicipio: IntSchema,
  consumidorFinal: z.boolean().default(true),
  emitente: EmitenteSchema,
  destinatario: DestinatarioSchema.optional().nullish(),
  itens: z.array(NfceItemSchema),
  total: TotalSchema,
  pagamento: z.object({
    troco: NumberSchema,
    itens: z.array(PagamentoSchema),
  }),
})

export type Nfce = z.infer<typeof NfceSchema>
