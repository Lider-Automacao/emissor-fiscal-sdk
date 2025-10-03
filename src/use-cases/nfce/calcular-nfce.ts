import z from "zod";
import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { PedidoItemSchema } from "../../dtos";
import { Nfce } from "../../models";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


const RequestSchema = z.array(PedidoItemSchema)

export type CalculaNfceRequest = z.infer<typeof RequestSchema>
export type CalculaNfceResponse = Pick<Nfce, 'itens' | 'total'>

export class CalculaNfce {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: CalculaNfceRequest): Promise<CalculaNfceResponse> {
    const parsedData = RequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post<CalculaNfceRequest, CalculaNfceResponse>('/nfce/calcular', parsedData.data);
  }
}