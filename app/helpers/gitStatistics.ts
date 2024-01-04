import axios from 'axios'
import * as path from 'path'
import * as fs from 'fs'
import { exec } from 'child_process'
import _ from 'lodash'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

export async function getGitCommits(repoPath: string) {
  return await new Promise((resolve, reject) => {
    exec(
      'git shortlog -sne --since="1 month"',
      { cwd: '/path/to/your/repository' },
      (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`)
          reject(err)
          return
        }

        console.log(`Number of commits:\n${stdout}`)
        resolve(stdout)
      },
    )
  })
}

export async function getGitUrl(repoPath: string) {
  const logPath = path.join(repoPath, '.git', 'config')
  const configStr = await fs.promises.readFile(logPath, 'utf8')
  const titles = configStr.match(/\[[^\[^\]]*\]/g) ?? []
  const groups = (configStr.split(/\[[^\[^\]]*\]/) ?? []).slice(1)
  const configData = titles.reduce((acc, item, i) => {
    const group = (groups[i].match(/[\w]+\s+=\s[^\s]*/g) ?? []).reduce(
      (subAcc, subItem) => {
        const [key, value] = subItem.split(' = ')
        subAcc[key] = value
        return subAcc
      },
      {} as { [key: string]: string },
    )
    acc[item] = group
    return acc
  }, {} as { [key: string]: { [key: string]: string } })
  return _.get(configData, ['[remote "origin"]', 'url'])
}

const attaTeamCookie =
  'sidebar_collapsed=false; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2200990100001000021041601003170%22%2C%22first_id%22%3A%2218c3ca9ae8870b-0ff36da24f1524-16525634-1296000-18c3ca9ae8914c5%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThjM2NhOWFlODg3MGItMGZmMzZkYTI0ZjE1MjQtMTY1MjU2MzQtMTI5NjAwMC0xOGMzY2E5YWU4OTE0YzUiLCIkaWRlbnRpdHlfbG9naW5faWQiOiIwMDk5MDEwMDAwMTAwMDAyMTA0MTYwMTAwMzE3MCJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%2200990100001000021041601003170%22%7D%2C%22%24device_id%22%3A%2218c3ca9ae8870b-0ff36da24f1524-16525634-1296000-18c3ca9ae8914c5%22%7D; experimentation_subject_id=IjVkZDQ2NWIyLWE1MmItNGJmYy1iMjM4LTE2NmZiYzliMGUyNyI%3D--c1be16ed92e84627125af4325361ce9d0eb1d2fa; diff_view=inline; _gitlab_session=3fb9d777f9757348984ad519b670d643; event_filter=all; xt_uuid=215fdc90aabd11ee86cdd7a1f9adcb51; XSRF-TOKEN=3b39856e-15e0-4513-be5f-09c9998f5cdd'

const attaTeamCsrfToken =
  'XfLWlzMnzTgkN5UZVXGl5CcVHVimoBLt5l2mYqu5RolSdpQj1xUA02WvCkyHw/ctN7MgTS7iq3ptSD+8JEyzWA=='

const requestHeader = (attaTeamCookie: string, attaTeamCsrfToken: string) => {
  return {
    // ':authority': 'atta-gitlab.xtrfr.cn',
    // ':method': 'GET',
    // ':path': '/atta-team/dev/mfe-user/mfe-user-crm/commits/master?limit=40&offset=0',
    // ':scheme': 'https',
    Accept: 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en,ru;q=0.9,zh-CN;q=0.8,zh;q=0.7',
    Cookie: attaTeamCookie,
    Referer:
      'https://atta-gitlab.xtrfr.cn/atta-team/dev/mfe-user/mfe-user-crm/commits/master',
    'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"macOS"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'X-Csrf-Token': attaTeamCsrfToken,
    'X-Requested-With': 'XMLHttpRequest',
  }
}

const requestHeadr4Detail = (attaTeamCookie: string) => {
  return {
    Accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en,ru;q=0.9,zh-CN;q=0.8,zh;q=0.7',
    'Cache-Control': 'max-age=0',
    Cookie: attaTeamCookie,
    Referer:
      'https://atta-gitlab.xtrfr.cn/atta-team/dev/mfe-user/mfe-user-crm/commits/master',
    'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"macOS"',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  }
}

export async function getCommitDetail(
  gitUrl: string,
  commitId: string,
  attaTeamCookie: string,
) {
  const key = gitUrl.split(':')[1].replace(/\.git$/, '')
  const url = `https://atta-gitlab.xtrfr.cn/${key}/commit/${commitId}`
  // 示例: https://atta-gitlab.xtrfr.cn/atta-team/dev/mfe-user/mfe-user-crm/commit/75fc10dd13d8fa5ad5f02824fed442be637b8c02

  const response = await axios.get(url, { headers: requestHeadr4Detail(attaTeamCookie) })
  return response.data
}

export async function getCommitHistory(
  gitUrl: string,
  limit: number,
  offset: number,
  attaTeamCookie: string,
  attaTeamCsrfToken: string,
): Promise<any> {
  const key = gitUrl.split(':')[1].replace(/\.git$/, '')
  const url = `https://atta-gitlab.xtrfr.cn/${key}/commits/master?limit=${limit}&offset=${offset}`
  // 示例: `https://atta-gitlab.xtrfr.cn/atta-team/dev/mfe-user/mfe-user-crm/commits/master?limit=${limit}&offset=${offset}`

  const response = await axios.get(url, {
    headers: requestHeader(attaTeamCookie, attaTeamCsrfToken),
  })
  return response.data
}

// 提取结构化数据
export type Commits = {
  commitDate: string
  commitNumber: number
  commits: Commit[]
}[]

export type Commit = {
  author: string
  message: string
  commitId: string
}

export type CommitDetail = {
  commitId: string
  // commitTitle: string
  additions: number
  deletions: number
}

export function parse4Commits(html: string) {
  const jsDom = new JSDOM('')
  const window = jsDom.window
  const DOMPurify = createDOMPurify(window)
  // 使用DOMPurify清理HTML
  const cleanHtml = DOMPurify.sanitize(html)

  // 使用JSDOM解析HTML
  const dom = new JSDOM(cleanHtml)
  const document = dom.window.document

  const commitHeaders = document.querySelectorAll('.commit-header')
  const dataDays = Array.prototype.slice.call(commitHeaders).map(el => {
    const commitDate = el.getAttribute('data-day')
    const commitNumber = el.querySelector('.commits-count')?.textContent
    return { commitDate, commitNumber }
  })

  const commitsRows = document.querySelectorAll('.commits-row')
  const commitsByDate: Commits = Array.prototype.slice
    .call(commitsRows)
    .map(el =>
      Array.prototype.slice.call(el.querySelectorAll('.commit')).map(el => {
        const commitId = _.trim(
          _.last(
            _.split(el.querySelector('a.commit-row-message')?.getAttribute('href'), '/'),
          ),
        )
        const message = _.trim(
          el.querySelector('a.commit-row-message.item-title')?.textContent,
        )
        const author = el.querySelector('.commit-author-link')?.textContent
        return { message, author, commitId }
      }),
    )
    .reduce((acc, el, index) => {
      acc.push({ ...dataDays[index], commits: el })
      return acc
    }, [] as { commitDate: string; commitNumber: number; commits: Commit[] }[])

  return commitsByDate
}

export function parse4Commit(html: string) {
  const jsDom = new JSDOM('')
  const window = jsDom.window
  const DOMPurify = createDOMPurify(window)
  // 使用DOMPurify清理HTML
  const cleanHtml = DOMPurify.sanitize(html)

  // 使用JSDOM解析HTML
  const dom = new JSDOM(cleanHtml)
  const document = dom.window.document

  // const commitTitle = _.trim(
  //   document.querySelector('.commit-title')?.textContent as string,
  // )

  const commitId = _.trim(
    _.last(
      _.split(
        document.querySelector('.breadcrumbs-sub-title a')?.getAttribute('href'),
        '/',
      ),
    ),
  )

  const diffStatsNode = document.querySelector('#diff-stats')
  const additions =
    _.trim(diffStatsNode?.querySelector('.cgreen')?.textContent as string).match(
      /\d+/,
    )?.[0] ?? 0
  const deletions =
    _.trim(diffStatsNode?.querySelector('.cred')?.textContent as string).match(
      /\d+/,
    )?.[0] ?? 0
  return { commitId, /* commitTitle, */ additions, deletions } as CommitDetail
}
