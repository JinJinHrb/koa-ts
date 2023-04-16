import {
  BadRequestError,
  Post,
  JsonController,
  BodyParam,
  Get,
  Param,
  QueryParams,
  Body,
} from 'routing-controllers'
import { SessionsService } from '../services'
import { Prisma } from '@prisma/client'
import { Service } from 'typedi'
// import { validateOnServer } from '../lib/formily.json-schema.umd.development'
import { validateOnServer } from '../lib/formily.json-schema.umd.staging'
import schema20221124 from '../mock/schema20221124'
import data20221124 from '../mock/data20221124'
import dayjs from 'dayjs'

@JsonController()
@Service()
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Get('/sessions')
  async query() {
    const date1 = new Date()
    const date2 = new Date()
    date2.setMinutes(date2.getMinutes() + 180)
    date2.setDate(date2.getDate() + 999)
    const d1 = dayjs(date1)
    const d2 = dayjs(date2)
    return [{ difference: d2.diff(d1, 'day', true) }]
  }

  @Post('/sessions')
  async create(
    @BodyParam('username') name: string,
  ): Promise<Prisma.SessionGetPayload<any>> {
    if (!name) {
      throw new BadRequestError('username is required')
    }
    return await this.sessionsService.create({ name })
  }

  @Post('/validate')
  async validate(@Body() params: unknown) {
    const result = await validateOnServer(schema20221124, data20221124)
    console.log('#41 result:', result)
    return { message: 'OK', result }
  }
}
