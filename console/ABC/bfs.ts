class Queue {
  items: string[][]

  constructor() {
    this.items = []
  }

  enqueue(element: string[]) {
    this.items.push(element)
  }

  dequeue() {
    if (this.isEmpty()) return 'Queue is empty'
    return this.items.shift()
  }

  isEmpty() {
    return this.items.length == 0
  }
}

interface Graph {
  [key: string]: { [key: string]: number | Graph }
}

interface Node {
  node: string
  path: string[]
}

function bfs(graph: Graph, start: string, end: string) {
  const queue = new Queue()
  const visited: { [key: string]: Node } = {}
  const path = []
  queue.enqueue([start])

  while (!queue.isEmpty()) {
    const pathArray = queue.dequeue() as string[]
    const node = pathArray[pathArray.length - 1]

    // 如果已经访问过这个节点，就跳过
    if (node in visited) {
      continue
    }

    const newNode = {
      node: node,
      path: pathArray,
    }

    visited[node] = newNode
    path.push(newNode)

    // 如果找到了目标节点，返回路径
    if (node == end) {
      const pathToNode = []
      for (let i = 0; i < newNode.path.length; i++) {
        pathToNode.push(newNode.path[i])
      }
      return pathToNode
    }

    // 否则，将此节点的所有未访问邻居加入队列
    for (const neighbor in graph[node]) {
      if (!(neighbor in visited)) {
        const newPath = pathArray.slice() // 复制当前路径
        newPath.push(neighbor)
        queue.enqueue(newPath)
      }
    }
  }
  // 如果没有找到路径，则返回 null
  return null
}

export const testBfs = () => {
  // 测试图结构
  const graph = {
    A: { B: 1, C: 1 },
    B: { A: 1, D: 1, E: 1 },
    C: { A: 1, F: 1 },
    D: { B: 1 },
    E: { B: 1, F: 1 },
    F: { C: 1, E: 1 },
  }

  console.log(bfs(graph, 'A', 'F')) // 输出: ['A', 'C', 'F'] 或 ['A', 'B', 'E', 'F'] 等可能的路径之一
}
