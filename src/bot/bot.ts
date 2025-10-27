import {Bot} from 'grammy'
import {BotContext} from './context.js'
import {logger} from './middleware/logger.js'
import {autoRetry} from '@grammyjs/auto-retry'
import {errorHandler} from './controllers/error-handler.js'
import {env} from '../env.js'
import {textHandler} from './controllers/text.js'

export const bot = new Bot<BotContext>(env.BOT_TOKEN)
bot.api.config.use(autoRetry())

const composer = bot.errorBoundary(errorHandler)
composer.use(logger)

composer.command('start', ctx => ctx.reply('Hello, world!'))
composer.on('msg:text', textHandler)
composer.on('msg:caption', textHandler)
