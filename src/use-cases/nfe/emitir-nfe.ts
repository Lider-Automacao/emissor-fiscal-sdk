import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioNfeApi, EnvioNfeApiSchema, RetornoEnvioApi } from "../../models";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class EmitirNfe {
  private api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioNfeApi): Promise<RetornoEnvioApi> {
    const parsedData = EnvioNfeApiSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post('/nfe/emitir', parsedData.data);
  }
}