import type {ErrorHandler} from 'grammy'
import type {BotContext} from '../context.js'

export const errorHandler: ErrorHandler = async err => {
  const {error} = err
  const ctx = err.ctx as BotContext
  ctx.log.error({error}, 'Bot error')
  await ctx.reply('An error occurred').catch((error: unknown) => {
    ctx.log.error({error}, 'Failed to reply about error')
  })
}
