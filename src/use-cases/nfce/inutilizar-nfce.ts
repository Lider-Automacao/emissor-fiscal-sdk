import { EmissorFiscalApi } from "@/api/emissor-fiscal-api.service";
import { EnvioInutilizacao, EnvioInutilizacaoSchema, RetornoInutilizacao } from "@/models";
import { EmissorFiscalError } from "@/utils/errors/emissor-fiscal.error";


export class InutilizarNfce {
  private api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioInutilizacao): Promise<Array<RetornoInutilizacao>> {
    const parsedData = EnvioInutilizacaoSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post('/nfce/inutilizar', parsedData.data);
  }
}