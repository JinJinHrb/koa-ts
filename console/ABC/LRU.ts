class ListNode {
  key?: string
  value?: string
  next?: ListNode | null
  prev?: ListNode | null

  constructor(key?: string, value?: string) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }
}

class LRUCache {
  capacity: number
  hash: { [key: string]: ListNode }
  count: number
  dummyHead: ListNode
  dummyTail: ListNode

  constructor(capacity: number) {
    this.capacity = capacity
    this.hash = {}
    this.count = 0
    this.dummyHead = new ListNode()
    this.dummyTail = new ListNode()
    this.dummyHead.next = this.dummyTail
    this.dummyTail.prev = this.dummyHead
  }

  get(key: string) {
    const node = this.hash[key]
    if (node == null) return -1
    this.moveToHead(node)
    return node.value
  }

  put(key: string, value: string) {
    const node = this.hash[key]
    if (node == null) {
      if (this.count == this.capacity) {
        this.removeLRUItem()
      }
      const newNode = new ListNode(key, value)
      this.hash[key] = newNode
      this.addToHead(newNode)
      this.count++
    } else {
      node.value = value
      this.moveToHead(node)
    }
  }

  moveToHead(node: ListNode) {
    this.removeFromList(node)
    this.addToHead(node)
  }

  removeFromList(node: ListNode) {
    const temp1 = node.prev as ListNode
    const temp2 = node.next as ListNode
    temp1.next = temp2
    temp2.prev = temp1
  }

  addToHead(node: ListNode) {
    node.prev = this.dummyHead
    node.next = this.dummyHead.next
    if (this.dummyHead.next) {
      this.dummyHead.next.prev = node
    }
    this.dummyHead.next = node
  }

  removeLRUItem() {
    const tail = this.popTail()
    if (tail) {
      delete this.hash[tail.key as string]
      this.count--
    }
  }

  popTail() {
    const tail = this.dummyTail.prev
    this.removeFromList(tail as ListNode)
    return tail
  }
}

export const testLRU = () => {
  // ;['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'][
  //   ([2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4])
}
