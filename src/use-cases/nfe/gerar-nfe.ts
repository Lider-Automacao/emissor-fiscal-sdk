import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioNfeApi, EnvioNfeApiSchema } from "../../dtos";
import { Xml } from "../../types";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class GerarNfe {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioNfeApi): Promise<Xml> {
    const parsedData = EnvioNfeApiSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post<EnvioNfeApi, Xml>('/nfe/gerar', parsedData.data);
  }
}