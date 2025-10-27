import type {Context, Next} from 'koa'
import {logger} from '../../lib/logger.js'

export async function requestLogger(ctx: Context, next: Next) {
  const start = Date.now()
  const {method, url} = ctx.request
  ctx.logger = logger.child({reqId: ctx.state.reqId as string})
  ctx.logger.info({method, url}, 'Start request')

  await next()

  const ms = Date.now() - start
  const status = ctx.status

  ctx.logger.info(
    {
      method,
      url,
      status,
      ms,
    },
    `Complete request`,
  )
}
