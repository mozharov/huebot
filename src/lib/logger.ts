import {pino, Logger as PinoLogger, stdSerializers} from 'pino'
import {env, isProduction} from '../env.js'

export const logger: PinoLogger = pino({
  level: env.LOG_LEVEL,

  transport: !isProduction
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      }
    : undefined,

  redact: {
    paths: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.token', '*.secret'],
    censor: '[REDACTED]',
  },

  serializers: {
    error: stdSerializers.err,
  },
})

export const createLogger = (module: string): PinoLogger => logger.child({module})
