
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

  async post<T, U>(path: string, data: T, config?: AxiosRequestConfig<any> | undefined): Promise<U> {
    try {
      const response = await this.client.post<U>(path, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw EmissorFiscalError.fromApiResponse(error);
      }
      throw new EmissorFiscalError(`Error making POST request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async get<T>(path: string, config?: AxiosRequestConfig<any> | undefined): Promise<T> {
    try {
      const response = await this.client.get<T>(path, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw EmissorFiscalError.fromApiResponse(error);
      }
      throw new EmissorFiscalError(`Error making GET request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async put<T, U>(path: string, data: T, config?: AxiosRequestConfig<any> | undefined): Promise<U> {
    try {
      const response = await this.client.put<U>(path, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw EmissorFiscalError.fromApiResponse(error);
      }
      throw new EmissorFiscalError(`Error making PUT request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }


  async delete<T>(path: string, config?: AxiosRequestConfig<any> | undefined): Promise<T> {
    try {
      const response = await this.client.delete<T>(path, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw EmissorFiscalError.fromApiResponse(error);
      }
      throw new EmissorFiscalError(`Error making DELETE request to ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  getClient(): AxiosInstance {
    return this.client;
  }

}

