import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioInutilizacao, EnvioInutilizacaoSchema, RetornoInutilizacao, RetornoInutilizacaoSchema } from "../../dtos";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class InutilizarNfe {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioInutilizacao): Promise<RetornoInutilizacao> {
    const parsedData = EnvioInutilizacaoSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<EnvioInutilizacao, RetornoInutilizacao>('/nfe/inutilizar', parsedData.data);
    return RetornoInutilizacaoSchema.parse(response);
  }
}