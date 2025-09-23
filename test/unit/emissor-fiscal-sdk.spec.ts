import { describe, expect, it } from "vitest";
import { Credenciais, EmissorFiscalSDK } from "../../src";

require('dotenv').config()

const credenciais: Credenciais = {
  url: process.env.EMISSOR_FISCAL_URL ?? '',
  usuario: process.env.EMISSOR_FISCAL_USUARIO ?? '',
  senha: process.env.EMISSOR_FISCAL_SENHA ?? '',
}

describe("EmissorFiscalSDK", () => {
  it("Deve criar a instancia corretamente", async () => {
    const sdk = new EmissorFiscalSDK(credenciais);
    expect(sdk).toBeDefined();
  });

  it("Deve acessar o serviço de NFe", async () => {
    const sdk = new EmissorFiscalSDK(credenciais);
    expect(sdk.nfe).toBeDefined();
  });

  it("Deve acessar o serviço de NFCe", async () => {
    const sdk = new EmissorFiscalSDK(credenciais);
    expect(sdk.nfce).toBeDefined();
  });


});
