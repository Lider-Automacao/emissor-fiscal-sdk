
import { CNPJ, CPF, isNullOrUndefined } from '@raicamposs/toolkit';
import z from 'zod';

//O documento (CNPJ/CPF) é obrigatório.
export const CPF_CNPJ_SCHEME = z
  .string({ error: 'O documento (CNPJ/CPF) é inválido' })
  .trim()
  .nonempty({ message: 'O documento (CNPJ/CPF) é inválido' })
  .refine(
    (value) => {
      if (isNullOrUndefined(value)) return false;
      if (value.length === 14) {
        return new CNPJ(value).isValid;
      }
      return new CPF(value).isValid;
    },
    {
      message: 'O documento (CNPJ/CPF) é inválido',
      params: {
        code: 'O documento (CNPJ/CPF) é inválido',
      },
    },
  );
