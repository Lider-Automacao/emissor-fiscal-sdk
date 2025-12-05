import { coalesce } from "@raicamposs/toolkit";
import { EmissorFiscalApi } from "../../api/emissor-fiscal-api.service";
import { EnvioConsulta, EnvioConsultaSchema, RetornoConsulta, RetornoConsultaSchema } from "../../dtos";
import { EmissorFiscalError } from "../../utils/errors/emissor-fiscal.error";


export class ConsultarNfe {
  private readonly api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(request: EnvioConsulta): Promise<RetornoConsulta> {
    const parsedData = EnvioConsultaSchema.safeParse(request);

    if (!parsedData.success) {
      throw EmissorFiscalError.fromZodError("Dados de envio inválidos", parsedData.error);
    }

    const response = await this.api.post<EnvioConsulta, RetornoConsulta>('/nfe/consultar', parsedData.data);

    const { dados } = parsedData.data;

    return RetornoConsultaSchema.parse({
      data: response.data,
      status: response.status,
      xml: coalesce(response.xml, dados.xml),
      chaveAcesso: coalesce(response.chaveAcesso, dados.chaveAcesso),
      protocolo: response.protocolo,
    })
  }
}