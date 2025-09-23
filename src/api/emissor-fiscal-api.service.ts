
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { EmissorFiscalError } from '../utils/errors/emissor-fiscal.error';
import { Credenciais } from './credenciais-api';

export class EmissorFiscalApi {
  private client: AxiosInstance;

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
    if (axios.isAxiosError(error)) {
      return EmissorFiscalError.fromApiResponse(error);
    }
    return new EmissorFiscalError(`Error making ${method} request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

