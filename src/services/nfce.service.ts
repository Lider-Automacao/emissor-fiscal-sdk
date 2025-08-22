import { EmissorFiscalApi } from "@/api/emissor-fiscal-api.service";
import { EnvioCancelamento, EnvioConsulta, EnvioImpressao, EnvioInutilizacao, EnvioNfceApi } from "@/models";
import { CalculaNfce, CalculaRequest, CancelarNfce, ConsultarNfce, EmitirNfce, GerarNfce, ImprimirNfce, InutilizarNfce } from "@/use-cases/nfce";

export class NfceService {

  constructor(private api: EmissorFiscalApi) { }

  public async calcular(request: CalculaRequest) {
    return new CalculaNfce(this.api).executa(request);
  }

  public async cancelar(request: EnvioCancelamento) {
    return new CancelarNfce(this.api).executa(request);
  }

  public async consultar(request: EnvioConsulta) {
    return new ConsultarNfce(this.api).executa(request);
  }

  public async emitir(request: EnvioNfceApi) {
    return new EmitirNfce(this.api).executa(request);
  }

  public async gerar(request: EnvioNfceApi) {
    return new GerarNfce(this.api).executa(request);
  }

  public async imprimir(request: EnvioImpressao) {
    return new ImprimirNfce(this.api).executa(request);
  }

  public async inutilizar(request: EnvioInutilizacao) {
    return new InutilizarNfce(this.api).executa(request);
  }

}