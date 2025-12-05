import { EmissorFiscalApi } from "../api/emissor-fiscal-api.service";
import { CalculaNfseRequest } from "../dtos";
import { NfseEnvioCancelamento } from "../dtos/nfse/nfse-envio-cancelamento";
import { NfseEnvioConsultaPorChave } from "../dtos/nfse/nfse-envio-consulta-por-chave";
import { NfseEnvioConsultaPorRps } from "../dtos/nfse/nfse-envio-consulta-por-rps";
import { NfseEnvioEmitir } from "../dtos/nfse/nfse-envio-emitir";
import { NfseEnvioEnviarEmail } from "../dtos/nfse/nfse-envio-enviar-email";
import { NfseEnvioGerar } from "../dtos/nfse/nfse-envio-gerar";
import { NfseEnvioImpressao } from "../dtos/nfse/nfse-envio-impressao";
import { CalculaNfse, CancelarNfse, ConsultarNfsePorChave, ConsultarNfsePorRps, EmitirNfse, EnviarNfsePorEmail, GerarNfse, ImprimirNfse } from "../use-cases/nfse";

export class NfseService {

  constructor(private readonly api: EmissorFiscalApi) { }

  public async calcular(request: CalculaNfseRequest) {
    const usecase = new CalculaNfse(this.api)
    return usecase.executa(request);
  }

  public async cancelar(request: NfseEnvioCancelamento) {
    const usecase = new CancelarNfse(this.api)
    return usecase.executa(request);
  }

  public async consultarNfsePorChave(request: NfseEnvioConsultaPorChave) {
    const usecase = new ConsultarNfsePorChave(this.api)
    return usecase.executa(request);
  }

  public async consultarNfsePorRps(request: NfseEnvioConsultaPorRps) {
    const usecase = new ConsultarNfsePorRps(this.api)
    return usecase.executa(request);
  }

  public async emitir(request: NfseEnvioEmitir) {
    const usecase = new EmitirNfse(this.api)
    return usecase.executa(request);
  }

  public async gerar(request: NfseEnvioGerar) {
    const usecase = new GerarNfse(this.api)
    return usecase.executa(request);
  }

  public async imprimir(request: NfseEnvioImpressao) {
    const usecase = new ImprimirNfse(this.api)
    return usecase.executa(request);
  }

  public async enviarPorEmail(request: NfseEnvioEnviarEmail): Promise<void> {
    const usecase = new EnviarNfsePorEmail(this.api)
    return usecase.executa(request);
  }
}