import {
  BadRequestError,
  Post,
  JsonController,
  BodyParam,
  Get,
} from 'routing-controllers'
import { PuppeteerService } from '../services'
import { Prisma } from '@prisma/client'
import { Service } from 'typedi'

@JsonController()
@Service()
export class PreviewController {
  @Get('/preview')
  async query() {
    const myPuppeteer = PuppeteerService.getInstance('myPuppeteer')
    try {
      const browser = await myPuppeteer.getBrowser()
      return { name: myPuppeteer.name, browser }
    } catch (error) {
      return { name: myPuppeteer.name, error }
    }
  }
}
