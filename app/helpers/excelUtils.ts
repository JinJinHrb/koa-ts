import * as ExcelJS from 'exceljs'
import { print } from './fsUtils'
import PLimit from './pLimitUtil'
import { cacheTranslation, translate } from './translateUtils'
import {
  isLink,
  insertStringBeforeLastDot,
  replaceCurlyBrackets,
  resumeCurlyBrackets,
  replaceDollarCurlyBrackets,
  resumeDollarCurlyBrackets,
} from './stringUtil'
import _ from 'lodash'

/**
 * 2024-02-06 补救：
 * 1. 将第2列的英文翻译放到第5列
 * 2. 将第2列的文本改为 "TEXT"
 * */
export const switch2Columns = async (
  filePath: string,
  index1: number,
  index2: number,
) => {
  const { data: contents1, contents: contents2 } = (await readColumns(
    filePath,
    1,
    index1,
    index2,
  )) as any

  const data = contents1
    .slice(1) // 跳过第一行
    .map((text: string, resultIndex: number) => {
      return {
        rowIndex: resultIndex + 1, // 跳过第一行
        columnIndex: index2,
        value: text,
      }
    })
    .filter((a: any) => a)

  const data2: { rowIndex: number; columnIndex: number; value: string }[] = []
  for (let i = 0; i < contents1.length - 1 /* 跳过第一行 */; i++) {
    data2.push({
      rowIndex: i + 1, // 跳过第一行
      columnIndex: index1,
      value: 'TEXT',
    })
  }

  // return data
  return await modifyXlsx(filePath, filePath, 1, [...data, ...data2])
}

type EXCEL_RESPONSE = {
  success: boolean
  message: string
}

type EXCEL_ROW_COLUMN_VALUE = {
  rowIndex: number
  columnIndex: number
  value: string
}

/** 补全失败的翻译 */
export const retryTranslation = async (
  filePath: string,
  zhIndex: number,
  enIndex: number,
) => {
  const pLimit = new PLimit(15)
  const { data, contents } = (await readColumns(filePath, 1, zhIndex, enIndex)) as any
  // curlyBracketsReplace 将 {{...}} 内容提取出，不做翻译，写回的时候再替换回去
  const dataSliced = data.slice(1) // 跳过第一行
  const contentSliced = contents.slice(1) // 跳过第一行
  const curlyBracketsReplace: string[][] = []
  dataSliced.forEach((text: string, index: number) => {
    if (!contentSliced[index].includes('FAIL TO TRANSLATE')) {
      pLimit.enqueue2(() => Promise.resolve(''))
    } else {
      console.log(
        '#80 index:',
        index,
        'text:',
        text,
        `contentSliced[${index}]:`,
        contentSliced[index],
      )
      const [replacedText, matches] = replaceCurlyBrackets(text)
      curlyBracketsReplace[index] = matches
      console.log('#40 to translate:', text)
      pLimit.enqueue2(translate, replacedText, 'zh', 'en')
      // pLimit.enqueue2(() => Promise.resolve('重试测试'))
    }
    // 测试 replaceCurlyBrackets & resumeCurlyBrackets
    // const [replacedText, matches] = replaceCurlyBrackets(text)
    // curlyBracketsReplace.push(matches)
    // pLimit.enqueue2(() => Promise.resolve(replacedText))
  })

  const resultData = (await pLimit.run2()) as any
  const excelRowColumnValue = resultData
    .map((elem: { result: string }, resultIndex: number) => {
      const { result: text } = elem
      if (text === '') {
        return undefined
      }
      const resumeText = resumeCurlyBrackets(text, curlyBracketsReplace[resultIndex])
      return {
        rowIndex: resultIndex + 1, // 跳过第一行
        columnIndex: enIndex,
        value: resumeText,
      }
    })
    .filter((a: any) => a)

  const writeFilePath = insertStringBeforeLastDot(filePath, '2')
  return await modifyXlsx(filePath, writeFilePath, 1, excelRowColumnValue)
}

