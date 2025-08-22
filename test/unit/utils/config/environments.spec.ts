import { describe, expect, it } from 'vitest';
import { Environments } from '../../../../src/utils/config/environments';

describe('Environments', () => {

  it('should create an instance and access properties', () => {
    const env = new Environments();
    expect(['development', 'test', 'production']).toContain(env.nodeEnv);
    expect(typeof env.isProduction).toBe('boolean');
    expect(typeof env.isTest).toBe('boolean');
    expect(typeof env.isDevelopment).toBe('boolean');
  });

  it('should return correct boolean flags for each environment', () => {
    const originalEnv = process.env.NODE_ENV;

    process.env.NODE_ENV = 'production';
    let env = new Environments();
    expect(env.isProduction).toBe(true);
    expect(env.isTest).toBe(false);
    expect(env.isDevelopment).toBe(false);

    process.env.NODE_ENV = 'test';
    env = new Environments();
    expect(env.isProduction).toBe(false);
    expect(env.isTest).toBe(true);
    expect(env.isDevelopment).toBe(false);

    process.env.NODE_ENV = 'development';
    env = new Environments();
    expect(env.isProduction).toBe(false);
    expect(env.isTest).toBe(false);
    expect(env.isDevelopment).toBe(true);

    process.env.NODE_ENV = originalEnv;
  });

  it('should throw an error for invalid NODE_ENV', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'invalid_env';

    expect(() => new Environments()).toThrow('Variáveis de ambiente inválidas.');

    process.env.NODE_ENV = originalEnv;
  });

});