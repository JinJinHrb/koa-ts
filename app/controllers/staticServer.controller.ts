import { Controller, Get, Req, Res, Param } from 'routing-controllers'
import { Service } from 'typedi'
import { Request, Response } from 'koa'
import _ from 'lodash'
import mime from 'mime-types'
import path from 'path'
import { getFileData } from 'app/helpers/fsUtils'

@Controller('/static')
@Service()
export class StaticServerController {
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
    const buffer = (await getFileData(fPath, 'buffer')) as Buffer
    return buffer
  }
}
