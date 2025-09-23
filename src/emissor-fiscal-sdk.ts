import { Credenciais } from "./api/credenciais-api";
import { EmissorFiscalApi } from "./api/emissor-fiscal-api.service";
import { NfceService } from "./services/nfce.service";
import { NfeService } from "./services/nfe.service";
import { VerificarStatusServidor } from "./use-cases/verifica-status";

export class EmissorFiscalSDK {

  private nfceService: NfceService;
  private nfeService: NfeService;
  private api: EmissorFiscalApi

  constructor(credenciais: Credenciais) {
    this.api = new EmissorFiscalApi(credenciais);
    this.nfceService = new NfceService(this.api);
    this.nfeService = new NfeService(this.api);
  }

  public get nfce() {
    return this.nfceService;
  }

  public get nfe() {
    return this.nfeService;
  }

  public status() {
    return new VerificarStatusServidor(this.api).executa();
  }

}
