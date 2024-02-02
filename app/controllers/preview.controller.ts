import { Body, Get, JsonController, Post } from 'routing-controllers'
import { PuppeteerService } from '../services'
import { Service } from 'typedi'
import { TMP_FOLDER } from 'configs/puppeteer.config'
import { PreviewParams } from 'app/services/preview.params'
import { findChineseSubstringsInTemplate, reverseObject } from 'app/helpers/templateUtils'
import _ from 'lodash'
import {
  modifyXlsx,
  readColumns,
  readAndTranslate,
  retryTranslation,
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

// import commits from 'app/helpers/mock/commits'
// import commit from 'app/helpers/mock/commit'

@JsonController()
@Service()
export class PreviewController {
  @Post('/textToExcel')
  async textToExcel(@Body() params: any) {
    const { filePath } = params
    const txt = (await getFileData(filePath)) as unknown as string
    const obj = JSON.parse(txt)
    const { dict } = obj
    const map = reverseObject(dict)
    return {
      objKeysLength: Object.keys(obj).length,
      mapKeysLength: Object.keys(map).length,
      map,
    }
  }

  @Post('/preTranslateWebsiteTemplate')
  async preTranslateWebsiteTemplate(@Body() params: { filePath: string }) {
    let dict: { [key: string]: string } = {}
    const { filePath } = params
    const txt = (await getFileData(filePath)) as unknown as string
    const collection = txt
      .split('\n')
      .map(a => JSON.parse(a))
      .map(a => {
        if (!_.startsWith(a.template, '{') || !_.endsWith(a.template, '}')) {
          return a
        }
        let isParseDone = false
        let caseFlag = 0
        while (!isParseDone) {
          try {
            if (caseFlag === 1) {
              console.log('#62 caseFlag === 1 templateName:', a.templateName)
              a.template = a.template.replace(/\n/g, '')
            } else if (caseFlag === 2) {
              console.log('#65 caseFlag === 2 templateName:', a.templateName)
              a.template = a.template.replace(/,\}\}$/, '}}')
            }
            const template = JSON.parse(a.template)
            a.template = template
            isParseDone = true
          } catch (e) {
            caseFlag++
            if (caseFlag > 2) {
              isParseDone = true
            }
          }
        }

        return a
      })
    const collection2 = _.cloneDeep(collection)
    for (const element of collection2) {
      const { template } = element
      dict = { ...dict, ...findChineseSubstringsInTemplate(template) }
    }
    return { collection2, dict, collection }
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
    return await retryTranslation(filePath, 3, 1)
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
    return await readAndTranslate(filePath, 3, 1, referencePathsFiltered)
  }

  @Post('/git/statistics')
  async doGitStatistics(@Body() params: any) {
    const { repoPath, pageSize, pageNumber, attaTeamCookie, attaTeamCsrfToken } =
      params ?? {}
    if (_.isEmpty(repoPath)) {
      return { success: false, message: 'repoPath is missing' }
    }
    if (!_.isInteger(pageSize) || pageSize < 1) {
      return { success: false, message: 'wrong pageSize' }
    }
    if (!_.isInteger(pageNumber) || pageNumber < 1) {
      return { success: false, message: 'wrong pageNumber' }
    }
    if (_.isEmpty(attaTeamCookie)) {
      return { success: false, message: 'attaTeamCookie is missing' }
    }
    if (_.isEmpty(attaTeamCsrfToken)) {
      return { success: false, message: 'attaTeamCsrfToken is missing' }
    }

    const gitUrl = await getGitUrl(repoPath)

    const commits = await getCommitHistory(
      gitUrl,
      pageSize,
      (pageNumber - 1) * pageSize,
      attaTeamCookie,
      attaTeamCsrfToken,
    )
    const commitsByDate = parse4Commits(commits.html)
    const commitIdObj = commitsByDate.reduce((acc, el) => {
      const commitIds = el.commits.map(el => el.commitId)
      commitIds.forEach(id => (acc[id] = null))
      return acc
    }, {} as { [key: string]: CommitDetail | null })

    const commitIdPromises = Object.keys(commitIdObj).map(id =>
      getCommitDetail(gitUrl, id, attaTeamCookie),
    )
    const commitDetails = (await Promise.all(commitIdPromises)).map(parse4Commit)
    commitDetails.forEach(el => {
      const { commitId } = el
      commitIdObj[commitId] = el
    })

    commitsByDate.forEach(el => {
      const { commits } = el
      commits.forEach(el => {
        const { commitId } = el
        const el2 = el as unknown as { [key: string]: string | number }
        const commitDetails = commitIdObj[commitId] as CommitDetail
        Object.keys(commitDetails).forEach(k => {
          const k2 = k as keyof CommitDetail
          el2[k2] = commitDetails[k2]
        })
      })
    })

    return { data: commitsByDate }
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
