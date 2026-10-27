import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'
import { CobrancaSchema } from '../auxiliares/cobranca'
import { DestinatarioSchema } from '../auxiliares/destinatario'
import { DocumentoReferenciadoNotaSchema } from '../auxiliares/documento-referenciado'
import { EmitenteSchema } from '../auxiliares/emitente'
import { InformacoesAdicionaisSchema } from '../auxiliares/informacoes-adicionais'
import { PagamentoSchema } from '../auxiliares/pagamento'
import { TotalSchema } from '../auxiliares/total'
import { TransporteSchema } from '../auxiliares/transporte'
import { CompraGovernamentalSchema } from '../ibs_cbs/compra_governamental'
import { PagamentoAntecipadoSchema } from '../ibs_cbs/pagamento_antecipado'
import { NfeItemSchema } from './nfe-item'

export const NfeSchema = z.object({
  ambiente: IntSchema,
  modelo: IntSchema.default(65),
  numero: IntSchema,
  serie: IntSchema,
  finalidade: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)])
    .describe('1=normal/2=complementar/3=ajuste/4=devolução/5=crédito/6=débito'),
  natureza: z.string().default('VENDA'),
  dataEmissao: z.iso.datetime({ offset: true }),
  dataSaidaEntrada: z.iso.datetime({ offset: true }),
  dataContingencia: z.iso.datetime({ offset: true }).optional(),
  motivoContingencia: z.string().optional(),
  saida: z.boolean(),
  versaoProcesso: z.string(),
  presencial: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(9)]),
  tipoImpressao: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)])
    .describe('6=DANFE Simplificado Tipo 2 (NT 2026.002)'),
  tipoEmissao: z.number().int(), //z.union([z.literal(0), z.literal(8)]),
  identificacaoDestino: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  codigoMunicipioFatoGerador: IntSchema,
  codigoMunicipioFatoGeradorIbs: IntSchema.nullish().describe('Somente com presencial 5'),
  tipoNotaDebito: z.string().nullish(),
  tipoNotaCredito: z.string().nullish(),
  pagamentoAntecipado: z.array(PagamentoAntecipadoSchema).nullish(),
  indicadorIntermediador: z.union([z.literal(0), z.literal(1)]).nullish()
    .describe('Obrigatório com presencial 2, 3, 4 ou 9 (rej. 434) e proibido nos demais (rej. 435)'),
  transporte: TransporteSchema.nullish(),
  cobranca: CobrancaSchema.nullish(),
  informacoesAdicionais: InformacoesAdicionaisSchema.nullish(),
  documentosReferenciados: z.array(DocumentoReferenciadoNotaSchema).max(500).default([]),
  compraGovernamental: CompraGovernamentalSchema.nullish(),
  consumidorFinal: z.boolean().default(true),
  emitente: EmitenteSchema,
  destinatario: DestinatarioSchema.optional().nullish(),
  itens: z.array(NfeItemSchema),
  total: TotalSchema,
  pagamento: z.object({
    troco: NumberSchema,
    itens: z.array(PagamentoSchema),
  }),
})

export type Nfe = z.infer<typeof NfeSchema>
