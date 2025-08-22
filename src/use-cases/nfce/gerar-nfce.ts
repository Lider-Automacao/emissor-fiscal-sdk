import { EmissorFiscalApi } from "@/api/emissor-fiscal-api.service";
import { EnvioNfceApi, EnvioNfceApiSchema } from "@/models";
import { EmissorFiscalError } from "@/utils/errors/emissor-fiscal.error";


export class GerarNfce {
  private api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioNfceApi): Promise<string> {
    const parsedData = EnvioNfceApiSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post<EnvioNfceApi, string>('/nfce/gerar', parsedData.data);
  }
}