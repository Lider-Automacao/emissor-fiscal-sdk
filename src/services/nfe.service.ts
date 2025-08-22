import { EmissorFiscalApi } from "@/api/emissor-fiscal-api.service";
import { EnvioCancelamento, EnvioConsulta, EnvioImpressao, EnvioInutilizacao } from "@/models";
import { CalculaRequest } from "@/use-cases/nfce";

export class NfeService {

  constructor(private api: EmissorFiscalApi) { }

  public async calcular(request: CalculaRequest) {
    throw new Error("Method not implemented.");
  }

  public async cancelar(request: EnvioCancelamento) {
    throw new Error("Method not implemented.");
  }

  public async consultar(request: EnvioConsulta) {
    throw new Error("Method not implemented.");
  }

  public async emitir(request: unknown) {
    throw new Error("Method not implemented.");
  }

  public async gerar(request: unknown) {
    throw new Error("Method not implemented.");
  }

  public async imprimir(request: EnvioImpressao) {
    throw new Error("Method not implemented.");
  }

  public async inutilizar(request: EnvioInutilizacao) {
    throw new Error("Method not implemented.");
  }

}