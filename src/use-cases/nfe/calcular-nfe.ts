import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { CalculaNfeRequest, CalculaNfeResponse, RequestNFeSchema } from "../../dtos/calcular-nfe-params";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";

export class CalculaNfe {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: CalculaNfeRequest): Promise<CalculaNfeResponse> {
    const parsedData = RequestNFeSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post<CalculaNfeRequest, CalculaNfeResponse>('/nfe/calcular', parsedData.data);
  }
}