export const readAndTranslate = async (
  filePath: string,
  zhIndex: number,
  enIndex: number,
  referencePathsFiltered?: string[],
) => {
  if (!_.isEmpty(referencePathsFiltered)) {
    await cacheTranslation(referencePathsFiltered as string[])
  }
  const pLimit = new PLimit(15)
  const data = ((await readColumns(filePath, 1, zhIndex)) as any)?.data ?? []
  const dataSliced = data.slice(1) // 跳过第一行
  // curlyBracketsReplace 将 {{...}} 内容提取出，不做翻译，写回的时候再替换回去
  const dollarCurlyBracketsReplace: string[][] = []
  const curlyBracketsReplace: string[][] = []
  dataSliced.forEach((text: string, index: number) => {
    if (isLink(text)) {
      pLimit.enqueue2(() => Promise.resolve(text))
    } else {
      // const regex1 = /\{\{(.*?)\}\}/
      const regex2 = /\$\{([^\}]*?)\}/
      if (regex2.test(text)) {
        const [replacedText, matches] = replaceDollarCurlyBrackets(text)
        dollarCurlyBracketsReplace[index] = matches
        pLimit.enqueue2(translate, replacedText, 'zh', 'en')
      } else {
        const [replacedText, matches] = replaceCurlyBrackets(text)
        curlyBracketsReplace[index] = matches
        pLimit.enqueue2(translate, replacedText, 'zh', 'en')
      }
    }
    // 测试 replaceCurlyBrackets & resumeCurlyBrackets
    // const [replacedText, matches] = replaceCurlyBrackets(text)
    // curlyBracketsReplace.push(matches)
    // pLimit.enqueue2(() => Promise.resolve(replacedText))
  })

  const resultData = (await pLimit.run2()) as any
  const excelRowColumnValue = resultData.map(
    (elem: { result: string }, resultIndex: number) => {
      const { result: text } = elem
      const text2 = resumeDollarCurlyBrackets(
        text,
        dollarCurlyBracketsReplace[resultIndex],
      )
      const resumeText = resumeCurlyBrackets(text2, curlyBracketsReplace[resultIndex])
      return {
        rowIndex: resultIndex + 1, // 跳过第一行
        columnIndex: enIndex,
        value: resumeText,
      }
    },
  )
  const writeFilePath = insertStringBeforeLastDot(filePath, '的翻译')
  return await modifyXlsx(filePath, writeFilePath, 1, excelRowColumnValue)
}

export const readColumns = async (
  filePath: string,
  sheet: string | number,
  dataIndex: number, // 返回结果中 data 对应的栏位
  contentIndex?: number, // 返回结果中 contents 对应的栏位
) => {
  // 读取 xlsx 文件
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(filePath)
  if (!workbook) {
    return { success: false, message: `invalid file path: "${filePath}"` }
  }

  // 获取第一个工作表
  const worksheet = workbook.getWorksheet(sheet)
  if (!worksheet) {
    return { success: false, message: `invalid sheet name: "${sheet}"` }
  }

  // 获取某一列的数据
  const data: string[] = []
  const contents: string[] = []
  worksheet.eachRow(function (row, rowNumber) {
    const cellValue = worksheet
      .getRow(rowNumber)
      .getCell(dataIndex + 1)
      .value?.toString()
    data.push(cellValue ?? '')
    if (_.isNumber(contentIndex)) {
      const contentCellValue = worksheet
        .getRow(rowNumber)
        .getCell(contentIndex + 1)
        .value?.toString()
      contents.push(contentCellValue ?? '')
    }
  })

  const result: { success: boolean; data: string[]; contents?: string[] } = {
    success: true,
    data,
  }
  if (_.isNumber(contentIndex)) {
    result.contents = contents
  }
  return result
}

export const modifyXlsx = async (
  readFilePath: string,
  writeFilePath: string,
  sheet: string | number,
  data: EXCEL_ROW_COLUMN_VALUE[],
): Promise<EXCEL_RESPONSE> => {
  // 打开现有的工作簿
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(readFilePath)
  if (!workbook) {
    return { success: false, message: `invalid file path: "${readFilePath}"` }
  }

  // 选择要修改的工作表
  const worksheet = workbook.getWorksheet(sheet)
  if (!worksheet) {
    return { success: false, message: `invalid sheet name: "${sheet}"` }
  }

  data.forEach(({ rowIndex, columnIndex, value }) => {
    // 获取要修改的单元格所在的行和列并修改单元格的值
    worksheet.getCell(rowIndex + 1, columnIndex + 1).value = value
    // worksheet.getRow(rowIndex).commit() // now rows 1 and two are committed.
  })

  // 保存修改后的工作簿
  try {
    await workbook.xlsx.writeFile(writeFilePath)
    return { success: true, message: 'OK' }
  } catch (e) {
    console.error('保存文件时出错：', e)
    print.danger(`保存文件时出错： "${writeFilePath}"`)
    return { success: false, message: `fail to save: "${writeFilePath}"` }
  }
}

export const createXlsx = async () => {
  // 创建一个新的工作簿
  const workbook = new ExcelJS.Workbook()

  // 添加一个工作表
  const worksheet = workbook.addWorksheet('Sheet1')

  // 获取要添加数据的行和列
  const rowIndex = 0 // 要添加数据的行索引，从0开始
  const columnIndex = 0 // 要添加数据的列索引，从0开始

  // 添加数据到指定的单元格
  worksheet.getCell(rowIndex + 1, columnIndex + 1).value = '新数据'

  // 保存文件
  workbook.xlsx
    .writeFile('文件路径')
    .then(() => {
      console.log('文件已保存')
    })
    .catch(err => {
      console.error('保存文件时出错：', err)
    })
}
