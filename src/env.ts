import 'dotenv/config'
import {z} from 'zod'

// Environment configuration schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().positive().default(3000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  BOT_TOKEN: z.string(),
  BOT_WEBHOOK_SECRET: z.string(),
  SHUTDOWN_TIMEOUT_MS: z.coerce.number().positive().default(30000),
  NGROK_TOKEN: z.string().optional(),
})

// Parse and validate environment variables
export const env = envSchema.parse(process.env)
export type Env = z.infer<typeof envSchema>

// Helper to check environment
export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'
