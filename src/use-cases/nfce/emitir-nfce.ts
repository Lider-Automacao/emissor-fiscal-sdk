import { EmissorFiscalApi } from "@/api/emissor-fiscal-api.service";
import { EnvioNfceApi, EnvioNfceApiSchema, RetornoNfceApi } from "@/models";
import { EmissorFiscalError } from "@/utils/errors/emissor-fiscal.error";


export class EmitirNfce {
  private api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioNfceApi): Promise<RetornoNfceApi> {
    const parsedData = EnvioNfceApiSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post('/nfce/emitir', parsedData.data);
  }
}