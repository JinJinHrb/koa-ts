import { Body, Get, JsonController, Post } from 'routing-controllers'
import { PuppeteerService } from '../services'
import { Service } from 'typedi'
import { TMP_FOLDER } from 'configs/puppeteer.config'
import { PreviewParams } from 'app/services/preview.params'
import {
  Dict,
  fillInHelper,
  fillInTemplateWithDict,
  findChineseSubstringsInTemplate,
  parseBackendTemplate,
  reverseObject,
} from 'app/helpers/templateUtils'
import _ from 'lodash'
import {
  modifyXlsx,
  readColumns,
  readAndTranslate,
  retryTranslation,
  switch2Columns,
  mapToExcel,
} from 'app/helpers/excelUtils'
import {
  getCommitHistory,
  getGitCommits,
  getGitUrl,
  getCommitDetail,
  parse4Commits,
  parse4Commit,
  Commit,
  CommitDetail,
} from 'app/helpers/gitStatistics'
import fs from 'fs'
import { cacheTranslation } from 'app/helpers/translateUtils'
import { getFileData } from 'app/helpers/fsUtils'
import { genId } from 'app/helpers/stringUtil'

// import commits from 'app/helpers/mock/commits'
// import commit from 'app/helpers/mock/commit'

@JsonController()
@Service()
export class PreviewController {
  @Post('/resumeBackendTemplate')
  async resumeBackendTemplate(@Body() params: { filePath: string }) {
    const { filePath } = params
    const txt = (await getFileData(filePath)) as unknown as string
    const obj = JSON.parse(txt)
    const { collection: rawCollection, dict } = obj
    const collection = _.cloneDeep(rawCollection)
    const map = reverseObject(dict)
    fillInTemplateWithDict(collection, map)
    const isEqual = _.isEqual(collection, rawCollection)
    return { isEqual, collection }
  }

  @Post('/testFillInHelper')
  async testFillInHelper(@Body() params: { filePath: string; str: string }) {
    const { filePath, str } = params
    const txt = (await getFileData(filePath)) as unknown as string
    const obj = JSON.parse(txt)
    const { dict } = obj
    const map = reverseObject(dict)
    const text = fillInHelper(str, map)
    return { text }
  }

  @Post('/excel/textToExcel')
  async textToExcel(@Body() params: any) {
    const { srcPath, destPath } = params
    const txt = (await getFileData(srcPath)) as unknown as string
    const jsonObj = JSON.parse(txt)
    const { dict } = jsonObj
    const dataObj = reverseObject(dict)
    const dictKeysLength = Object.keys(dict).length
    const mapKeysLength = Object.keys(dataObj).length
    if (dictKeysLength !== mapKeysLength) {
      return {
        error: 'dictKeysLength !== mapKeysLength',
      }
    }
    const entries = Object.entries(dataObj)
    const map = new Map(entries)
    await mapToExcel(map, destPath)
    return {
      dictKeysLength: Object.keys(dict).length,
      mapKeysLength: Object.keys(dataObj).length,
      srcPath,
      destPath,
    }
  }

  @Post('/preTranslateBackendTemplate')
  async preTranslateBackendTemplate(@Body() params: { filePath: string; flag?: number }) {
    const { filePath, flag } = params
    // const txt = (await getFileData(filePath)) as unknown as string
    // const arr = JSON.parse(txt)
    // return { arr }
    const dict: Dict = {}
    const { warnings, collection } = await parseBackendTemplate(filePath, flag)
    for (const element of collection) {
      const { template } = element
      // dict = { ...dict, ...findChineseSubstringsInTemplate(template) }
      if (_.isString(template)) {
        let toReplace = ''
        if (dict[template]) {
          toReplace = dict[template]
        } else {
          toReplace = `backend/AiHelper/${genId()}`
          dict[template] = toReplace
        }
        element.template = `#{${toReplace}}`
      } else {
        // 正常 100% 是对象
        findChineseSubstringsInTemplate(template, dict)
      }
    }
    return { warnings, collection, dict }
  }

  /** 获取后端的提供的建站模板 */
  @Post('/getBackendTemplate')
  async getBackendTemplate(@Body() params: { filePath: string }) {
    const { filePath } = params
    const { warnings, collection } = await parseBackendTemplate(filePath)
    return { warnings, collection }
  }

  @Post('/excel/switch2Columns')
  async switch2ColumnsController(@Body() params: { filePaths: string[] }) {
    const invalidFilePaths = (params.filePaths ?? []).filter(
      a => a && !_.endsWith(a, '.xlsx'),
    )
    // const filePaths = (params.filePaths ?? []).filter(a => a && _.endsWith(a, '.xlsx'))
    // if (_.isEmpty(filePath)) {
    //   return { success: false, message: 'filePath is missing' }
    // }
    // if (!_.endsWith(filePath, '.xlsx')) {
    //   return { success: false, message: 'not an xlsx file' }
    // }
    if (!_.isEmpty(invalidFilePaths)) {
      return {
        success: false,
        message: `not an xlsx file: ${invalidFilePaths.join(', ')}`,
      }
    }
    const filePaths = params.filePaths
    if (_.isEmpty(filePaths)) {
      return { success: false, message: 'filePaths is missing' }
    }
    const promises = params.filePaths.map(
      filePath =>
        new Promise((rsv, rej) => {
          switch2Columns(filePath, 1, 5)
            .then(feed => {
              rsv(feed)
            })
            .catch(err => {
              rej(err)
            })
        }),
    )
    // return await switch2Columns(filePath, 1, 5)
    return await Promise.all(promises)
  }

  @Post('/excel/translateAgain')
  async translateAgain(@Body() params: any) {
    const { filePath } = params ?? {}
    if (_.isEmpty(filePath)) {
      return { success: false, message: 'filePath is missing' }
    }
    if (!_.endsWith(filePath, '.xlsx')) {
      return { success: false, message: 'not an xlsx file' }
    }
    return await retryTranslation(filePath, 3, 5)
  }

  @Post('/excel/translateText')
  async translateText(@Body() params: any) {
    const { filePath, referencePaths } = params ?? {}
    if (_.isEmpty(filePath)) {
      return { success: false, message: 'filePath is missing' }
    }
    if (!_.endsWith(filePath, '.xlsx')) {
      return { success: false, message: 'not an xlsx file' }
    }
    const referencePathsFiltered = (referencePaths as string[])?.filter(a =>
      fs.existsSync(a),
    )
    console.log('#55', 'referencePathsFiltered:', referencePathsFiltered)
    return await readAndTranslate(filePath, 3, 5, referencePathsFiltered)
  }

  @Post('/cacheTranslation')
  async cacheTranslationController(@Body() params: any) {
    const { filePaths } = params
    return await cacheTranslation(filePaths as string[])
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
