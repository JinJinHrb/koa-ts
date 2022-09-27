import {
  BadRequestError,
  Post,
  JsonController,
  BodyParam,
  Get,
} from 'routing-controllers'
import { InitPuppeteerService } from '../services'
import { Prisma } from '@prisma/client'
import { Service } from 'typedi'

@JsonController()
@Service()
export class PreviewController {
  // constructor(private initPuppeteerService: InitPuppeteerService) {}

  @Get('/preview')
  async query() {
    const myPuppeteer = InitPuppeteerService.getInstance('myPuppeteer')
    return [{ name: myPuppeteer.name, ts: '2022-09-27 14:57:23' }]
  }
}
