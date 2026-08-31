import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioCartaCorrecao, EnvioCartaCorrecaoSchema, RetornoCartaCorrecao, RetornoCartaCorrecaoSchema } from "../../dtos";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class GerarCartaCorrecaoNfe {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioCartaCorrecao): Promise<RetornoCartaCorrecao> {
    const parsedData = EnvioCartaCorrecaoSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<any, RetornoCartaCorrecao>('/nfe/carta-correcao', parsedData.data);
    return RetornoCartaCorrecaoSchema.parse(response);
  }
}
