import type {Middleware} from 'grammy'
import type {BotContext} from '../context.js'
import {huify} from '../../utils/huify.js'

export const textHandler: Middleware<BotContext> = ctx => {
  const text = ctx.message?.text || ctx.message?.caption
  if (!text) return
  ctx.log.info({text}, 'Text message received')
  const huified = huify(text)
  if (!huified) return
  return ctx.reply(huified, {reply_parameters: {message_id: ctx.message.message_id}})
}
