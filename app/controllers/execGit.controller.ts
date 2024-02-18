import { Body, JsonController, Post } from 'routing-controllers'
import { Service } from 'typedi'
import _ from 'lodash'
import {
  getCommitHistory,
  getGitUrl,
  getCommitDetail,
  parse4Commits,
  parse4Commit,
  CommitDetail,
  getCommitInfoForLine,
} from 'app/helpers/gitStatistics'

import { BabelService } from 'app/services'
import {
  getFileData,
  getFsStatPromise,
  isDirectory,
  listStatsPromise,
} from 'app/helpers/fsUtils'
import { getBizComponentApplier } from 'app/services/gitHelper'
import { GetAstAndAlterCodeParams } from 'app/services/babel.params'
import { ParseResult } from '@babel/parser'
import pathUtil from 'path'
import { getGraphNodes } from 'app/services/babelHelper/innerHelper'

@JsonController()
@Service()
export class ExecGitController {
  constructor(private babelService: BabelService) {}
  @Post('/git/countBizComponentApplier')
  async countBizComponentApplier() {
    const { data } = JSON.parse(
      (
        await getFileData(
          pathUtil.resolve(
            __dirname.slice(0, __dirname.indexOf('app')),
            './app/mock/statistics/mfe-user-crm.json',
          ),
        )
      )?.toString(),
    )
    const statistics: any = {}
    data.forEach((elem: any) => {
      // const filePath = el.filePath
      const importSpecifiers = elem.importSpecifiers
      importSpecifiers.forEach((el: any) => {
        const { source, importedName, localName, references } = el
        const key1 = `${source},${importedName}`
        if (!statistics[key1]) {
          statistics[key1] = {
            source,
            importedName,
          }
        }
        if (!references) {
          console.log('#54', el)
        }
        references.forEach((subEl: any) => {
          const commitInfo = subEl.commitInfo
          const author = commitInfo.author
          const authorMail = commitInfo['author-mail']
          const key2 = `${author},${authorMail}`
          if (_.isNil(statistics[key1][key2])) {
            statistics[key1][key2] = 1
          } else {
            statistics[key1][key2] = statistics[key1][key2] + 1
          }
        })
      })
    })
    return { statistics }
  }

  @Post('/git/getBizComponentApplier')
  async getBizComponentApplier(
    @Body() { filePath, tsconfigPath }: { filePath?: string; tsconfigPath: string },
  ) {
    const projectFolderPath = tsconfigPath.slice(0, tsconfigPath.lastIndexOf('/'))
    if (this.babelService.tsconfigPath !== tsconfigPath) {
      await this.babelService.setAlias(tsconfigPath)
    }

    const graphNodes = await getGraphNodes()
    const filePaths = graphNodes.graph.nodes
      .map(a => a.key)
      .filter(
        a =>
          _.endsWith(a, '.js') ||
          _.endsWith(a, '.jsx') ||
          _.endsWith(a, '.ts') ||
          _.endsWith(a, '.tsx'),
      )

    if (!_.isNil(filePath)) {
      // const stats = await getFsStatPromise(filePath)
      const code = (await getFileData(filePath))?.toString()
      const ast = await this.babelService.getAstByCode(code)
      const importSpecifiers = await getBizComponentApplier(
        projectFolderPath,
        filePath,
        ast,
      )
      console.log('#42 importSpecifiers:', importSpecifiers)
      return { filePath, importSpecifiers /* ast, stats */ }
    } else {
      const data: any[] = []
      for (const filePath of filePaths) {
        // const stats = await getFsStatPromise(filePath)
        try {
          const code = (await getFileData(filePath))?.toString()
          const ast = await this.babelService.getAstByCode(code)
          const importSpecifiers = await getBizComponentApplier(
            projectFolderPath,
            filePath,
            ast,
          )
          if (!_.isEmpty(importSpecifiers)) {
            data.push({ filePath, importSpecifiers })
          }
        } catch (e) {
          console.log('#77 filePath:', filePath, 'error:', e)
        }
      }
      return { data }
    }
  }

  @Post('/git/getCommitInfoForLine')
  async getCommitInfoForLineController(
    @Body() params: { projectFolderPath: string; filePath: string; lineNumber: number },
  ) {
    const { projectFolderPath, filePath, lineNumber } = params
    const data = await new Promise((resolve, reject) => {
      getCommitInfoForLine({ projectFolderPath, filePath, lineNumber }, (err, rsp) => {
        if (err) {
          reject(err)
        } else {
          resolve(rsp)
        }
      })
    })
    return { data }
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
}
