import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { NfseEnvioConsultaPorRps, NfseEnvioConsultaPorRpsSchema } from "../../dtos/nfse/nfse-envio-consulta-por-rps";
import { NfseRetornoConsulta, NfseRetornoConsultaSchema } from "../../dtos/nfse/nfse-retorno-consulta";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class ConsultarNfsePorRps {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: NfseEnvioConsultaPorRps): Promise<NfseRetornoConsulta> {
    const parsedData = NfseEnvioConsultaPorRpsSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<NfseEnvioConsultaPorRps, NfseRetornoConsulta>('/nfse/consultar/rps', parsedData.data);
    return NfseRetornoConsultaSchema.parse(response)
  }
}