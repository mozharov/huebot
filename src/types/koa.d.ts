import type {Logger} from 'pino'

declare module 'koa' {
  interface BaseContext {
    logger: Logger
  }

  interface DefaultState {
    reqId: string
  }
}
