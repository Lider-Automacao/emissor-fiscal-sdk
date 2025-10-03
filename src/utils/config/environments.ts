import { config } from 'dotenv';
import * as z from "zod";
import { EmissorFiscalError } from '../errors/emissor-fiscal.error';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
})

export class Environments {
  private readonly env: z.infer<typeof envSchema>

  constructor() {
    if (process.env.NODE_ENV === 'test') {
      config({ path: '.env.test' })
    } else {
      config({ path: '.env' })
    }

    const _env = envSchema.safeParse(process.env)

    if (_env.success === false) {
      console.error('⚠️ Invalid environment variables', z.prettifyError(_env.error))
      throw new EmissorFiscalError('Variáveis de ambiente inválidas.')
    }

    console.debug('🚀 Environment variables loaded successfully.')

    this.env = _env.data
  }

  get nodeEnv() {
    return this.env.NODE_ENV
  }

  get isProduction(): boolean {
    return this.env.NODE_ENV === 'production'
  }

  get isTest(): boolean {
    return this.env.NODE_ENV === 'test'
  }

  get isDevelopment(): boolean {
    return this.env.NODE_ENV === 'development'
  }

}
