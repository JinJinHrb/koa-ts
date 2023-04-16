import { Context } from 'koa'
import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { Service } from 'typedi'

@Middleware({ type: 'before' })
@Service()
export class HeaderMiddleware implements KoaMiddlewareInterface {
  async use(context: Context, next: (err?: Error) => unknown): Promise<unknown> {
    if (context.path.includes('apis')) {
      console.log('#10', context.path)
      return next()
    }
    console.log('HeaderMiddleware #20')
    context.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
    context.set(
      'Access-Control-Allow-Origin',
      context.request.header.origin || context.request.origin,
    )
    context.set('Access-Control-Allow-Headers', ['content-type'])
    context.set('Access-Control-Allow-Credentials', 'true')
    context.set('Content-Type', 'application/json; charset=utf-8')
    return next()
  }
}
