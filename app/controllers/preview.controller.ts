import { Body, Get, JsonController, Post } from 'routing-controllers'
import { PuppeteerService } from '../services'
import { Service } from 'typedi'
import { TMP_FOLDER } from 'configs/puppeteer.config'
import { PreviewParams } from 'app/services/preview.params'
import _ from 'lodash'
import { translate } from 'app/helpers/translateUtils'
import { modifyXlsx, readColumns, readAndTranslate } from 'app/helpers/excelUtils'

@JsonController()
@Service()
export class PreviewController {
  @Post('/excel/insertText')
  async insertText(@Body() params: any) {
    const { filePath } = params ?? {}
    if (_.isEmpty(filePath)) {
      return { success: false, message: 'filePath is missing' }
    }
    if (!_.endsWith(filePath, '.xlsx')) {
      return { success: false, message: 'not an xlsx file' }
    }
    const data = await readAndTranslate(filePath, 3, 1)

    return data
  }

  @Post('/preview')
  async query(@Body() params: PreviewParams) {
    const myPuppeteer = PuppeteerService.getInstance('myPuppeteer')
    try {
      await myPuppeteer.doPreview(params, TMP_FOLDER)
      return { success: true, params }
    } catch (error) {
      return { success: false, error, params }
    }
  }

  @Get('/inspect')
  async inspect() {
    const myPuppeteer = PuppeteerService.getInstance('myPuppeteer')
    const result = myPuppeteer.inspect()
    return { success: true, ...result }
  }
}
