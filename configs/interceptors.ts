import _ from 'lodash'
import { InterceptorInterface, Action, Interceptor } from 'routing-controllers'
import { Stream } from 'stream'
import { Service } from 'typedi'

@Interceptor()
@Service()
export class AutoAssignJSONInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any): any {
    if (content instanceof Buffer || content instanceof Stream) {
      return content
    }
    if (content instanceof Error) {
      return {
        status: 500,
        message: content.message,
      }
    }
    if (_.isObjectLike(content)) {
      return JSON.stringify(Object.assign({ message: 'ok' }, content))
    } else {
      return JSON.stringify({ message: content })
    }
  }
}
