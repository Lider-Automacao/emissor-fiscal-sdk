import * as z from 'zod';
import { CombustivelSchema } from '../models';
import { CSOSNSchema } from '../models/CSOSNSchema';
import { CSTSchema } from '../models/CSTSchema';
import { NullishString, StringSomenteNumeros } from '../types';

const QuantidadeSchema = z.object({
  comercial: z.number().nonnegative('Quantidade comercial deve ser um número positivo.'),
  tributavel: z.number().nonnegative('Quantidade tributável deve ser um número positivo.'),
}).describe('Informações de Quantidade');

const UnidadeSchema = z.object({
  comercial: z.string().min(1, 'Unidade comercial é obrigatória.'),
  tributavel: z.string().min(1, 'Unidade tributável é obrigatória.'),
}).describe('Informações de Unidade (e.g., UN, KG, LT)');

const ValorUnitarioSchema = z.object({
  comercial: z.number().positive('Valor unitário comercial deve ser maior que zero.'),
  tributavel: z.number().positive('Valor unitário tributável deve ser maior que zero.'),
}).describe('Valor unitário comercial e tributável do item.');


export const PedidoItemSchema = z.object({
  controleItem: z.number().int(),
  codigo: z.number().int(),
  codigoBarras: NullishString.default('SEM GTIN'),
  descricao: z.string().min(1, 'A descrição do item é obrigatória.'),
  ncm: StringSomenteNumeros.pipe(z.string().length(8, 'NCM deve ter 8 dígitos.')),
  exTipi: z.string(),
  cest: StringSomenteNumeros.nullish(),
  cfop: StringSomenteNumeros.pipe(z.string().length(4, 'CFOP deve ter 4 dígitos.')),
  valorBruto: z.number().nonnegative(),
  compoeTotal: z.boolean(),
  valorFrete: z.number().nonnegative(),
  valorSeguro: z.number().nonnegative(),
  valorDesconto: z.number().nonnegative(),
  valorOutros: z.number().nonnegative(),
  valorLiquido: z.number().nonnegative(),
  origem: z.string().length(1, 'Origem deve ter 1 caractere.'),
  cst: z.union([CSTSchema, CSOSNSchema]),
  aliquota: z.number().nonnegative(),
  aliquotaSt: z.number().nonnegative(),
  aliquotaSuperSimples: z.number().nonnegative(),
  percentualReducao: z.number().nonnegative(),
  cstPis: StringSomenteNumeros.pipe(z.string().length(2, 'CST PIS deve ter 2 caracteres.')),
  aliquotaPis: z.number().nonnegative(),
  cstCofins: StringSomenteNumeros.pipe(z.string().length(2, 'CST COFINS deve ter 2 caracteres.')),
  aliquotaCofins: z.number().nonnegative(),
  valorAproximadoTributos: z.number().nonnegative(),
  removeIcmsBasePisCofins: z.boolean(),

  unidade: UnidadeSchema,
  quantidade: QuantidadeSchema,
  valorUnitario: ValorUnitarioSchema,

  codigoBeneficioFiscal: z.string().nullable().optional(),
  combustivel: CombustivelSchema.nullable().optional(),
  aliquotaAdRemRetido: z.number().nullable().optional(),
  aliquotaFcp: z.number().nullable().optional(),

  destinatarioUF: z.string()
    .uppercase()
    .trim()
    .length(2, 'UF do Destinatario deve ter 2 caracteres.')
    .nullable().optional(),

  emitenteUF: z.string()
    .uppercase()
    .trim()
    .length(2, 'UF do Destinatario deve ter 2 caracteres.')
    .nullable().optional(),

  // --- Nova Tributação (IBS/CBS) - Campos Simples ---
  cstIBSCBS: z.string().min(1).nullable().optional(),
  classTribIBSCBS: z.string().min(1).nullable().optional(),
  aliquotaIBSEst: z.number().nonnegative().nullable().optional(),
  percRedIBS: z.number().nonnegative().nullable().optional(),
  aliquotaCBS: z.number().nonnegative().nullable().optional(),
  aliquotaIBSMun: z.number().nonnegative().nullable().optional(),
  percRedCBS: z.number().nonnegative().nullable().optional(),

  // --- Nova Tributação (IBS/CBS) - Regime Regular (Reg) ---
  cstReg: z.string().min(1).nullable().optional(),
  classTribReg: z.string().min(1).nullable().optional(),
  aliqEfetRegIBSEst: z.number().nonnegative().nullable().optional(),
  aliqEfetRegIBSMun: z.number().nonnegative().nullable().optional(),
  aliqEfetRegCBS: z.number().nonnegative().nullable().optional(),
}).describe('Schema para Item de Pedido');

export type PedidoItem = z.infer<typeof PedidoItemSchema>
