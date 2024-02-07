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

import exec from 'child_process'

@JsonController()
@Service()
export class ExecGitController {
  @Post('/git/getCommitInfoForLine')
  async getCommitInfoForLineController(
    @Body() params: { projectFolderPath: string; filePath: string; lineNumber: number },
  ) {
    const { projectFolderPath, filePath, lineNumber } = params
    return await new Promise((resolve, reject) => {
      getCommitInfoForLine(projectFolderPath, filePath, lineNumber, (err, rsp) => {
        if (err) {
          reject(err)
        } else {
          resolve(rsp)
        }
      })
    })
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
