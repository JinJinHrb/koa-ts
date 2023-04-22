import fs from 'fs'
import _ from 'lodash'
import dayjs from 'dayjs'
import pathUtil from 'path'

interface Dict {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [name: string]: Function
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const dictToArray = (dict: Dict): Array<Function> =>
  Object.keys(dict).map(name => dict[name])

export interface IFileState extends fs.Stats {
  life?: number
  lifeInDay?: number
  fname?: string
  fileFlag?: boolean
  directoryFlag?: boolean
  symbolicLinkFlag?: boolean
}

export const print = {
  log: (text: string) => console.log('\x1b[37m%s \x1b[2m%s\x1b[0m', '>', text),
  danger: (text: string) => console.log('\x1b[31m%s \x1b[31m%s\x1b[0m', '>', text),
  tip: (text: string) => console.log('\x1b[36m%s \x1b[36m%s\x1b[0m', '>', text),
}

export const isDirectory = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    return false
  }
  return fs.lstatSync(filePath).isDirectory()
}

export const isFile = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    return false
  }
  return fs.lstatSync(filePath).isFile()
}

export const getFileSeparator = (filePath: string) => {
  if (!filePath) {
    filePath = ''
  }
  const regex = new RegExp('^[C-Z]:\\\\')
  if (regex.test(filePath)) {
    return '\\'
  } else {
    return '/'
  }
}

/**
 * 创建文件夹
 * @param path 文件夹路径
 * @param mode 文件权限
 */
export const mkdirSync = function (path: string, mode = 0o755) {
  const fileSeparator = getFileSeparator(path)
  const arr = path.split(fileSeparator)
  if (_.isEmpty(arr)) {
    throw new Error(`mkdirSync(path, mode) invalid path: ${path}`)
  }
  if (arr[0] === '.') {
    // 处理 ./aaa
    arr.shift()
  }
  if (arr[0] === '..') {
    // 处理 ../ddd/d
    arr.splice(0, 2, arr[0] + fileSeparator + arr[1])
  }
  function inner(cur: string) {
    if (cur && !fs.existsSync(cur)) {
      // 不存在就创建一个
      fs.mkdirSync(cur, mode)
    }
    if (arr.length) {
      inner(cur + fileSeparator + arr.shift())
    }
  }
  arr.length && inner(arr.shift() as string)
}

export const getFileData = (filePath: string, encoding?: string) => {
  return new Promise<Buffer>(function (rsv, rej) {
    const cb = function (err: Error, data: Buffer) {
      if (err) {
        return rej(err)
      }
      rsv(data)
    }
    const readFileArgs = [filePath] as unknown[]
    if (encoding === 'buffer') {
      readFileArgs.push(cb)
    } else {
      if (!encoding) {
        encoding = 'utf8'
      }
      readFileArgs.push({ encoding })
      readFileArgs.push(cb)
    }
    fs.readFile.apply(null, readFileArgs as any)
  })
}

/**
    {
        "dev": 16777220,
        "mode": 33188,
        "nlink": 1,
        "uid": 501,
        "gid": 20,
        "rdev": 0,
        "blksize": 4096,
        "ino": 8681252608,
        "size": 749,
        "blocks": 8,
        "atimeMs": 1613981881519.3804,
        "mtimeMs": 1613707237644.048,
        "ctimeMs": 1613707237644.048,
        "birthtimeMs": 1612758207941.1287,
        "atime": "2021-02-22T08:18:01.519Z",
        "mtime": "2021-02-19T04:00:37.644Z",
        "ctime": "2021-02-19T04:00:37.644Z",
        "birthtime": "2021-02-08T04:23:27.941Z",
    }
 * */
export const getFsStatPromise = (filePath: string) => {
  return new Promise<IFileState>((rsv, rej) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return rej(err)
      }
      const elem = stats as IFileState
      const thisDay = dayjs(new Date())
      if (elem.birthtime instanceof Date) {
        const fileBirthDay = dayjs(elem.birthtime)
        elem.life = thisDay.diff(fileBirthDay)
        elem.lifeInDay = thisDay.diff(fileBirthDay, 'day')
      }
      elem.fname = pathUtil.basename(filePath)
      elem.fileFlag = elem.isFile()
      elem.directoryFlag = elem.isDirectory()
      elem.symbolicLinkFlag = elem.isSymbolicLink()
      rsv(stats)
    })
  })
}

/**
 * 获取文件内容
 * @param encoding 默认 utf8；获取二进制数据，请用 buffer
 */
export const getFileDataPromise = (filePath: string, encoding: string) => {
  return new Promise<Buffer>((rsv, rej) => {
    const cb = function (err: NodeJS.ErrnoException | null, data: Buffer) {
      if (err) {
        return rej(err)
      }
      rsv(data)
    }

    type argsType = Parameters<typeof fs.readFile>
    const readFileArgs: [
      string,
      (
        | undefined
        | argsType[1]
        | {
            encoding?: string
          }
      ),
      undefined | argsType[1],
    ] = [filePath, undefined, undefined]
    if (encoding === 'buffer') {
      readFileArgs[1] = cb
    } else {
      if (!encoding) {
        encoding = 'utf8'
      }
      readFileArgs[1] = { encoding }
      readFileArgs[2] = cb
    }
    fs.readFile.apply(this, readFileArgs as unknown as argsType)
  })
}

/**
 * getFsStatPromise() 返回结果基础上
 * 添加额外字段
 * life, fname, fileFlag, directoryFlag, symbolicLinkFlag
 */
export const listStatsPromise = async (
  folderPath: string,
  filterHandler?: (value: IFileState, index?: number, array?: IFileState[]) => boolean,
) => {
  return new Promise<IFileState[] | undefined>((rsv_root, rej_root) => {
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
          rsv_root(undefined)
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
