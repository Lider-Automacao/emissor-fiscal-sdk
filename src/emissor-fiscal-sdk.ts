import { Credenciais } from "./api/credenciais-api";
import { EmissorFiscalApi } from "./api/emissor-fiscal-api.service";
import { NfceService } from "./services/nfce.service";
import { NfeService } from "./services/nfe.service";

export class EmissorFiscalSDK {

  private nfceService: NfceService;
  private nfeService: NfeService;

  constructor(credenciais: Credenciais) {
    const api = new EmissorFiscalApi(credenciais);
    this.nfceService = new NfceService(api);
    this.nfeService = new NfeService(api);
  }

  public get nfce() {
    return this.nfceService;
  }

  public get nfe() {
    return this.nfeService;
  }

}
