import type {Listener} from '@ngrok/ngrok'
import {env} from '../env.js'
import {logger} from './logger.js'

let tunnel: Listener | undefined
export let tunnelUrl: string | null = null

export async function startTunnel(): Promise<string> {
  logger.info('Starting tunnel...')
  const ngrok = await import('@ngrok/ngrok')
  tunnel = await ngrok.connect({port: env.PORT, authtoken: env.NGROK_TOKEN})
  tunnelUrl = tunnel.url()
  if (!tunnelUrl) throw new Error(`Failed to get tunnel URL`)
  logger.info(`Tunnel started: ${tunnelUrl}`)
  return tunnelUrl
}

export async function stopTunnel(): Promise<void> {
  if (!tunnel) return
  logger.info('Stopping tunnel...')
  await tunnel.close()
}
