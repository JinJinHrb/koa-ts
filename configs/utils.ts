import fs from 'fs'
import _ from 'lodash'

interface Dict {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [name: string]: Function
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const dictToArray = (dict: Dict): Array<Function> =>
  Object.keys(dict).map(name => dict[name])

export const print = {
  log: (text: string) => console.log('\x1b[37m%s \x1b[2m%s\x1b[0m', '>', text),
  danger: (text: string) => console.log('\x1b[31m%s \x1b[31m%s\x1b[0m', '>', text),
  tip: (text: string) => console.log('\x1b[36m%s \x1b[36m%s\x1b[0m', '>', text),
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

export const getFileDataPromise = (filePath: string, encoding?: string) => {
  return new Promise(function (rsv, rej) {
    const cb = function (err: Error, data: unknown) {
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
