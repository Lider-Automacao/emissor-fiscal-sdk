import z from "zod";
import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { PedidoItemSchema } from "../../dtos/pedido-item";
import { Nfe } from "../../models";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


const RequestSchema = z.array(PedidoItemSchema)

export type CalculaNfeRequest = z.infer<typeof RequestSchema>
export type CalculaNfeResponse = Pick<Nfe, 'itens' | 'total'>

export class CalculaNfe {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: CalculaNfeRequest): Promise<CalculaNfeResponse> {
    const parsedData = RequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post<CalculaNfeRequest, CalculaNfeResponse>('/nfe/calcular', parsedData.data);
  }
}