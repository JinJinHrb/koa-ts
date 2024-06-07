// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
// 示例 1：
// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

// 示例 2：
// 输入：height = [4,2,0,3,2,5]
// 输出：9

const getStageDiffs = (arr: number[]) =>
  arr.reduce(
    (states: number[], currentValue: number, currentIndex: number) => {
      if (currentIndex === 0) {
        return states
      }
      const previousValue = arr[currentIndex - 1]
      const diff = currentValue - previousValue
      states.push(diff)
      return states
    },
    [0] as number[],
  )

const getTrappingRainWater = (arr: number[]) => {
  const stageDiffs = getStageDiffs(arr)
  const dp = Array.from({ length: stageDiffs.length }).fill(0) as number[]
  const stack: number[] = []

  // j 代表水位
  for (let i = 0; i < stageDiffs.length; i++) {
    const diff = stageDiffs[i]
    const height = arr[i]
    if (diff < 0) {
      stack.push(i)
    } else if (diff > 0) {
      const ki = stack.length - 1
      // let ki = stack.length - 1
      // while (ki > -1) {
      const heightKi = arr[ki]
      if (height <= heightKi) {
        break
      }
      const k = stack[ki]
      const minBoard = Math.min(stageDiffs[k], diff)
      const capacity = minBoard * (k - i)
      dp[k] += capacity
      // ki--
      // }
    }
  }
  console.log('#39 stageDiffs:', stageDiffs, '\ndp:', dp)
  return dp.reduce((sum, i) => sum + i, 0)
}

export const testTrappingRainWater = () => {
  const input = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
  // const input = [4, 2, 0, 3, 2, 5]
  // const result = getStageDiffs(input)
  // console.log('#25 result:', result)
  console.log(getTrappingRainWater(input))
}
