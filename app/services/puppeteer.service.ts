import {
  chromeExtensions,
  localChromiumPath,
  MAX_PAGE_POOL_SIZE,
} from 'configs/puppeteer.config'
import { TPageWrapper, TOccupiedPageInfo } from './types.d'
import { print } from 'configs/utils'
import puppeteer, { Page, PDFOptions } from 'puppeteer'
import _ from 'lodash'

const BLANK_HREF = 'about:blank'

export class PuppeteerService {
  static instance: PuppeteerService
  static browser?: puppeteer.Browser

  // 请注意 pagePool 与 occupiedPageInfo 的同步关系!
  static pagePool: Page[] = []
  static occupiedPageInfo: TOccupiedPageInfo = {} // 记录数组下标对应具体的url

  static getInstance(name: string) {
    if (!PuppeteerService.instance) {
      PuppeteerService.instance = new PuppeteerService(name)
    }
    return PuppeteerService.instance
  }

  name = ''

  constructor(name = 'default') {
    this.name = name
  }

  async getBrowser() {
    if (!PuppeteerService.browser) {
      const extStr = chromeExtensions.join(',')
      const args = ['--no-sandbox', '--disable-setuid-sandbox']
      if (!_.isEmpty(extStr)) {
        args.push(`--disable-extensions-except=${extStr}`)
      }
      PuppeteerService.browser = await puppeteer.launch({
        executablePath: localChromiumPath,
        headless: _.isEmpty(extStr),
        args,
      })
      PuppeteerService.browser.on('disconnected', this.browserDisconnect)
    }
    return PuppeteerService.browser
  }

  async browserDisconnect(e: puppeteer.EventType) {
    e && print.danger(`browserDisconnect e: ${e?.toString()}`)
    const browser = PuppeteerService.browser
    if (!browser) {
      return
    }
    PuppeteerService.occupiedPageInfo = {}
    PuppeteerService.pagePool = []
    try {
      await browser.close()
      PuppeteerService.browser = undefined
    } catch (e) {
      print.danger(`browser.close() error: ${(e as Error).message}`)
    }
  }

  async visitPage(
    url: string,
    doSomething: (myPage: TPageWrapper) => unknown,
    timeout = 10000,
  ) {
    const myPage = await this.getPageFromPool()
    let result: unknown
    try {
      await myPage.page.goto(url, { timeout })
      if (!myPage.isTemp) {
        if (!_.isNumber(myPage.occupiedIndex) || myPage.occupiedIndex < 0) {
          throw new Error(
            `visitPage myPage.occupiedIndex is invalid: ${myPage.occupiedIndex}`,
          )
        }
        // 如果是从 pagePool 中来的，记录 url
        PuppeteerService.occupiedPageInfo[myPage.occupiedIndex as number] = url
      }
      result = doSomething(myPage)
    } catch (e) {
      print.danger(`visitPage doSomething error: ${(e as Error).message}`)
    }
    if (myPage.isTemp) {
      try {
        myPage.page.close()
      } catch (e) {
        print.danger(`visitPage page.close() error: ${(e as Error).message}`)
      }
    } else if (_.isNumber(myPage.occupiedIndex) && myPage.occupiedIndex > -1) {
      delete PuppeteerService.occupiedPageInfo[myPage.occupiedIndex as number]
    }
    return result
  }

  async getPageFromPool() {
    const browser = await this.getBrowser()
    let isTemp = false // 判断之后是否要回收
    let page: Page
    const occupiedIndexes = Object.keys(PuppeteerService.occupiedPageInfo)
    let idleIndex = -1 // 从 pagePool 中分配的下标
    if (occupiedIndexes.length >= MAX_PAGE_POOL_SIZE) {
      isTemp = true // 没有空闲的新增临时的
      page = await browser.newPage()
    } else {
      for (let i = 0; i < MAX_PAGE_POOL_SIZE; i++) {
        if (_.isNil(occupiedIndexes[i])) {
          idleIndex = i
          break
        }
      }
      page = PuppeteerService.pagePool[idleIndex]
      if (_.isNil(page)) {
        // 若 pagePool 中不存在对应页，需要新建，url 预留空
        try {
          PuppeteerService.occupiedPageInfo[idleIndex] = BLANK_HREF
          page = await browser.newPage()
          PuppeteerService.pagePool[idleIndex] = page
        } catch (e) {
          print.danger(`browser.newPage() error: ${(e as Error).message}`)
        }
      }
    }
    const myPage: TPageWrapper = {
      page,
      isTemp,
    }
    if (!isTemp) {
      // 从 pagePool 中取到的页，必然存在对应的索引
      myPage.occupiedIndex = idleIndex
    }
    return myPage
  }

  async exportPdf(myPage: TPageWrapper, path: string, pdfOptions?: PDFOptions) {
    const page = myPage.page
    const options = {
      path,
      ...pdfOptions,
    }
    try {
      await page.pdf(options)
    } catch (e) {
      print.danger(`exportPdf error: ${(e as Error).message}`)
    }
  }

  inspect() {
    print.log(
      `puppeteer name: ${this.name}, occupiedPageInfo: ${JSON.stringify(
        PuppeteerService.occupiedPageInfo,
      )}, pagePool.length: ${
        PuppeteerService.pagePool.length
      }, chromeExtensions: ${JSON.stringify(chromeExtensions)}`,
    )
    return {
      chromeExtensions,
      'pagePool.length': PuppeteerService.pagePool.length,
      occupiedPageInfo: PuppeteerService.occupiedPageInfo,
    }
  }
}
