// src/utils/sdkError.ts

import { AxiosError, HttpStatusCode } from 'axios';
import * as zPT from 'zod/v4';
import { ZodError, flattenError } from 'zod/v4';

zPT.config(zPT.locales.pt())


interface EmissorFiscalErrorDetails {
  statusCode?: number;
  apiResponse?: any;
  details?: any;
}

export class EmissorFiscalError extends Error {
  name: string;
  originalError: Error | AxiosError | null;
  details: EmissorFiscalErrorDetails | null;

  constructor(message: string, originalError: Error | AxiosError | null = null, details: EmissorFiscalErrorDetails | null = null) {
    super(message);
    this.name = EmissorFiscalError.name;
    this.originalError = originalError;
    this.details = details;
    Object.setPrototypeOf(this, EmissorFiscalError.prototype);
  }

  static fromApiResponse(error: AxiosError): EmissorFiscalError {
    const status = error.response?.status;

    const data = error.response?.data || {
      statusCode: status ?? 500,
      message: 'No response data available'
    };

    let message = 'Unknown error in the API request.';

    return new EmissorFiscalError(message, error, data);
  }

  static fromValidation(message: string, validationDetails: string | any): EmissorFiscalError {
    return new EmissorFiscalError(
      `Validation error: ${message}`,
      null,
      { details: validationDetails }
    );
  }

  static fromZodError(message: string, exception: ZodError): EmissorFiscalError {
    return new EmissorFiscalError(
      message,
      exception,
      {
        statusCode: HttpStatusCode.NotAcceptable,
        details: flattenError(exception)
      }
    );
  }
}


