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
import { listFilteredFilesPromise } from 'app/helpers/fsUtils'
import fs from 'fs'
import path from 'path'

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

  @Post('/rename')
  async rename(@Body() params: any) {
    const { folderPath } = params
    const candidates = (await listFilteredFilesPromise({
      filterHandler: a => (a.fname !== '.DS_Store' ? a.fileFlag ?? false : false),
      folderPath,
      isRecur: false,
      mapHandler: a => {
        //   {
        //     "dev": 16777220,
        //     "mode": 33188,
        //     "nlink": 1,
        //     "uid": 501,
        //     "gid": 20,
        //     "rdev": 0,
        //     "blksize": 4096,
        //     "ino": 181028743,
        //     "size": 8196,
        //     "blocks": 24,
        //     "atimeMs": 1710750095827.3193,
        //     "mtimeMs": 1710743304000,
        //     "ctimeMs": 1710749980485.7163,
        //     "birthtimeMs": 1710743304000,
        //     "atime": "2024-03-18T08:21:35.827Z",
        //     "mtime": "2024-03-18T06:28:24.000Z",
        //     "ctime": "2024-03-18T08:19:40.486Z",
        //     "birthtime": "2024-03-18T06:28:24.000Z",
        //     "life": 20681007,
        //     "lifeInDay": 0,
        //     "fname": ".DS_Store",
        //     "fileFlag": true,
        //     "directoryFlag": false,
        //     "symbolicLinkFlag": false,
        //     "absPath": "/Users/alexwang/Downloads/xTransfer/静态资源/一系列小图片/.DS_Store",
        //     "depth": 0
        // }
        return a.fname as string
      },
    })) as string[]

    const promises = candidates.map(a =>
      a.includes('&') || a.includes('/') || a.includes('\\') || /\.{2,}|\s/.test(a)
        ? new Promise((r, j) => {
            const oldPath = path.join(folderPath, a)
            const b = encodeURIComponent(a)
              .replace(/\.{2,}/g, '.')
              .replace(/\s/g, '')
            const newPath = path.join(folderPath, b)
            fs.rename(oldPath, newPath, function (err) {
              if (err) console.log('ERROR: ' + err)
            })
            r(b)
          })
        : a,
    )

    const result = await Promise.all(promises)

    return { result }
  }
}
