import Router from '@koa/router'
import {healthController} from '../../controllers/health.controller.js'

export const healthRoutes = new Router({prefix: '/health'})

healthRoutes.get('/', healthController.healthcheck.bind(healthController))
