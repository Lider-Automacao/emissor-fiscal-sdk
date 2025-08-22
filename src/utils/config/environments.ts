import { config } from 'dotenv'
import { z } from 'zod'
import { EmissorFiscalError } from '../errors/emissor-fiscal.error'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config({ path: '.env' })
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  FISCAL_LOG_ATIVO: z.coerce.boolean().default(false),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', z.prettifyError(_env.error))
  throw new EmissorFiscalError('Variáveis de ambiente inválidas.')
}

console.debug('🚀 Environment variables loaded successfully.')

const env = _env.data

export abstract class Environments {
  static get nodeEnv() {
    return env.NODE_ENV
  }

  static get isProduction(): boolean {
    return env.NODE_ENV === 'production'
  }

  static get isTest(): boolean {
    return env.NODE_ENV === 'test'
  }

  static get isDevelopment(): boolean {
    return env.NODE_ENV === 'development'
  }

  static get logAtivo(): boolean {
    return env.FISCAL_LOG_ATIVO
  }
}
