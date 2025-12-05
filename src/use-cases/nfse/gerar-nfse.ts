import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { NfseEnvioGerar, NfseEnvioGerarSchema } from "../../dtos/nfse/nfse-envio-gerar";
import { NfseRetornoGerar, NfseRetornoGerarSchema } from "../../dtos/nfse/nfse-retorno-gerar";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class GerarNfse {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: NfseEnvioGerar): Promise<NfseRetornoGerar> {
    const parsedData = NfseEnvioGerarSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<NfseEnvioGerar, NfseRetornoGerar>('/nfse/gerar', parsedData.data);

    return NfseRetornoGerarSchema.parse(response);
  }
}