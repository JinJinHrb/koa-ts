import { getFileData } from '../fsUtils'

export const rankRequestByHar = async (harPath: string) => {
  const harContent = (await getFileData(harPath))?.toString()
  return sortHarByQueueingTime(harContent)
}

function sortHarByQueueingTime(harContent: string) {
  // 解析 HAR 文件内容
  const harData = JSON.parse(harContent)

  // 获取所有请求条目
  const entries = harData.log.entries

  let blockedQueueingSum = 0
  for (const entry of entries) {
    blockedQueueingSum += entry.timings._blocked_queueing
  }

  // 根据 queueing 时间从长到短排序
  entries.sort((a: any, b: any) => {
    return b.timings._blocked_queueing - a.timings._blocked_queueing // 注意：这里可能不是真正的 queueing 时间，具体取决于 HAR 文件的格式和版本
  })

  const topQueueingRequests: {
    url: string
    blocked: number
    _blocked_queueing: number
  }[] = []
  for (let i = 0; i < 30; i++) {
    topQueueingRequests.push({
      url: entries[i].request.url,
      blocked: entries[i].timings.blocked,
      _blocked_queueing: entries[i].timings._blocked_queueing,
    })
  }

  let blockedSum = 0
  for (const entry of entries) {
    blockedSum += entry.timings.blocked
  }

  // 根据 blocked 时间从长到短排序
  entries.sort((a: any, b: any) => {
    return b.timings.blocked - a.timings.blocked // 注意：这里可能不是真正的 queueing 时间，具体取决于 HAR 文件的格式和版本
  })

  const topBlockedRequests: {
    url: string
    blocked: number
    _blocked_queueing: number
  }[] = []
  for (let i = 0; i < 30; i++) {
    topBlockedRequests.push({
      url: entries[i].request.url,
      blocked: entries[i].timings.blocked,
      _blocked_queueing: entries[i].timings._blocked_queueing,
    })
  }

  // 根据 wait 时间从长到短排序
  entries.sort((a: any, b: any) => {
    return b.timings.wait - a.timings.wait // 注意：这里可能不是真正的 queueing 时间，具体取决于 HAR 文件的格式和版本
  })

  const topWaitRequests: { url: string; wait: number }[] = []
  for (let i = 0, j = 0; i < 30 + j; i++) {
    if (entries[i].request.url.indexOf('wss:') === 0) {
      j++
      continue
    }
    topWaitRequests.push({
      url: entries[i].request.url,
      wait: entries[i].timings.wait,
    })
  }

  // 根据 receive 时间从长到短排序
  entries.sort((a: any, b: any) => {
    return b.timings.receive - a.timings.receive // 注意：这里可能不是真正的 queueing 时间，具体取决于 HAR 文件的格式和版本
  })

  const topReceiveRequests: { url: string; receive: number }[] = []
  for (let i = 0; i < 30; i++) {
    topReceiveRequests.push({
      url: entries[i].request.url,
      receive: entries[i].timings.receive,
    })
  }

  return {
    topBlockedRequests,
    topQueueingRequests,
    topWaitRequests,
    topReceiveRequests,
    blockedQueueingSum,
    blockedSum,
  }
}
