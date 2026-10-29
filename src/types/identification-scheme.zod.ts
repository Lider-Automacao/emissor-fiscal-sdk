import { CNPJ, CPF } from '@raicampos/toolkit';
import z from 'zod';

const TAMANHO_CNPJ = 14;
const MENSAGEM = 'O documento (CNPJ/CPF) é inválido';

function documentoValido(valor: string): boolean {
  const cnpj = new CNPJ(valor);
  if (cnpj.stripped.length === TAMANHO_CNPJ) return cnpj.isValid;
  return new CPF(valor.replace(/\D/g, '')).isValid;
}

export const CPF_CNPJ_SCHEME = z
  .string({ error: MENSAGEM })
  .trim()
  .nonempty({ message: MENSAGEM })
  .refine(documentoValido, {
    message: MENSAGEM,
    params: { code: MENSAGEM },
  });
