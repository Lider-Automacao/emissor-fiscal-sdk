import { EmissorFiscalApi } from "../api/emissor-fiscal-api.service";


export class VerificarStatusServidor {
  private api: EmissorFiscalApi

  constructor(api: EmissorFiscalApi) {
    this.api = api;
  }

  async executa(): Promise<{ status: string }> {
    try {
      await this.api.get('/');
      return { status: 'OK' };
    } catch (e) {
      return { status: 'NOK' };
    }
  }
}