import { Service } from 'typedi'
import fs from 'fs'
import pathUtil from 'path'

@Service()
export class ToolsService {
  /**
   * getFsStatPromise() 返回结果基础上
   * 添加额外字段
   * life, fname, isFile, isDirectory, isSymbolicLink
   */
  async listStatsPromise(folderPath, filterHandler) {
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
            return new Promise<fs.Stats>(function (rsv, rej) {
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
            var now = new Date()
            ;(feed || []).forEach(function (elem, i) {
              if (elem.birthtime instanceof Date) {
                elem.life = hdlUtil.getTimeGap(elem.birthtime, now)
              }
              elem.fname = fileNames[i]
              elem.isFile = elem.isFile()
              elem.isDirectory = elem.isDirectory()
              elem.isSymbolicLink = elem.isSymbolicLink()
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
