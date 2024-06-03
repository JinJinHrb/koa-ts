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

/* const swap = (arr: number[], i: number, j: number) => {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

export const permute = (nums: number[]) => {
  const results: number[][] = []
  const recur = (start: number) => {
    if (start === nums.length) {
      results.push(nums.slice())
    }
    for (let i = start; i < nums.length; i++) {
      swap(nums, start, i)
      recur(start + 1)
      swap(nums, start, i)
    }
  }
  recur(0)
  return results
} */

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

/* type Element = number | string

const combineFromArray = (elements: Element[], m: number) => {
  const results: Element[] = []
  const recur = (elems: Element[], start: number, current: Element[]) => {
    if (current.length === m) {
      results.push(current.slice() as unknown as Element)
      return
    }
    for (let i = start; i < elems.length; i++) {
      current.push(elems[i])
      recur(elems, i + 1, current)
      current.pop()
    }
  }
  recur(elements, 0, [])
  return results
} */

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
