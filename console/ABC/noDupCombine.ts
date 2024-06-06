/*
给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的 
子集（幂集）。

解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

示例 1：
输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]

示例 2：
输入：nums = [0]
输出：[[],[0]]

注：可能有负数，可能有多个0
*/

/**
 *
 * @param nums 集合
 * @param m 取的数量
 */
const combine = (nums: number[], m: number) => {
  const noDup: { [key: string]: boolean } = {}
  const result: number[][] = []
  const recur = (start: number, current: number[]) => {
    if (current.length === m) {
      const temp = current.slice().sort((a, b) => {
        return a - b
      })
      const key = temp.join(',')
      if (!noDup[key]) {
        noDup[key] = true
        result.push(temp)
      }
      return
    }
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i])
      recur(i + 1, current)
      current.pop()
    }
  }
  recur(0, [])
  return result
}

export const testNoDupCombine = () => {
  // const nums = Array.from({ length: 3 }, (_, i) => i + 1)
  const nums = [4, 4, 4, 1, 4]
  // const nums = [1, 2, 2]
  // const nums = [0]
  const results: number[][] = []
  for (let i = 0; i <= nums.length; i++) {
    const result = combine(nums, i)
    results.push(...result)
  }
  console.log('testCombine:', results)
}
