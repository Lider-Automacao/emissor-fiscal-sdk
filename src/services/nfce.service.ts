import { EmissorFiscalApi } from "../api/emissor-fiscal-api.service";
import { CalculaNfceRequest } from "../dtos";
import { EnvioCancelamento, EnvioConsulta, EnvioImpressao, EnvioInutilizacao, EnvioNfceApi } from "../models";
import { CalculaNfce, CancelarNfce, ConsultarNfce, EmitirNfce, GerarNfce, ImprimirNfce, InutilizarNfce } from "../use-cases/nfce";

export class NfceService {

  constructor(private readonly api: EmissorFiscalApi) { }

  public async calcular(request: CalculaNfceRequest) {
    const usecase = new CalculaNfce(this.api)
    return usecase.executa(request);
  }

  public async cancelar(request: EnvioCancelamento) {
    const usecase = new CancelarNfce(this.api)
    return usecase.executa(request);
  }

  public async consultar(request: EnvioConsulta) {
    const usecase = new ConsultarNfce(this.api)
    return usecase.executa(request);
  }

  public async emitir(request: EnvioNfceApi) {
    const usecase = new EmitirNfce(this.api)
    return usecase.executa(request);
  }

  public async gerar(request: EnvioNfceApi) {
    const usecase = new GerarNfce(this.api)
    return usecase.executa(request);
  }

  public async imprimir(request: EnvioImpressao) {
    const usecase = new ImprimirNfce(this.api)
    return usecase.executa(request);
  }

  public async inutilizar(request: EnvioInutilizacao) {
    const usecase = new InutilizarNfce(this.api)
    return usecase.executa(request);
  }

}