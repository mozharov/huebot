import type {Middleware} from 'grammy'
import type {BotContext} from '../context.js'
import {Message} from 'grammy/types'
import {huify} from '../../utils/huify.js'

export const textHandler: Middleware<BotContext & {message: Message.TextMessage}> = ctx => {
  ctx.log.info({text: ctx.message.text}, 'Text message received')
  const huified = huify(ctx.message.text)
  if (!huified) return
  return ctx.reply(huified, {reply_parameters: {message_id: ctx.message.message_id}})
}
