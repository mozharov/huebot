import Router from '@koa/router'
import {healthRoutes} from './health/routes.js'
import {botRoutes} from './bot/routes.js'

export const router = new Router({prefix: '/api/v1'})

router.use(healthRoutes.routes())
router.use(botRoutes.routes())
