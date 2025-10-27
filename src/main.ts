import {startServer} from './app.js'
import {env} from './env.js'
import {createLogger} from './lib/logger.js'
import type {Server} from 'http'
import {startTunnel, stopTunnel} from './lib/tunnel.js'
import {deleteWebhook, setWebhook} from './bot/webhook.js'

const logger = createLogger('main')

let server: Server | null = null
let isShuttingDown = false

async function startup(): Promise<void> {
  try {
    // Start HTTP server
    logger.info('Starting HTTP server...')
    server = startServer()

    // Wait for server to start listening
    await new Promise((resolve, reject) => {
      server!.once('listening', resolve)
      server!.once('error', reject)
    })

    if (env.NGROK_TOKEN) {
      await startTunnel().then(url => setWebhook(url))
    }

    logger.info('Application startup completed successfully')
  } catch (error) {
    logger.fatal({error}, 'Failed to start application')
    process.exit(1)
  }
}

async function gracefulShutdown(signal: string): Promise<void> {
  if (isShuttingDown) {
    logger.warn('Shutdown already in progress, ignoring signal')
    return
  }

  isShuttingDown = true
  logger.info(`Received ${signal} signal, shutting down gracefully`)

  const shutdownTimeout = setTimeout(() => {
    logger.error('Graceful shutdown timeout exceeded, forcing exit')
    process.exit(1)
  }, env.SHUTDOWN_TIMEOUT_MS)

  try {
    // Delete webhook
    if (env.NGROK_TOKEN) {
      await stopTunnel()
      await deleteWebhook()
    }

    // Close HTTP server
    if (server) {
      logger.info('Closing HTTP server...')
      await new Promise<void>((resolve, reject) => {
        server!.close(error => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      })
      logger.info('HTTP server closed')
    }

    clearTimeout(shutdownTimeout)
    logger.info('Graceful shutdown completed')
    process.exit(0)
  } catch (error) {
    clearTimeout(shutdownTimeout)
    logger.error({error}, 'Error during graceful shutdown')
    process.exit(1)
  }
}

// Signal handlers
process.on('SIGTERM', () => {
  void gracefulShutdown('SIGTERM')
})
process.on('SIGINT', () => {
  void gracefulShutdown('SIGINT')
})

// Error handlers
process.on('unhandledRejection', (reason, promise) => {
  logger.error({reason, promise}, 'Unhandled promise rejection detected')
  if (!isShuttingDown) {
    void gracefulShutdown('unhandledRejection')
  }
})

process.on('uncaughtException', error => {
  logger.fatal({error}, 'Uncaught exception detected')
  if (!isShuttingDown) {
    void gracefulShutdown('uncaughtException')
  }
})

// Start the application
await startup()
