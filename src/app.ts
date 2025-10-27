import {env} from './env.js'
import Koa from 'koa'
import {requestLogger} from './api/middleware/request-logger.js'
import {requestId} from './api/middleware/request-id.js'
import {router} from './api/routes/routes.js'
import compress from 'koa-compress'
import {bodyParser} from '@koa/bodyparser'
import {errorHandler} from './api/middleware/error-handler.js'

const app = new Koa()
app.proxy = true

app.use(errorHandler)
app.use(requestId)
app.use(requestLogger)
app.use(compress())

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

export function startServer() {
  return app.listen(env.PORT)
}
