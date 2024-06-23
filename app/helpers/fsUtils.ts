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
  absPath?: string
  depth?: number
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

export const getFileDataSync = (filePath: string, encoding?: string) => {
  if (encoding === 'buffer') {
    return fs.readFileSync(filePath)
  } else {
    if (!encoding) {
      encoding = 'utf8'
    }
    return fs.readFileSync(filePath, { encoding } as any)
  }
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

interface IlistFilteredFilesParams {
  folderPath: string
  filterHandler?: TFilterHandler
  folderFilterHandler?: (str: string) => boolean
  mapHandler?: (state: IFileState) => Partial<IFileState> | string
  isRecur?: boolean
}

/**
 * 广度优先遍历文件夹查找文件
 */
export const listFilteredFilesPromise = ({
  folderPath,
  filterHandler,
  folderFilterHandler,
  mapHandler,
  isRecur,
}: IlistFilteredFilesParams) => {
  // 当 stats.sameLevel 长度为零时进入下一层，stats.nextLevel（下一层）长度为零时结束程序
  const recurHandler = function (
    rsv: (value: unknown) => void,
    rej: (value: unknown) => void,
    subFolderPath: string,
    filterHandler?: TFilterHandler,
    stats: {
      depth: number
      results: IFileState[]
      sameLevel: string[]
      nextLevel: string[]
    } = { depth: 0, results: [], sameLevel: [], nextLevel: [] },
  ) {
    listStatsPromise(subFolderPath, a => a.directoryFlag ?? false)
      .then(feed => {
        ;(feed || []).forEach(a => {
          const folderPath = pathUtil.resolve(subFolderPath, a.fname as string)
          if (!_.isFunction(folderFilterHandler) || folderFilterHandler(folderPath)) {
            stats.nextLevel.push(folderPath)
          }
        })
        if (_.isFunction(subFolderPath) && !folderFilterHandler?.(subFolderPath)) {
          return []
        }
        return listStatsPromise(subFolderPath, filterHandler)
      })
      .then(feed => {
        ;(feed || []).forEach(b => {
          const a: IFileState = b
          a.absPath = pathUtil.resolve(subFolderPath, a.fname as string)
          a.depth = stats.depth
          stats.results.push(a)
        })
        if (stats.sameLevel.length > 0) {
          const nextFolderPath = stats.sameLevel.shift() as string
          recurHandler(rsv, rej, nextFolderPath, filterHandler, stats)
          return Promise.reject(null)
        }
        if (stats.nextLevel.length < 1 || !isRecur) {
          if (_.isFunction(mapHandler)) {
            rsv((stats.results || []).map(mapHandler))
          } else rsv(stats.results || [])
          return Promise.reject(null)
        }
        stats.sameLevel = stats.nextLevel
        stats.nextLevel = []
        stats.depth = stats.depth + 1
        const nextFolderPath = stats.sameLevel.shift() as string
        recurHandler(rsv, rej, nextFolderPath, filterHandler, stats)
      })
      .then(null, err => {
        if (!err) {
          return
        }
        rej(err)
      })
  }
  return new Promise((rsvRoot, rejRoot) => {
    recurHandler(rsvRoot, rejRoot, folderPath, filterHandler)
  })
}

interface Pair<V> {
  [key: string]: V
}

interface DuplicateFiles {
  [key: string]: string[]
}

export const findDuplicateFiles = async (
  folderPath: string,
): Promise<[DuplicateFiles, IFileState[]]> => {
  const obj: Pair<string> = {}
  const duplicateFiles: DuplicateFiles = {}
  const abnormalFiles: IFileState[] = []
  await listFilteredFilesPromise({
    folderPath,
    filterHandler: (
      value: IFileState,
      index?: number | undefined,
      array?: IFileState[] | undefined,
    ) => {
      if (typeof value.fname === 'string') {
        if (obj[value.fname]) {
          if (!duplicateFiles[value.fname]) {
            duplicateFiles[value.fname] = [obj[value.fname]]
          }
          duplicateFiles[value.fname].push(value.absPath as string)
        } else {
          obj[value.fname] = value.absPath as string
        }
      } else if (!value.fname) {
        abnormalFiles.push(value)
      }
      return true
    },
    isRecur: true,
  })
  return [duplicateFiles, abnormalFiles]
}

type TFilterHandler = (value: IFileState, index?: number, array?: IFileState[]) => boolean

/**
 * getFsStatPromise() 返回结果基础上
 * 添加额外字段
 * life, fname, fileFlag, directoryFlag, symbolicLinkFlag
 */
export const listStatsPromise = async (
  folderPath: string,
  filterHandler?: TFilterHandler,
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
            elem.absPath = pathUtil.resolve(folderPath, elem.fname)
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

export const writeJson = async (filePath: string) => {
  const dirPath = pathUtil.resolve(
    __dirname.slice(0, __dirname.indexOf('app')),
    './app/mock/graphNodes/mfe-user-crm',
  )
  mkdirSync(dirPath)
  // const filePath = pathUtil.resolve(dirPath, 'demo.json')

  const jsonData = { a: 1, b: 2, c: { c1: 11, c2: 12 } }

  // 格式化JSON数据
  const formattedJson = JSON.stringify(jsonData, null, 2)

  // 将格式化后的JSON数据写入到另一个文件中
  return await new Promise((rsv, rej) => {
    fs.writeFile(filePath, formattedJson, 'utf8', err => {
      if (err) {
        // console.error('Error writing file:', err)
        rej(err)
        return
      }
      // console.log('File has been written successfully!')
      rsv({ message: 'OK', filePath })
    })
  })
}

export function findGitRepo(startPath: string) {
  let currentPath = startPath

  while (true) {
    const gitPath = pathUtil.join(currentPath, '.git')
    if (fs.existsSync(gitPath) && fs.lstatSync(gitPath).isDirectory()) {
      return currentPath
    }

    const parentPath = pathUtil.dirname(currentPath)
    if (parentPath === currentPath) {
      // 已经到达文件系统的根目录，没有找到 .git 文件夹
      return null
    }

    currentPath = parentPath
  }
}
