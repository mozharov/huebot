import type {Middleware} from 'grammy'
import type {BotContext} from '../context.js'
import {logger as appLogger} from '../../lib/logger.js'

export const logger: Middleware<BotContext> = (ctx, next) => {
  ctx.log = appLogger.child({reqId: ctx.update.reqId})
  return next()
}
