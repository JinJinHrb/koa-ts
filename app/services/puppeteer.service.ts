import { localChromiumPath } from 'configs/puppeteer.config'
import puppeteer from 'puppeteer'
export class InitPuppeteerService {
  static instance: InitPuppeteerService
  static browser: puppeteer.Browser

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
    }
    return InitPuppeteerService.browser
  }

  print() {
    console.log('myName: ' + this.name)
  }
}
