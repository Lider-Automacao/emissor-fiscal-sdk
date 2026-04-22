import { NfseRetornoConsultaDps, NfseRetornoConsultaDpsSchema } from "../..";
import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import {
  NfseEnvioConsultaPorDps,
  NfseEnvioConsultaPorDpsSchema,
} from "../../dtos/nfse/nfse-envio-consulta-por-dps";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";

export class ConsultarNfsePorDps {
  private readonly api: EmissorFiscalApi;

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(
    request: NfseEnvioConsultaPorDps,
  ): Promise<NfseRetornoConsultaDps> {
    const parsedData = NfseEnvioConsultaPorDpsSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError(
        "Dados de envio inválidos",
        parsedData.error,
      );
    }

    const response = await this.api.post<
      NfseEnvioConsultaPorDps,
      NfseRetornoConsultaDps
    >("/nfse/consultar/dps", parsedData.data);
    return NfseRetornoConsultaDpsSchema.parse(response);
  }
}
