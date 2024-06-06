function heapSort(arr: number[]): void {
  // 构建最大堆
  buildMaxHeap(arr)

  // 逐个从堆顶取出元素并恢复堆
  for (let i = arr.length - 1; i >= 1; i--) {
    // 将当前最大的元素（堆顶元素）与末尾元素交换
    swap(arr, 0, i)
    // 重新对堆进行调整，排除末尾元素
    maxHeapify(arr, 0, i)
  }
}

function buildMaxHeap(arr: number[]): void {
  // 从最后一个非叶子节点开始向上构造最大堆
  // 对于一个长度为n的数组，最后一个非叶子节点的索引是 Math.floor(n/2) - 1
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    maxHeapify(arr, i, arr.length)
  }
}

function maxHeapify(arr: number[], i: number, heapSize: number): void {
  let largest = i // 将最大元素设置为根
  const left = 2 * i + 1 // 左子节点索引
  const right = 2 * i + 2 // 右子节点索引

  // 如果左子节点比根大，则更新最大元素
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left
  }

  // 如果右子节点比目前已知的最大元素还大，则更新最大元素
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right
  }

  // 如果最大元素不是根
  if (largest !== i) {
    swap(arr, i, largest)

    // 递归地调整子堆
    maxHeapify(arr, largest, heapSize)
  }
}

function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

// 测试用例
export const testHeapSort = () => {
  const arr: number[] = [5, 3, 7, 6, 2, 9, 1, 4, 8]
  heapSort(arr)
  console.log(arr) // 输出应该是有序数组，例如：[1, 2, 3, 4, 5, 6, 7, 8, 9]
}
