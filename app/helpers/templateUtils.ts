import _ from 'lodash'
import { genId } from './stringUtil'
import { getFileData } from './fsUtils'

export const parseBackendTemplate = async (filePath: string) => {
  const warnings: string[] = []
  const txt = (await getFileData(filePath)) as unknown as string
  const collection = txt
    .split('\n')
    .map(a => JSON.parse(a))
    .map(a => {
      if (/^\s|\s$/.test(a.template)) {
        a.template = _.trim(a.template)
      }
      if (!_.startsWith(a.template, '{') || !_.endsWith(a.template, '}')) {
        return a
      }
      let isParseDone = false
      let caseFlag = 0
      while (!isParseDone) {
        try {
          if (caseFlag === 1) {
            a.template = a.template.replace(/\n/g, '')
          } else if (caseFlag === 2) {
            a.template = a.template.replace(/,\}\}$/, '}}')
          }
          const template = JSON.parse(a.template)
          a.template = template
          isParseDone = true
          if (caseFlag === 1) {
            warnings.push(`#62 caseFlag === 1 templateName:, ${a.templateName}`)
          } else if (caseFlag === 2) {
            warnings.push(`#65 caseFlag === 2 templateName:, ${a.templateName}`)
          }
        } catch (e) {
          caseFlag++
          if (caseFlag > 2) {
            warnings.push(`#78 caseFlag > 2 templateName:, ${a.templateName}`)
            a.template = a.template.replace(/,\}\}$/, '}}')
            isParseDone = true
          }
        }
      }

      return a
    })
  return { warnings, collection }
}

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

const hasChinese = (str: string) => {
  const chRegex = /[\u4e00-\u9fa5]/ // 中文字符集
  return chRegex.test(str)
}

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

type Dict = Record<string, string>

/** findChineseSubstringsInTemplate 的配套方法 */
const findChineseInTemplateHelper = (subValue: string, dict: Dict) => {
  const temp = findChineseSubstrings(subValue)
  if (!_.isEmpty(temp.parsed)) {
    let text = temp.text
    let diff = 0
    for (const { start, end, sub } of temp.parsed) {
      if (!sub || !hasChinese(sub)) {
        console.log('#74 sub:', `"${sub}"`, 'temp:', temp)
      } else {
        // case1 Start
        let toReplace = ''
        if ((dict as Dict)[sub]) {
          toReplace = (dict as Dict)[sub]
        } else {
          toReplace = genId()
          ;(dict as Dict)[sub] = toReplace
        }
        // case1 End

        // case2 Start
        // let toReplace = genId()
        // ;(dict as Dict)[toReplace] = sub
        // case2 End

        toReplace = `#{${toReplace}}`
        text = replaceText(text, start + diff, end + 1 + diff, toReplace)
        diff += toReplace.length - end - 1 + start
      }
    }
    // ;(value as any)[k] = text
    return text
  }
  return null
}

export const fillInHelper = (str: string, map: Record<string, string>) => {
  // const regex = /\#\{([^(\{|\})]*?)\}/g
  const regex = /#\{(.*?)\}/g
  let match: RegExpExecArray | null
  const arr: string[][] = []
  while ((match = regex.exec(str)) !== null) {
    const key = match[1]
    const value = map[key]
    if (!value) {
      console.log('#164 missing key:', key)
      continue
    }
    arr.push([match[0], value])
  }
  arr.forEach(([toReplace, substitute]) => {
    str = str.replace(toReplace, substitute)
  })
  return str
}

export const fillInTemplateWithDict = (
  value: object | string,
  map: Record<string, string>,
) => {
  if (_.isString(value)) {
    return fillInHelper(value, map)
  }
  if (!_.isObject(value)) {
    return map
  }
  Object.keys(value).forEach(k => {
    const subValue = (value as any)[k] as object | string
    if (_.isObject(subValue)) {
      fillInTemplateWithDict((value as any)[k] as object, map)
    } else if (_.isString(subValue) && !isHyperlink(subValue)) {
      const text = fillInHelper(subValue, map as Dict)
      if ((value as any)[k] !== text) {
        ;(value as any)[k] = text
      }
    }
  })
  return value
}

export const findChineseSubstringsInTemplate = (
  value: object | string,
  dict?: Record<string, string>,
) => {
  if (_.isNil(dict)) {
    dict = {}
  }
  if (_.isString(value)) {
    return findChineseInTemplateHelper(value, dict)
  }
  if (!_.isObject(value)) {
    return dict
  }
  Object.keys(value).forEach(k => {
    const subValue = (value as any)[k] as object | string
    if (_.isObject(subValue)) {
      findChineseSubstringsInTemplate((value as any)[k] as object, dict)
    } else if (_.isString(subValue) && !isHyperlink(subValue)) {
      /* const temp = findChineseSubstrings(subValue)
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
      } */
      const text = findChineseInTemplateHelper(subValue, dict as Dict)
      if (!_.isNil(text)) {
        ;(value as any)[k] = text
      }
    }
  })
  return dict
}
