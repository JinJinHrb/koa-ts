type Element = [number, number | null]

class maxHeap {
  _queue: number[] = []

  _getLast(): Element {
    if (this._queue.length < 1) {
      return [-1, null]
    }
    const index = this._queue.length - 1
    return [index, this._queue[index]]
  }

  _getParent(index: number): Element {
    if (index < 1) {
      return [-1, null]
    }
    const parentIndex = index % 2 === 0 ? (index - 2) / 2 : (index - 1) / 2
    const parentValue = this._queue[parentIndex]
    return [parentIndex, parentValue]
  }

  _swap(index1: number, index2: number) {
    if (index1 === index2) {
      return
    }
    const temp = this._queue[index1]
    this._queue[index1] = this._queue[index2]
    this._queue[index2] = temp
  }

  _hoist() {
    const [lastIndex, lastValue] = this._getLast()
    if (lastIndex === 0) {
      return
    }
    const thisValue = lastValue as number
    let thisIndex = lastIndex
    let [parentIndex, parentValue] = this._getParent(thisIndex) as [number, number]
    while (parentIndex !== -1 && thisValue > parentValue) {
      this._swap(thisIndex, parentIndex)
      thisIndex = parentIndex
      ;[parentIndex, parentValue] = this._getParent(thisIndex) as [number, number]
    }
  }

  add(num: number) {
    this._queue.push(num)
    this._hoist()
  }

  _getLeftChild(index: number): Element {
    const leftChildIndex = index * 2 + 1
    if (leftChildIndex > this._queue.length - 1) {
      return [-1, null]
    }
    const leftChildValue = this._queue[leftChildIndex]
    return [leftChildIndex, leftChildValue]
  }

  _getRightChild(index: number) {
    const rightChildIndex = index * 2 + 2
    if (rightChildIndex > this._queue.length - 1) {
      return [-1, null]
    }
    const rightChildValue = this._queue[rightChildIndex]
    return [rightChildIndex, rightChildValue]
  }

  _lower() {
    const [lastIndex, thisValue] = this._getLast()
    if (lastIndex === 0) {
      return
    }
    this._queue[0] = this._queue.pop() as number
    let thisIndex = 0
    let [leftChildIndex, leftChildValue] = this._getLeftChild(thisIndex) as [
      number,
      number,
    ]
    let [rightChildIndex, rightChildValue] = this._getRightChild(thisIndex) as [
      number,
      number,
    ]
    while (leftChildIndex !== -1 || rightChildIndex !== -1) {
      let maxValueIndex = thisIndex,
        maxValue = thisValue as number
      if (leftChildIndex !== -1 && maxValue < leftChildValue) {
        maxValueIndex = leftChildIndex
        maxValue = leftChildValue
      }
      if (rightChildIndex !== -1 && maxValue < rightChildValue) {
        maxValueIndex = rightChildIndex
        maxValue = rightChildValue
      }
      if (thisIndex === maxValueIndex) {
        break
      }
      this._swap(thisIndex, maxValueIndex)
      thisIndex = maxValueIndex
      ;[leftChildIndex, leftChildValue] = this._getLeftChild(thisIndex) as [
        number,
        number,
      ]
      ;[rightChildIndex, rightChildValue] = this._getRightChild(thisIndex) as [
        number,
        number,
      ]
    }
  }

  _getMax() {
    return this._queue[0]
  }

  take() {
    const max = this._getMax()
    this._lower()
    return max
  }
}

const maxHeapSort = (array: number[]) => {
  const heap = new maxHeap()
  for (let i = 0; i < array.length; i++) {
    const num = array[i]
    heap.add(num)
  }
  const sorted: number[] = []
  let count = array.length
  while (count > 0) {
    count--
    const max = heap.take()
    sorted.push(max)
  }
  return sorted
}

export const testMaxHeapSort = () => {
  // 示例用法：
  const array = [5, 3, 7, 4, 9, 6, 1, 10, 2, 8]
  const sortedArray = maxHeapSort(array)
  console.log(sortedArray) // 输出: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
}
