// 13个人围成一圈，从第一个人开始1、2、3顺序循环报数，凡数到3的人退出圈子，输出最后留在圈中的人的序号。
// n 个人围成一圈，从第一个人开始1、2、3顺序循环报数，凡数到 m 的人退出圈子，输出最后留在圈中的人
const josephLoop = (n: number, m: number) => {
  const arr = Array.from({ length: n }, (_, i) => i)
  const recur = (i: number, offset: number) => {
    if (arr.length === 1) {
      return
    }
    const j = (i + offset) % arr.length
    if (m - 1 === i) {
      arr.splice(j, 1)
      offset = j
      i = 0
    } else {
      i++
    }
    recur(i, offset)
  }
  recur(0, 0)
  // console.log(arr)
  return arr[0]
}

export const testJosephLoop = () => {
  console.log(josephLoop(12, 5))
}
