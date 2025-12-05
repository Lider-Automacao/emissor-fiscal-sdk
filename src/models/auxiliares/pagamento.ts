import z from 'zod'
import { IntSchema, NumberSchema } from '../../types/number-type'

export const MeioSchema = z.enum([
  '01', // Dinheiro
  '02', // Cheque
  '03', // Cartão de Crédito
  '04', // Cartão de Débito
  '05', // Crédito Loja
  '10', // Vale Alimentação
  '11', // Vale Refeição
  '12', // Vale Presente
  '13', // Vale Combustível
  '14', // Duplicata Mercantil
  '15', // Boleto Bancário
  '16', // Depósito Bancário
  '17', // Pagamento Instantâneo (PIX)
  '18', // Transferência bancária, Carteira Digital
  '19', // Programa de fidelidade, Cashback, Crédito Virtual
  '90', // Sem Pagamento(Ajuste e Devolução)
  '99', // Outros
])

export type Meio = z.infer<typeof MeioSchema>

const CartaoSchema = z.object({
  tipoIntegracao: IntSchema,
  numeroAutorizacao: z.string(),
  cnpjCredenciadora: z.string().nullable().optional(),
  bandeiraOperadora: z.string().nullable().optional(),
  cnpjBeneficiario: z.string().nullable().optional(),
  idTerminal: z.string().nullable().optional(),
})

const PrepaymentBase = z.object({
  meio: MeioSchema,
  valor: NumberSchema,
  dataHora: z.string().optional(),
})

export const PagamentoSchema = z.discriminatedUnion('meio', [
  PrepaymentBase.extend({
    meio: z.literal('03'),
    aVista: z.literal(false),
    cnpjTransacional: z.string(),
    ufTransacional: z.string(),
    cartao: CartaoSchema,
  }),
  PrepaymentBase.extend({
    meio: z.literal('04'),
    aVista: z.literal(false),
    cnpjTransacional: z.string(),
    ufTransacional: z.string(),
    cartao: CartaoSchema,
  }),
  PrepaymentBase.extend({
    meio: z.literal('17'),
    aVista: z.literal(true),
    cnpjTransacional: z.string(),
    ufTransacional: z.string(),
    cartao: CartaoSchema,
  }),
  PrepaymentBase.extend({
    meio: z.literal('18'),
    aVista: z.literal(true),
    cnpjTransacional: z.string(),
    ufTransacional: z.string(),
    cartao: CartaoSchema,
  }),
  PrepaymentBase.extend({
    meio: z.literal('99'),
    descricaoMeio: z.string().min(2).max(60),
    aVista: z.boolean(),
  }),
  PrepaymentBase.extend({
    meio: MeioSchema.exclude(['03', '04', '17', '18', '99']),
    aVista: z.literal(true),
  }),
])

export const PagamentosSchema = z.object({
  troco: NumberSchema,
  itens: z.array(PagamentoSchema),
})

export type Pagamento = z.infer<typeof PagamentosSchema>
