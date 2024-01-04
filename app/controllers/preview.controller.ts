import { Body, Get, JsonController, Post } from 'routing-controllers'
import { PuppeteerService } from '../services'
import { Service } from 'typedi'
import { TMP_FOLDER } from 'configs/puppeteer.config'
import { PreviewParams } from 'app/services/preview.params'
import _ from 'lodash'
import { translate } from 'app/helpers/translateUtils'
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

// import commits from 'app/helpers/mock/commits'
// import commit from 'app/helpers/mock/commit'

@JsonController()
@Service()
export class PreviewController {
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
    const { filePath } = params ?? {}
    if (_.isEmpty(filePath)) {
      return { success: false, message: 'filePath is missing' }
    }
    if (!_.endsWith(filePath, '.xlsx')) {
      return { success: false, message: 'not an xlsx file' }
    }
    return await readAndTranslate(filePath, 3, 1)
  }

  @Post('/git/statistics')
  async doGitStatistics(@Body() params: any) {
    const { repoPath, pageSize, pageNumber } = params ?? {}
    if (_.isEmpty(repoPath)) {
      return { success: false, message: 'repoPath is missing' }
    }
    if (!_.isInteger(pageSize) || pageSize < 1) {
      return { success: false, message: 'wrong pageSize' }
    }
    if (!_.isInteger(pageNumber) || pageNumber < 1) {
      return { success: false, message: 'wrong pageNumber' }
    }

    const gitUrl = await getGitUrl(repoPath)

    const commits = await getCommitHistory(gitUrl, pageSize, (pageNumber - 1) * pageSize)
    const commitsByDate = parse4Commits(commits.html)
    const commitIdObj = commitsByDate.reduce((acc, el) => {
      const commitIds = el.commits.map(el => el.commitId)
      commitIds.forEach(id => (acc[id] = null))
      return acc
    }, {} as { [key: string]: CommitDetail | null })

    const commitIdPromises = Object.keys(commitIdObj).map(id =>
      getCommitDetail(gitUrl, id),
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
