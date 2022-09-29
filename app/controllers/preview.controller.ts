import { Body, Get, JsonController, Post } from 'routing-controllers'
import { PuppeteerService } from '../services'
import { Service } from 'typedi'
import { TPageWrapper } from 'app/services/types'
import path from 'path'
import { mkdirSync } from 'configs/utils'
import { TMP_FOLDER } from 'configs/puppeteer.config'
import { PreviewParams } from 'app/services/preview.params'

@JsonController()
@Service()
export class PreviewController {
  @Post('/preview')
  async query(@Body() params: PreviewParams) {
    const myPuppeteer = PuppeteerService.getInstance('myPuppeteer')
    try {
      await myPuppeteer.visitPage(
        params.url,
        (myPage: TPageWrapper) => {
          mkdirSync(TMP_FOLDER)
          myPuppeteer.exportPdf(myPage, path.join(TMP_FOLDER, `./${params.name}`))
        },
        30000,
      )
      return { ok: true, params }
    } catch (error) {
      return { ok: false, error, params }
    }
  }

  @Get('/inspect')
  async inspect() {
    const myPuppeteer = PuppeteerService.getInstance('myPuppeteer')
    const result = myPuppeteer.inspect()
    return { ok: true, ...result }
  }
}
