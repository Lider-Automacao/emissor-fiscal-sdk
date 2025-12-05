import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { NfseEnvioImpressao, NfseEnvioImpressaoSchema } from "../../dtos/nfse/nfse-envio-impressao";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class ImprimirNfse {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: NfseEnvioImpressao): Promise<Buffer> {
    const parsedData = NfseEnvioImpressaoSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    try {
      const response = await this.api.post<NfseEnvioImpressao, any>('/nfse/imprimir', parsedData.data, {
        responseType: 'arraybuffer',
      });

      return Buffer.from(response, 'binary')

    } catch (error) {
      if (error instanceof Error) {
        throw new EmissorFiscalError(`Falha ao fazer download da NFSe: ${error.message}`, error);
      }

      throw new EmissorFiscalError("Ocorreu um erro desconhecido durante o download da NFSe.", error);
    }
  }
}