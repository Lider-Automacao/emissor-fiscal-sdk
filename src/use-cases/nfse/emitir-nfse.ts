import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { NfseEnvioEmitir, NfseEnvioEmitirSchema } from "../../dtos/nfse/nfse-envio-emitir";
import { NfseRetornoEmitir, NfseRetornoEmitirSchema } from "../../dtos/nfse/nfse-retorno-emitir";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class EmitirNfse {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: NfseEnvioEmitir): Promise<NfseRetornoEmitir> {
    const parsedData = NfseEnvioEmitirSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<NfseEnvioEmitir, NfseRetornoEmitir>('/nfse/emitir', parsedData.data);

    return NfseRetornoEmitirSchema.parse(response);
  }
}