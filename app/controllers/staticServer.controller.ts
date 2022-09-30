import { Controller, Get, Req, Res, Param } from 'routing-controllers'
import { SessionsService } from '../services'
import { Service } from 'typedi'
import { Request, Response } from 'koa'
import _ from 'lodash'
import { getFileDataPromise } from 'configs/utils'
import mime from 'mime-types'
import path from 'path'

@Controller('/static')
@Service()
export class StaticServerController {
  constructor(private sessionsService: SessionsService) {}

  @Get('/get/:fPath')
  async getFile(
    @Param('fPath') fPath: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    if (_.isEmpty(fPath)) {
      return new Error(`invalid fPath: "${fPath}"`)
    }
    const extName = path.extname(fPath)
    const contentType = mime.contentType(extName)
    if (_.isString(contentType)) {
      response.ctx.set('Content-Type', contentType)
    } else {
      return new Error(`invalid contentType: "${contentType}", fPath: "${fPath}"`)
    }
    const buffer = (await getFileDataPromise(fPath, 'buffer')) as Buffer
    return buffer
  }
}
