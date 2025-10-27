import Router from '@koa/router'
import {botUpdateRequestId} from '../../middleware/request-id.js'
import {webhookCallback} from 'grammy'
import {env} from '../../../env.js'
import {logger} from '../../../lib/logger.js'
import {bot} from '../../../bot/bot.js'

export const botRoutes = new Router({prefix: '/bot'})

botRoutes.post(
  '/',
  botUpdateRequestId,
  webhookCallback(bot, 'koa', {
    secretToken: env.BOT_WEBHOOK_SECRET,
    timeoutMilliseconds: 30_000,
    onTimeout(...args) {
      logger.error({args}, 'Telegram webhook timed out')
    },
  }),
)
