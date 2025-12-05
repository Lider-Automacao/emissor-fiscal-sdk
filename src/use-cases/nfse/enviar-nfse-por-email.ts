import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { NfseEnvioEmitir, NfseEnvioEmitirSchema } from "../../dtos/nfse/nfse-envio-emitir";
import { NfseEnvioEnviarEmail } from "../../dtos/nfse/nfse-envio-enviar-email";
import { NfseRetornoEmitir } from "../../dtos/nfse/nfse-retorno-emitir";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class EnviarNfsePorEmail {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: NfseEnvioEnviarEmail): Promise<void> {
    const parsedData = NfseEnvioEmitirSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    await this.api.post<NfseEnvioEmitir, NfseRetornoEmitir>('/nfse/enviar-por-email', parsedData.data);
  }
}