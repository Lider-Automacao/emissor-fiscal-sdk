import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioNfceApi, EnvioNfceApiSchema } from "../../models";
import { Xml } from "../../types";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class GerarNfce {
  private api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioNfceApi): Promise<Xml> {
    const parsedData = EnvioNfceApiSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post<EnvioNfceApi, Xml>('/nfce/gerar', parsedData.data);
  }
}