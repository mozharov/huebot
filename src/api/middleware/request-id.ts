import type {Context, Next} from 'koa'
import {randomBytes} from 'crypto'

export function requestId(ctx: Context, next: Next) {
  ctx.state.reqId = randomBytes(4).toString('hex')
  return next()
}

export function botUpdateRequestId(ctx: Context, next: Next) {
  ctx.logger.info({reqId: ctx.state.reqId}, 'Bot update request ID')
  const update: unknown = ctx.request.body
  if (update && typeof update === 'object') {
    Object.assign(update, {reqId: ctx.state.reqId})
  }
  return next()
}
