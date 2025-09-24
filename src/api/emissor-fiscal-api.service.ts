
import { isNullOrUndefined } from '@raicamposs/toolkit';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { EmissorFiscalError } from '../utils/errors/emissor-fiscal.error';
import { Credenciais } from './credenciais-api';

export class EmissorFiscalApi {
  private readonly client: AxiosInstance;

  constructor({ url, senha, usuario }: Credenciais) {
    this.client = axios.create({
      baseURL: url,
      auth: {
        username: usuario,
        password: senha,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getClient(): AxiosInstance {
    return this.client;
  }

  async post<T, U>(path: string, data: T, config?: AxiosRequestConfig<any> | undefined): Promise<U> {
    try {
      const response = await this.client.post<U>(path, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error, path, 'POST');
    }
  }

  async get<T>(path: string, config?: AxiosRequestConfig<any> | undefined): Promise<T> {
    try {
      const response = await this.client.get<T>(path, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error, path, 'GET');
    }
  }

  async put<T, U>(path: string, data: T, config?: AxiosRequestConfig<any> | undefined): Promise<U> {
    try {
      const response = await this.client.put<U>(path, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error, path, 'PUT');
    }
  }


  async delete<T>(path: string, config?: AxiosRequestConfig<any> | undefined): Promise<T> {
    try {
      const response = await this.client.delete<T>(path, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error, path, 'DELETE');
    }
  }

  private handleError(error: unknown, path: string, method: string): EmissorFiscalError {
    if (!axios.isAxiosError(error))
      return new EmissorFiscalError(`Error making ${method} request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`, error);

    if (isNullOrUndefined(error.response?.data)) {
      return EmissorFiscalError.fromApiResponse(error);
    }

    const data = error.response.data;
    let parsedData = data;

    if (Buffer.isBuffer(data) || data instanceof ArrayBuffer) {
      try {
        const dataAsString = Buffer.from(data as Buffer).toString('utf-8');
        parsedData = JSON.parse(dataAsString);
      } catch (parseError) {
        console.debug('Error parsing response data:', parseError);
        return EmissorFiscalError.fromApiResponse(error);
      }
    }

    return EmissorFiscalError.fromApiResponse({
      ...error,
      response: { ...error.response, data: parsedData }
    });
  }
}

