import {Context} from 'koa'
import {successResponse} from '../../utils/api-response.js'

export class HealthController {

  healthcheck(ctx: Context) {
    ctx.status = 200
    ctx.body = successResponse({status: 'OK', timestamp: new Date().toISOString()})
  }
}

export const healthController = new HealthController()
