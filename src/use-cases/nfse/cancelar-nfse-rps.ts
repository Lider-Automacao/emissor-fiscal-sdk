import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { NfseRetornoCancelamento, NfseRetornoCancelamentoSchema } from "../../dtos";
import { NfseEnvioCancelamentoPorRps, NfseEnvioCancelamentoPorRpsSchema } from "../../dtos/nfse/nfse-envio-cancelamento-por-rps";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class CancelarNfsePorRps {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: NfseEnvioCancelamentoPorRps): Promise<NfseRetornoCancelamento> {
    const parsedData = NfseEnvioCancelamentoPorRpsSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<any, NfseRetornoCancelamento>('/nfse/cancelar', parsedData.data);
    return NfseRetornoCancelamentoSchema.parse(response);
  }


}