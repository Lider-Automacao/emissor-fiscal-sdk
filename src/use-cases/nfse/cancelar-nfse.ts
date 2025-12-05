import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { NfseEnvioCancelamento, NfseEnvioCancelamentoSchema } from "../../dtos/nfse/nfse-envio-cancelamento";
import { RetornoCancelamento, RetornoCancelamentoSchema } from "../../models";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class CancelarNfse {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: NfseEnvioCancelamento): Promise<RetornoCancelamento> {
    const parsedData = NfseEnvioCancelamentoSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<any, RetornoCancelamento>('/nfse/cancelar', parsedData.data);
    return RetornoCancelamentoSchema.parse(response);
  }


}