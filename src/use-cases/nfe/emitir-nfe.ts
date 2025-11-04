import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioNfeApi, EnvioNfeApiSchema, RetornoEnvioApi, RetornoEnvioApiSchema } from "../../models";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class EmitirNfe {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioNfeApi): Promise<RetornoEnvioApi> {
    const parsedData = EnvioNfeApiSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<EnvioNfeApi, RetornoEnvioApi>('/nfe/emitir', parsedData.data);
    return RetornoEnvioApiSchema.parse({ ...response, data: response.data ?? new Date(), });
  }
}