import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { NfseRetornoCancelamento, NfseRetornoCancelamentoSchema } from "../../dtos";
import { NfseEnvioCancelamentoPorChave, NfseEnvioCancelamentoPorChaveSchema } from "../../dtos/nfse/nfse-envio-cancelamento-por-chave";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class CancelarNfsePorChave {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: NfseEnvioCancelamentoPorChave): Promise<NfseRetornoCancelamento> {
    const parsedData = NfseEnvioCancelamentoPorChaveSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<any, NfseRetornoCancelamento>('/nfse/cancelar', parsedData.data);
    return NfseRetornoCancelamentoSchema.parse(response);
  }


}