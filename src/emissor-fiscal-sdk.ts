import { Credenciais } from "./api/credenciais-api";
import { EmissorFiscalApi } from "./api/emissor-fiscal-api.service";
import { NfceService, NfeService, NfseService } from "./services";
import { VerificarStatusServidor } from "./use-cases/verifica-status";

export class EmissorFiscalSDK {

  private readonly nfceService: NfceService;
  private readonly nfeService: NfeService;
  private readonly nfseService: NfseService;
  private readonly api: EmissorFiscalApi

  constructor(credenciais: Credenciais) {
    this.api = new EmissorFiscalApi(credenciais);
    this.nfceService = new NfceService(this.api);
    this.nfeService = new NfeService(this.api);
    this.nfseService = new NfseService(this.api);
  }

  public get nfce() {
    return this.nfceService;
  }

  public get nfe() {
    return this.nfeService;
  }

  public get nfse() {
    return this.nfseService;
  }

  public status() {
    return new VerificarStatusServidor(this.api).executa();
  }

}
