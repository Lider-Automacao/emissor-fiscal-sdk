import { EmissorFiscalApi } from "../api/emissor-fiscal-api.service";
import { CalculaNfeRequest, EnvioCancelamento, EnvioConsulta, EnvioImpressao, EnvioInutilizacao, EnvioNfeApi } from "../dtos";
import { CalculaNfe, CancelarNfe, ConsultarNfe, EmitirNfe, GerarNfe, ImprimirNfe, InutilizarNfe } from "../use-cases";

export class NfeService {

  constructor(private readonly api: EmissorFiscalApi) { }

  public async calcular(request: CalculaNfeRequest) {
    const usecase = new CalculaNfe(this.api)
    return usecase.executa(request);
  }

  public async cancelar(request: EnvioCancelamento) {
    const usecase = new CancelarNfe(this.api)
    return usecase.executa(request);
  }

  public async consultar(request: EnvioConsulta) {
    const usecase = new ConsultarNfe(this.api)
    return usecase.executa(request);
  }

  public async emitir(request: EnvioNfeApi) {
    const usecase = new EmitirNfe(this.api)
    return usecase.executa(request);
  }

  public async gerar(request: EnvioNfeApi) {
    const usecase = new GerarNfe(this.api)
    return usecase.executa(request);
  }

  public async imprimir(request: EnvioImpressao) {
    const usecase = new ImprimirNfe(this.api)
    return usecase.executa(request);
  }

  public async inutilizar(request: EnvioInutilizacao) {
    const usecase = new InutilizarNfe(this.api)
    return usecase.executa(request);
  }

}