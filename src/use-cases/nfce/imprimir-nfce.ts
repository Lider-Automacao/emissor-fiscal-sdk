import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioImpressao, EnvioImpressaoSchema } from "../../models";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class ImprimirNfce {
  private api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioImpressao): Promise<Array<Buffer>> {
    const parsedData = EnvioImpressaoSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post('/nfce/imprimir', parsedData.data);
  }
}