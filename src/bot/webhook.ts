import {env} from '../env.js'
import {bot} from './bot.js'

export async function setWebhook(url: string) {
  await bot.api.setWebhook(`${url}/api/v1/bot`, {secret_token: env.BOT_WEBHOOK_SECRET})
}

export async function deleteWebhook() {
  await bot.api.deleteWebhook()
}
