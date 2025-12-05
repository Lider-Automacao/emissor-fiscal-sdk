import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { CalculaNfseRequest, CalculaNfseRequestSchema } from "../../dtos/calcular-nfse-params";
import { NFSe } from "../../models/nfse";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";

export class CalculaNfse {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: CalculaNfseRequest): Promise<NFSe> {
    const parsedData = CalculaNfseRequestSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<CalculaNfseRequest, NFSe>('/nfse/calcular', parsedData.data);
    return response;
  }
}