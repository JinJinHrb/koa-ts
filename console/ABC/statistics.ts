export function permute(nums: number[]) {
  const result: number[][] = []

  function backtrack(first = 0) {
    // 如果所有数都填完了
    if (first == nums.length) {
      result.push([...nums])
    }
    for (let i = first; i < nums.length; i++) {
      // 动态维护数组
      swap(nums, first, i)
      // 继续递归填下一个数
      backtrack(first + 1)
      // 撤销操作
      swap(nums, first, i)
    }
  }

  // 数组元素交换函数
  function swap(nums: number[], i: number, j: number) {
    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }

  backtrack()
  return result
}

function combineFromArray(
  elements: string[],
  m: number,
  start = 0,
  current: string[] = [],
  result: string[][] = [],
) {
  if (current.length === m) {
    result.push(current.slice())
    return
  }

  for (let i = start; i < elements.length; i++) {
    current.push(elements[i])
    combineFromArray(elements, m, i + 1, current, result)
    current.pop()
  }

  return result
}

export const testPermute = () => {
  // 测试代码
  const nums = [1, 2, 3]
  console.log(permute(nums))
}

export const testCombineFromArray = () => {
  // 示例：从特定元素数组中选择2个元素
  const elements = ['a', 'b', 'c', 'd' /* , 'e' */]
  const m = 3
  const combinations = combineFromArray(elements, m)
  console.log(combinations)
}
