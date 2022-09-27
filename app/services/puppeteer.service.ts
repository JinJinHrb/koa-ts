import { Service } from 'typedi'

@Service()
export class InitPuppeteerService {
  static instance

  static getInstance(name) {
      if (!InitPuppeteerService.instance) {
          InitPuppeteerService.instance = new InitPuppeteerService(name)
      }
      return InitPuppeteerService.instance
  }

  name = ''

  constructor(name) {
      this.name = name
  }

  print() {
      console.log('myName: ' + this.name)
  }
}
