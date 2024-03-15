import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import { isProd } from './constants'
import serve from 'koa-static'
// import path from 'path'
import mount from 'koa-mount'

export const useMiddlewares = <T extends Koa>(app: T): T => {
  if (isProd()) {
    app.use(logger())
  }

  app.use(bodyParser())
  // app.use(mount('/static', serve(path.join(__dirname, 'public'))))
  app.use(
    mount(
      '/mfe-user-crm',
      serve('/Users/alexwang/workspace/xTransfer/mfe-user-crm/static'),
    ),
  )
  return app
}
