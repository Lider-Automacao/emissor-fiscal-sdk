import axios, { AxiosInstance } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Credenciais } from '../../../src/api/credenciais-api';
import { EmissorFiscalApi } from '../../../src/api/emissor-fiscal-api.service';
import { EmissorFiscalError } from '../../../src/utils/errors/emissor-fiscal.error';

vi.mock('axios');

const mockedAxios = axios as unknown as {
  create: any
  isAxiosError: any
};

describe('EmissorFiscalApi', () => {
  let api: EmissorFiscalApi;
  let clientMock: Record<string, any>;

  const credenciais: Credenciais = {
    url: 'http://localhost',
    usuario: 'user',
    senha: 'pass',
  };

  beforeEach(() => {
    clientMock = {
      post: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };
    mockedAxios.create.mockReturnValue(clientMock);
    api = new EmissorFiscalApi(credenciais);
  });

  it('should initialize axios client with correct config', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: credenciais.url,
      auth: {
        username: credenciais.usuario,
        password: credenciais.senha,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should perform a successful POST request', async () => {
    clientMock.post.mockResolvedValue({ data: { result: 'ok' } });
    const result = await api.post<{ foo: string }, { result: string }>('/path', { foo: 'bar' });
    expect(clientMock.post).toHaveBeenCalledWith('/path', { foo: 'bar' }, undefined);
    expect(result).toEqual({ result: 'ok' });
  });

  it('should perform a successful GET request', async () => {
    clientMock.get.mockResolvedValue({ data: { foo: 'bar' } });
    const result = await api.get<{ foo: string }>('/path');
    expect(clientMock.get).toHaveBeenCalledWith('/path', undefined);
    expect(result).toEqual({ foo: 'bar' });
  });

  it('should perform a successful PUT request', async () => {
    clientMock.put.mockResolvedValue({ data: { updated: true } });
    const result = await api.put<{ foo: string }, { updated: boolean }>('/path', { foo: 'bar' });
    expect(clientMock.put).toHaveBeenCalledWith('/path', { foo: 'bar' }, undefined);
    expect(result).toEqual({ updated: true });
  });

  it('should perform a successful DELETE request', async () => {
    clientMock.delete.mockResolvedValue({ data: { deleted: true } });
    const result = await api.delete<{ deleted: boolean }>('/path');
    expect(clientMock.delete).toHaveBeenCalledWith('/path', undefined);
    expect(result).toEqual({ deleted: true });
  });

  it('should throw EmissorFiscalError on POST axios error', async () => {
    const error = new Error('fail');
    mockedAxios.isAxiosError.mockReturnValue(true);
    clientMock.post.mockRejectedValue(error);
    vi.spyOn(EmissorFiscalError, 'fromApiResponse').mockReturnValue(new EmissorFiscalError('api error'));
    await expect(api.post('/fail', {})).rejects.toThrow(EmissorFiscalError);
  });

  it('should throw EmissorFiscalError on GET non-axios error', async () => {
    const error = new Error('fail');
    mockedAxios.isAxiosError.mockReturnValue(false);
    clientMock.get.mockRejectedValue(error);
    await expect(api.get('/fail')).rejects.toThrow(EmissorFiscalError);
  });

  it('should throw EmissorFiscalError on PUT axios error', async () => {
    const error = new Error('fail');
    mockedAxios.isAxiosError.mockReturnValue(true);
    clientMock.put.mockRejectedValue(error);
    vi.spyOn(EmissorFiscalError, 'fromApiResponse').mockReturnValue(new EmissorFiscalError('api error'));
    await expect(api.put('/fail', {})).rejects.toThrow(EmissorFiscalError);
  });

  it('should throw EmissorFiscalError on DELETE non-axios error', async () => {
    const error = new Error('fail');
    mockedAxios.isAxiosError.mockReturnValue(false);
    clientMock.delete.mockRejectedValue(error);
    await expect(api.delete('/fail')).rejects.toThrow(EmissorFiscalError);
  });

  it('getClient should return the axios instance', () => {
    expect(api.getClient()).toBe(clientMock as unknown as AxiosInstance);
  });
});