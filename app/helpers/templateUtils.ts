import _ from 'lodash'
import { genId } from './stringUtil'

export function reverseObject(obj: Record<string, any>): Record<string, any> {
  const entries = Object.entries(obj)
  const reversedEntries = entries.reverse()
  return reversedEntries.reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {})
}

function isHyperlink(str: string) {
  const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  return regex.test(str)
}

function replaceText(str: string, start: number, end: number, newStr: string) {
  return str.slice(0, start) + newStr + str.slice(end)
}

type StartEndResult = { start: number; end: number; sub: string }

export function findChineseSubstrings(str: string) {
  const chRegex = /[\u4e00-\u9fa5]/ // 中文字符集
  if (!chRegex.test(str)) {
    return {
      text: str,
      parsed: [],
    }
  }

  // 中文 + 英文 + 常用标点符号（，”“、：。）
  const regex =
    /[\u4e00-\u9fa5|\u0020-\u007F|\uff0c|\u201c|\u201d|\u3001|\u3002|\uff1f|\uff1a]/g
  const result: StartEndResult[] = []
  let match: RegExpExecArray | null

  let startIndex = -1,
    lastIndex = -1
  while ((match = regex.exec(str)) !== null) {
    if (startIndex < 0) {
      startIndex = match.index
    }
    if (match.index - lastIndex === 1) {
      lastIndex = match.index
    } else {
      result.push({
        start: startIndex,
        end: lastIndex,
        sub: str.slice(startIndex, lastIndex + 1),
      })
      startIndex = match.index
      lastIndex = match.index
    }
  }
  if (startIndex > -1 && lastIndex > -1) {
    result.push({
      start: startIndex,
      end: lastIndex,
      sub: str.slice(startIndex, lastIndex + 1),
    })
  }

  return {
    text: str,
    parsed: result,
  }
}

type Dict = { [text: string]: string }

export const findChineseSubstringsInTemplate = (
  value: object | string,
  dict?: { [text: string]: string },
) => {
  if (_.isNil(dict)) {
    dict = {}
  }
  if (!_.isObject(value)) {
    return dict
  }
  Object.keys(value).forEach(k => {
    const subValue = (value as any)[k] as object | string
    if (_.isObject(subValue)) {
      findChineseSubstringsInTemplate((value as any)[k] as object, dict)
    } else if (_.isString(subValue) && !isHyperlink(subValue)) {
      const temp = findChineseSubstrings(subValue)
      if (!_.isEmpty(temp.parsed)) {
        let text = temp.text
        let diff = 0
        for (const { start, end, sub } of temp.parsed) {
          if (!sub) {
            console.log('#74', temp)
          } else {
            // let toReplace = ''
            // if ((dict as Dict)[sub]) {
            //   toReplace = (dict as Dict)[sub]
            // } else {
            //   toReplace = genId()
            //   ;(dict as Dict)[sub] = toReplace
            // }
            let toReplace = genId()
            ;(dict as Dict)[toReplace] = sub
            toReplace = `#{${toReplace}}`
            text = replaceText(text, start + diff, end + 1 + diff, toReplace)
            diff += toReplace.length - end - 1 + start
          }
        }
        ;(value as any)[k] = text
      }
    }
  })
  return dict
}
