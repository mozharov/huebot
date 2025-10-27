import type {Context, Next} from 'koa'
import {AppError, ErrorCodes} from '../../lib/errors.js'
import {errorResponse} from '../../utils/api-response.js'

const internalServerErrorMessage = 'Internal Server Error'

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch (error) {
    if (error instanceof AppError) {
      ctx.status = error.statusCode
      ctx.body = errorResponse({
        code: error.code,
        message: error.expose ? error.message : internalServerErrorMessage,
      })
    } else {
      ctx.status = 500
      ctx.body = errorResponse({
        code: ErrorCodes.INTERNAL_ERROR,
        message: internalServerErrorMessage,
      })
    }

    ctx.logger.error({
      error,
      request: {
        method: ctx.request.method,
        url: ctx.request.url,
      },
      msg: 'Application error',
    })
  }
}
