import { coalesce, isAssigned } from "@raicamposs/toolkit";
import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioCancalamentoSchema, EnvioCancelamento, EnvioConsulta, RetornoCancelamento, RetornoConsulta } from "../../models";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class CancelarNfe {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioCancelamento): Promise<RetornoCancelamento> {
    const parsedData = EnvioCancalamentoSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    try {
      const response = await this.api.post<any, RetornoCancelamento>('/nfe/cancelar', parsedData.data);
      const { dados } = parsedData.data;
      return {
        ...response,
        protocolo: coalesce(response.protocolo, dados.protocolo),
      };
    } catch (error) {
      if (!(error instanceof EmissorFiscalError)) {
        throw error;
      }

      const errorCode = typeof error.details?.apiResponse === 'object' && isAssigned(error.details?.apiResponse?.error);
      if (Number(errorCode) === 573) {
        return this.consultar(request);
      }

      throw error;
    }
  }


  private async consultar({ configuracoes, dados }: EnvioCancelamento): Promise<RetornoCancelamento> {
    const data: EnvioConsulta = {
      configuracoes,
      dados: {
        chaveAcesso: dados.chaveAcesso,
        xml: dados.xml,
      },
    };
    const response = await this.api.post<any, RetornoConsulta>('/nfe/consultar', data);
    return {
      data: response.data ?? new Date(),
      status: response.status,
      evento: '',
      protocolo: coalesce(response.protocolo, dados.protocolo),
    }
  }
}