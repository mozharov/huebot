import {Context} from 'grammy'
import type {Logger} from 'pino'

export type BaseContext = Context & {
  log: Logger
  update: {
    reqId: string
  }
}

export type BotContext = BaseContext
