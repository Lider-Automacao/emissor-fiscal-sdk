import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";

import { NfseEnvioConsultaPorChave, NfseEnvioConsultaPorChaveSchema } from "../../dtos/nfse/nfse-envio-consulta-por-chave";
import { NfseRetornoConsulta, NfseRetornoConsultaSchema } from "../../dtos/nfse/nfse-retorno-consulta";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class ConsultarNfsePorChave {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: NfseEnvioConsultaPorChave): Promise<NfseRetornoConsulta> {
    const parsedData = NfseEnvioConsultaPorChaveSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<NfseEnvioConsultaPorChave, NfseRetornoConsulta>('/nfse/consultar/chave', parsedData.data);
    return NfseRetornoConsultaSchema.parse(response)
  }
}