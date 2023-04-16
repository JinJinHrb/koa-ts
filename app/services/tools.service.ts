import { Service } from 'typedi'
import fs from 'fs'
import pathUtil from 'path'
import dayjs from 'dayjs'

export interface IFileState extends fs.Stats {
  life?: number
  lifeInDay?: number
  fname?: string
  fileFlag?: boolean
  directoryFlag?: boolean
  symbolicLinkFlag?: boolean
}

@Service()
export class ToolsService {
  /**
   * getFsStatPromise() 返回结果基础上
   * 添加额外字段
   * life, fname, fileFlag, directoryFlag, symbolicLinkFlag
   */
  async listStatsPromise(
    folderPath: string,
    filterHandler?: (value: IFileState, index?: number, array?: IFileState[]) => boolean,
  ) {
    return new Promise((rsv_root, rej_root) => {
      let fileNames: string[] = []
      new Promise<string[]>(function (rsv, rej) {
        fs.readdir(folderPath, function (err, rsp) {
          if (err) {
            return rej(err)
          }
          rsv(rsp)
        })
      })
        .then(function (feed) {
          if (feed.length < 1) {
            rsv_root(null)
            return Promise.reject(null)
          }
          fileNames = feed
          const q_all = feed.map(function (elem) {
            return new Promise<IFileState>(function (rsv, rej) {
              fs.stat(`${folderPath}${pathUtil.sep}${elem}`, function (err, rsp) {
                if (err) {
                  return rej(err)
                }
                rsv(rsp)
              })
            })
          })
          return Promise.all(q_all)
        })
        .then(
          function (feed) {
            const thisDay = dayjs(new Date())
            ;(feed || []).forEach(function (elem, i) {
              if (elem.birthtime instanceof Date) {
                const fileBirthDay = dayjs(elem.birthtime)
                elem.life = thisDay.diff(fileBirthDay)
                elem.lifeInDay = thisDay.diff(fileBirthDay, 'day')
              }
              elem.fname = fileNames[i]
              elem.fileFlag = elem.isFile()
              elem.directoryFlag = elem.isDirectory()
              elem.symbolicLinkFlag = elem.isSymbolicLink()
            })
            if (filterHandler && filterHandler instanceof Function) {
              feed = feed.filter(filterHandler)
            }
            rsv_root(feed)
          },
          err => {
            if (!err) {
              return
            }
            rej_root(err)
          },
        )
    })
  }
}
