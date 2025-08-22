import { AxiosError, HttpStatusCode } from 'axios';
import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';
import { EmissorFiscalError } from '../../../../src/utils/errors/emissor-fiscal.error';

describe('EmissorFiscalError', () => {
  it('should create an instance with message, originalError, and details', () => {
    const err = new EmissorFiscalError('Test error', new Error('Original'), { foo: 'bar' } as any);
    expect(err).toBeInstanceOf(EmissorFiscalError);
    expect(err.message).toBe('Test error');
    expect(err.originalError).toBeInstanceOf(Error);
    expect(err.details).toEqual({ foo: 'bar' });
    expect(err.name).toBe('EmissorFiscalError');
  });

  it('should create an instance with only message', () => {
    const err = new EmissorFiscalError('Only message');
    expect(err.message).toBe('Only message');
    expect(err.originalError).toBeNull();
    expect(err.details).toBeNull();
  });

  it('fromApiResponse should extract data from AxiosError', () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        status: 404,
        data: { statusCode: 404, message: 'Not found' }
      }
    } as AxiosError;
    const err = EmissorFiscalError.fromApiResponse(axiosError);
    expect(err).toBeInstanceOf(EmissorFiscalError);
    expect(err.originalError).toBe(axiosError);

    expect(err.details?.apiResponse).toEqual({ statusCode: 404, message: 'Not found' });
    expect(err.details?.statusCode).toEqual(404);
    expect(err.details?.message).toEqual('Not found');
    expect(err.details?.description).toBeUndefined();
  });

  it('fromApiResponse should extract data from api error', () => {
    const axiosError = {
      isAxiosError: true,
      response: {
        status: 404,
        data: {
          "error": "0",
          "unit": "Erro na emissão NFCe",
          "detail": "Falha na validação dos dados da nota: 3146"
        }
      }
    } as AxiosError;
    const err = EmissorFiscalError.fromApiResponse(axiosError);
    expect(err).toBeInstanceOf(EmissorFiscalError);
    expect(err.originalError).toBe(axiosError);

    expect(err.details?.statusCode).toEqual(404);
    expect(err.details?.message).toEqual("Erro na emissão NFCe");
    expect(err.details?.description).toEqual("Falha na validação dos dados da nota: 3146");
  });


  it('fromApiResponse should handle missing response', () => {
    const axiosError = {
      isAxiosError: true,
      response: undefined
    } as AxiosError;
    const err = EmissorFiscalError.fromApiResponse(axiosError);

    expect(err.details).toEqual({
      statusCode: 500,
      message: 'InternalServerError',
      description: 'Serviço de NFC-e encontrou problemas para processar a NFC-e. Entre em contato com o suporte',
    });
  });

  it('fromValidation should create a validation error', () => {
    const err = EmissorFiscalError.fromValidation('Invalid input', { field: 'error' });
    expect(err.message).toContain('Validation error: Invalid input');
    expect(err.details).toEqual({ statusCode: 406, message: 'Invalid input', description: { field: 'error' } });
    expect(err.originalError).toBeNull();
  });

  it('fromZodError should create an error from ZodError', () => {
    const schema = z.object({ foo: z.string() });
    const parseResult = schema.safeParse({ foo: 123 });
    const zodError = parseResult.success ? null : parseResult.error;

    const err = EmissorFiscalError.fromZodError('Zod failed', zodError!);
    expect(err.message).toBe('Zod failed');
    expect(err.originalError).toBe(zodError);
    expect(err.details?.statusCode).toBe(HttpStatusCode.NotAcceptable);
    expect(err.details).toBeDefined();
  });
});