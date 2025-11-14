import { z } from 'zod';
import { NumberSchema } from '../../types';
import { CSOSNSchema } from '../CSOSNSchema';
import { CSTSchema } from '../CSTSchema';
import { Cbs, CbsSchema } from './cbs';
import { CbsCreditoPresumido, CbsCreditoPresumidoSchema } from './cbs_credito_presumido';
import { CompraGovernamentalItem, CompraGovernamentalItemSchema } from './compra_governamental_item';
import { CreditoPresumidoZfm, CreditoPresumidoZfmSchema } from './credito_presumido_zfm';
import { IbsCreditoPresumido, IbsCreditoPresumidoSchema } from './ibs_credito_presumido';
import { Monofasico, MonofasicoSchema } from './monofasico';
import { Municipio, MunicipioSchema } from './municipio';
import { TransferenciaCredito, TransferenciaCreditoSchema } from './transferencia_credito';
import { TributacaoRegular, TributacaoRegularSchema } from './tributacao_regular';
import { Uf, UfSchema } from './uf';


const IbsCbsSchema = z.object({
  cst: z.union([CSTSchema, CSOSNSchema]),
  classificacao: z.string().trim().nonempty(),
  valorIbs: NumberSchema.default(0)
    .nullable()
    .optional(),
  baseCalculo: NumberSchema.default(0)
    .nullable()
    .optional(),
  uf: UfSchema
    .nullable()
    .optional(),
  municipio: MunicipioSchema
    .nullable()
    .optional(),

  cbs: CbsSchema
    .nullable()
    .optional(),

  tributacaoRegular: TributacaoRegularSchema
    .nullable()
    .optional(),

  monofasico: MonofasicoSchema
    .nullable()
    .optional(),

  transferenciaCredito: TransferenciaCreditoSchema
    .nullable()
    .optional(),

  creditoPresumidoZfm: CreditoPresumidoZfmSchema
    .nullable()
    .optional(),

  ibsCreditoPresumido: IbsCreditoPresumidoSchema
    .nullable()
    .optional(),

  cbsCreditoPresumido: CbsCreditoPresumidoSchema
    .nullable()
    .optional(),

  compraGovernamentalItem: CompraGovernamentalItemSchema
    .nullable()
    .optional(),
});

type IbsCbs = z.infer<typeof IbsCbsSchema> & {
  uf?: Uf | null;
  municipio?: Municipio | null;
  cbs?: Cbs | null;
  tributacaoRegular?: TributacaoRegular | null;
  monofasico?: Monofasico | null;
  transferenciaCredito?: TransferenciaCredito | null;
  creditoPresumidoZfm?: CreditoPresumidoZfm | null;
  ibsCreditoPresumido?: IbsCreditoPresumido | null;
  cbsCreditoPresumido?: CbsCreditoPresumido | null;
  compraGovernamentalItem?: CompraGovernamentalItem | null;
};

export { IbsCbs, IbsCbsSchema };

