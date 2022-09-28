import { localChromiumPath } from 'configs/puppeteer.config'
import { print } from 'configs/utils'
import puppeteer from 'puppeteer'
export class InitPuppeteerService {
  static instance: InitPuppeteerService
  static browser?: puppeteer.Browser

  static getInstance(name: string) {
    if (!InitPuppeteerService.instance) {
      InitPuppeteerService.instance = new InitPuppeteerService(name)
    }
    return InitPuppeteerService.instance
  }

  name = ''

  constructor(name: string) {
    this.name = name
  }

  async getBrowser() {
    if (!InitPuppeteerService.browser) {
      InitPuppeteerService.browser = await puppeteer.launch({
        executablePath: localChromiumPath,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      InitPuppeteerService.browser.on('disconnected', this.browserDisconnect)
    }
    return InitPuppeteerService.browser
  }

  async browserDisconnect(e: puppeteer.EventType) {
    print.danger(`browserDisconnect e: ${e?.toString()}`)
    const browser = InitPuppeteerService.browser
    if (!browser) {
      return
    }
    try {
      await browser.close()
      InitPuppeteerService.browser = undefined
    } catch (e) {
      print.danger(`browser.close() error: ${(e as Error).message}`)
    }
  }

  print() {
    print.log(`puppeteer name: ${this.name}`)
  }
}
