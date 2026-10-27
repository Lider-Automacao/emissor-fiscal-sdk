import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'
import { DestinatarioSchema } from '../auxiliares/destinatario'
import { EmitenteSchema } from '../auxiliares/emitente'
import { PagamentoSchema } from '../auxiliares/pagamento'
import { TotalSchema } from '../auxiliares/total'
import { TransporteSchema } from '../auxiliares/transporte'
import { PagamentoAntecipadoSchema } from '../ibs_cbs/pagamento_antecipado'
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
  motivoContingencia: z.string().optional(),
  saida: z.boolean(),
  versaoProcesso: z.string(),
  presencial: z.union([z.literal(1), z.literal(4), z.literal(5)]),
  tipoImpressao: z.union([z.literal(4), z.literal(5)]),
  tipoEmissao: z.number().int(), //z.union([z.literal(0), z.literal(8)]),
  identificacaoDestino: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  codigoMunicipioFatoGerador: IntSchema,
  codigoMunicipioFatoGeradorIbs: IntSchema.nullish().describe('Somente com presencial 5 (rej. 1000 e 1005)'),
  codigoNumerico: z.string().regex(/^\d{8}$/, 'O código numérico deve ter 8 dígitos.').nullish()
    .describe('cNF da chave já impressa no cupom, para reenvio de contingência (rej. 897)'),
  tipoNotaDebito: z.string().nullish(),
  tipoNotaCredito: z.string().nullish(),
  pagamentoAntecipado: z.array(PagamentoAntecipadoSchema).nullish(),
  indicadorIntermediador: z.union([z.literal(0), z.literal(1)]).nullish()
    .describe('Obrigatório com presencial 2, 3, 4 ou 9 (rej. 434) e proibido nos demais (rej. 435)'),
  transporte: TransporteSchema.nullish().describe('Somente na entrega a domicílio (presencial 4)'),
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
