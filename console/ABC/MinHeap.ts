/* 小顶堆 */
class MinHeap {
  heap: number[]

  constructor() {
    this.heap = []
  }

  getLeftChildIndex(parentIndex: number) {
    return 2 * parentIndex + 1
  }

  getRightChildIndex(parentIndex: number) {
    return 2 * parentIndex + 2
  }

  getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2)
  }

  hasLeftChild(index: number) {
    return this.getLeftChildIndex(index) < this.heap.length
  }

  hasRightChild(index: number) {
    return this.getRightChildIndex(index) < this.heap.length
  }

  hasParent(index: number) {
    return this.getParentIndex(index) >= 0
  }

  leftChild(index: number) {
    return this.heap[this.getLeftChildIndex(index)]
  }

  rightChild(index: number) {
    return this.heap[this.getRightChildIndex(index)]
  }

  parent(index: number) {
    return this.heap[this.getParentIndex(index)]
  }

  swap(index1: number, index2: number) {
    ;[this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
  }

  peek() {
    if (this.heap.length === 0) {
      throw new Error('Heap is empty')
    }
    return this.heap[0]
  }

  poll() {
    if (this.heap.length === 0) {
      throw new Error('Heap is empty')
    }
    if (this.heap.length === 1) {
      return this.heap.pop()
    }

    const item = this.heap[0]
    this.heap[0] = this.heap.pop() as number
    this.heapifyDown()
    return item
  }

  add(item: number) {
    this.heap.push(item)
    this.heapifyUp(this.heap.length - 1)
  }

  heapifyUp(index: number) {
    while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
      const parentIndex = this.getParentIndex(index)
      this.swap(parentIndex, index)
      index = parentIndex
    }
  }

  heapifyDown(index = 0) {
    let smallerChildIndex = index
    const leftChildIndex = this.getLeftChildIndex(index)
    const rightChildIndex = this.getRightChildIndex(index)

    if (
      this.hasLeftChild(index) &&
      this.leftChild(index) < this.heap[smallerChildIndex]
    ) {
      smallerChildIndex = leftChildIndex
    }

    if (
      this.hasRightChild(index) &&
      this.rightChild(index) < this.heap[smallerChildIndex]
    ) {
      smallerChildIndex = rightChildIndex
    }

    if (smallerChildIndex !== index) {
      this.swap(index, smallerChildIndex)
      this.heapifyDown(smallerChildIndex)
    }
  }
}

function minHeapSort(arr: number[]) {
  const heap = new MinHeap()
  arr.forEach(item => heap.add(item))
  const sortedArray = []
  while (heap.heap.length) {
    sortedArray.push(heap.poll())
  }
  return sortedArray
}

export const testMinHeapSort = () => {
  // 示例用法：
  const array = [5, 3, 7, 4, 9, 6, 1, 10, 2, 8]
  const sortedArray = minHeapSort(array)
  console.log(sortedArray) // 输出: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
