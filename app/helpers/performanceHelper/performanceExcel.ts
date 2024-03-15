import * as ExcelJS from 'exceljs'

export type Timings = {
  blocked: number
  dns: number
  ssl: number
  connect: number
  send: number
  wait: number
  receive: number
  _blocked_queueing: number
}

export async function mapPerformanceToExcel(
  mapData: Map<string, Timings>,
  fileName: string,
) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet 1')

  // 设置列头
  worksheet.columns = [
    { header: 'key', key: 'key', width: 20 },
    { header: '阻塞时间', key: 'blocked', width: 10 },
    { header: '发送时间', key: 'send', width: 10 },
    { header: '等待时间', key: 'wait', width: 10 },
    { header: '接收时间', key: 'receive', width: 10 },
    { header: '排队时间', key: '_blocked_queueing', width: 10 },
  ]

  // 添加 Map 中的数据
  mapData.forEach((value, key) => {
    const { blocked, dns, ssl, connect, send, wait, receive, _blocked_queueing } = value
    worksheet.addRow({
      key: key,
      blocked,
      dns,
      ssl,
      connect,
      send,
      wait,
      receive,
      _blocked_queueing,
    })
  })

  // 写入文件
  await workbook.xlsx.writeFile(fileName)
}
