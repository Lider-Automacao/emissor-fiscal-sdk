// src/utils/sdkError.ts

import { AxiosError, HttpStatusCode } from 'axios';
import * as zPT from 'zod/v4';
import { ZodError, flattenError } from 'zod/v4';
import { EmissorApiError } from './emissor-api.error';

zPT.config(zPT.locales.pt())


interface EmissorFiscalErrorDetails {
  statusCode?: number;
  message: string;
  description?: any;
  apiResponse?: any;
}

export class EmissorFiscalError extends Error {
  name: string;
  originalError: unknown;
  details: EmissorFiscalErrorDetails | null;

  constructor(message: string, originalError: unknown = null, details: EmissorFiscalErrorDetails | null = null) {
    super(message);
    this.name = EmissorFiscalError.name;
    this.originalError = originalError;
    this.details = details;
    Object.setPrototypeOf(this, EmissorFiscalError.prototype);
  }

  static fromValidation(message: string, validationDetails: any): EmissorFiscalError {
    return new EmissorFiscalError(
      `Validation error: ${message}`,
      null,
      { statusCode: HttpStatusCode.NotAcceptable, message, description: validationDetails, }
    );
  }

  static fromZodError(message: string, exception: ZodError): EmissorFiscalError {
    return new EmissorFiscalError(
      message,
      exception,
      {
        statusCode: HttpStatusCode.NotAcceptable,
        message,
        description: flattenError(exception)
      }
    );
  }

  static fromApiResponse(error: AxiosError): EmissorFiscalError {

    const status = error.response?.status || HttpStatusCode.InternalServerError;

    if (error.code === 'ECONNREFUSED') {
      return new EmissorFiscalError(error.message, error, {
        statusCode: HttpStatusCode.ServiceUnavailable,
        apiResponse: error.response?.data,
        message: 'Connection to fiscal service refused',
        description: 'Serviço de emissão fiscal indisponível. Tente novamente mais tarde.',
      });
    }

    if (error.code === 'ENOTFOUND') {
      return new EmissorFiscalError(error.message, error, {
        statusCode: HttpStatusCode.ServiceUnavailable,
        apiResponse: error.response?.data,
        message: 'Fiscal service host not found (DNS error)',
        description: 'Serviço de emissão fiscal indisponível. Tente novamente mais tarde.',
      });
    }

    if (status < HttpStatusCode.InternalServerError) {
      const data = error.response?.data || {
        statusCode: status,
        message: error.message,
      };

      const apiError = new EmissorApiError(data);

      return new EmissorFiscalError(apiError.message ?? error.message, error, {
        statusCode: status,
        apiResponse: data,
        message: apiError.message ?? error.message,
        description: apiError.description,
      });
    }

    const message = error.message || HttpStatusCode[status].toString() || 'Unknown error in the API request.';
    switch (status) {
      case HttpStatusCode.InternalServerError:
        return new EmissorFiscalError(error.message, error, {
          statusCode: status,
          apiResponse: error.response?.data,
          message,
          description: 'Serviço de NFC-e encontrou problemas para processar a NFC-e. Entre em contato com o suporte'
        });
      case HttpStatusCode.ServiceUnavailable:
        return new EmissorFiscalError(error.message, error, {
          statusCode: status,
          apiResponse: error.response?.data,
          message,
          description: 'O serviço de NFC-e está temporariamente indisponível. Tente novamente mais tarde'
        });
      case HttpStatusCode.GatewayTimeout:
        return new EmissorFiscalError(error.message, error, {
          statusCode: status,
          apiResponse: error.response?.data,
          message,
          description: 'O servidor de NFC-e demorou muito para responder. Aguarde e tente novamente'
        });
      default:
        return new EmissorFiscalError(error.message, error, {
          statusCode: status,
          apiResponse: error.response?.data,
          message,
          description: 'Erro desconhecido na requisição à API. Entre em contato com o suporte'
        });
    }
  }


}


