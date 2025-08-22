import { EmissorFiscalApi } from "@/api/emissor-fiscal-api.service";
import { NfceItemPropsSchema } from "@/dtos/nfce-item-props";
import { Nfce } from "@/models";
import { EmissorFiscalError } from "@/utils/errors/emissor-fiscal.error";
import z from "zod";


const RequestSchema = z.array(NfceItemPropsSchema)

export type CalculaRequest = z.infer<typeof RequestSchema>
export type CalculaResponse = Pick<Nfce, 'itens' | 'total'>

export class CalculaNfce {
  private api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: CalculaRequest): Promise<CalculaResponse> {
    const parsedData = RequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post<CalculaRequest, CalculaResponse>('/nfce/calcular', parsedData.data);
  }
}