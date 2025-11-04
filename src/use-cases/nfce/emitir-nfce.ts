import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioNfceApi, EnvioNfceApiSchema, RetornoEnvioApi, RetornoEnvioApiSchema } from "../../models";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class EmitirNfce {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioNfceApi): Promise<RetornoEnvioApi> {
    const parsedData = EnvioNfceApiSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post('/nfce/emitir', parsedData.data);
    return RetornoEnvioApiSchema.parse(response);
  }
}