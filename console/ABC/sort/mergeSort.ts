function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr
  }
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left: number[], right: number[]) {
  const result: number[] = []
  let i = 0
  let j = 0
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++])
    } else {
      result.push(right[j++])
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j))
}

export const testMergeSort = () => {
  // 示例
  const arr = [38, 27, 43, 3, 9, 82, 10]
  console.log(mergeSort(arr)) // 输出: [3, 9, 10, 27, 38, 43, 82]
}
