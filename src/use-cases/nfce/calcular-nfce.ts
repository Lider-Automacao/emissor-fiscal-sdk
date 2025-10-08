import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { CalculaNfceRequest, CalculaNfceResponse, RequestNFCeSchema } from "../../dtos/calcular-nfce-params";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";

export class CalculaNfce {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: CalculaNfceRequest): Promise<CalculaNfceResponse> {
    const parsedData = RequestNFCeSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post<CalculaNfceRequest, CalculaNfceResponse>('/nfce/calcular', parsedData.data);
  }
}