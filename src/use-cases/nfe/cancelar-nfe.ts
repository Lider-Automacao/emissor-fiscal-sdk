import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioCancalamentoSchema, EnvioCancelamento, RetornoCancelamento } from "../../models";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class CancelarNfe {
  private api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioCancelamento): Promise<RetornoCancelamento> {
    const parsedData = EnvioCancalamentoSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    return this.api.post('/nfe/cancelar', parsedData.data);
  }
}