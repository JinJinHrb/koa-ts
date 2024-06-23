import { Post, JsonController, Body, Controller } from 'routing-controllers'
import { SessionsService } from '../services'
import { Service } from 'typedi'
import {
  IFileState,
  findDuplicateFiles,
  listFilteredFilesPromise,
  searchNodeModules,
} from 'app/helpers/fsUtils'
import fs from 'fs'
import path from 'path'

@JsonController()
@Service()
@Controller('/files')
export class FilesController {
  constructor(private sessionsService: SessionsService) {}

  @Post('/searchNodeModules')
  async searchNodeModules(@Body() params: { folderPath: string }) {
    const { folderPath } = params
    return await searchNodeModules(folderPath, ['stack-utils'])
  }

  @Post('/findDuplicates')
  async findDuplicates(@Body() params: { folderPath: string }) {
    const { folderPath } = params
    const [duplicateFiles, abnormalFiles] = await findDuplicateFiles(folderPath)
    return { duplicateFiles, abnormalFiles }
  }

  @Post('/appendSuffix')
  async appendSuffix(@Body() params: any) {
    const { folderPath, suffix } = params
    const candidates = (
      (await listFilteredFilesPromise({
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
    ).filter(a => !a.endsWith(`.${suffix}`))

    const promises = candidates.map(
      str =>
        new Promise((r, j) => {
          const a = str.replace('(null)', '')
          const oldPath = path.join(folderPath, a)
          const newPath = path.join(folderPath, `${a}.${suffix}`)
          fs.rename(oldPath, newPath, function (err) {
            if (err) console.log('ERROR: ', err)
          })
          r(newPath)
        }),
    )

    const result = await Promise.all(promises)

    return { result }
  }
}
