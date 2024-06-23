class TreeNode {
  value: string | number
  left: TreeNode | null
  right: TreeNode | null

  constructor(
    value: string | number,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.value = value
    this.left = left
    this.right = right
  }
}

export type TreeElement = number | string

/**
 * 树的遍历
 */
export const preOrderTraverse = (root: TreeNode) => {
  const stack: TreeNode[] = []
  const result: (string | number)[] = []

  let curr = root
  stack.push(curr)
  while (stack.length > 0) {
    curr = stack.pop() as TreeNode
    result.push(curr.value)
    if (curr.right) {
      stack.push(curr.right)
    }
    if (curr.left) {
      stack.push(curr.left)
    }
  }

  return result
}

export const inOrderTraversal = (root: TreeNode) => {
  if (!root) return []

  const stack = []
  const result = []
  let currentNode: TreeNode | null = root

  while (currentNode || stack.length > 0) {
    while (currentNode) {
      stack.push(currentNode)
      currentNode = currentNode.left
    }

    currentNode = stack.pop() as TreeNode
    result.push(currentNode.value) // 访问根节点
    currentNode = currentNode.right
  }

  return result
}

export const postOrderTraverse = (root: TreeNode) => {
  const stack1: TreeNode[] = []
  const stack2: TreeNode[] = []
  const result: (string | number)[] = []

  stack1.push(root)
  /* console.log(
    '#73 stack1:',
    stack1.map(a => a.value),
    'stack2:',
    stack2.map(a => a.value),
  ) */
  while (stack1.length > 0) {
    const curr = stack1.pop() as TreeNode
    stack2.push(curr)
    if (curr.left) {
      stack1.push(curr.left)
    }
    if (curr.right) {
      stack1.push(curr.right)
    }
    /* console.log(
      '#87 stack1:',
      stack1.map(a => a.value),
      'stack2:',
      stack2.map(a => a.value),
    ) */
  }
  /* console.log(
    '#81 stack1:',
    stack1.map(a => a.value),
    'stack2:',
    stack2.map(a => a.value),
  ) */
  while (stack2.length > 0) {
    const curr = stack2.pop() as TreeNode
    // if (
    //   !stack2.includes(curr.left as TreeNode) &&
    //   !stack2.includes(curr.right as TreeNode)
    // ) {
    result.push(curr.value)
    // }
  }
  return result
}

// 非递归后序遍历函数
/* function postOrderTraversalNonRecursive(root: TreeNode) {
  const result: (string | number)[] = []
  const stack: TreeNode[] = []
  let node: TreeNode | null = root
  let lastVisitedNode = null

  while (node || stack.length > 0) {
    // 遍历左子树
    if (node) {
      stack.push(node)
      node = node.left
      console.log(
        '#126 stack:',
        stack.map(a => a?.value),
        'result:',
        result,
      )
    } else {
      const peekNode = stack[stack.length - 1] as TreeNode
      // 如果右子树不存在或已经被访问过，则访问当前节点
      if (!peekNode.right || peekNode.right === lastVisitedNode) {
        node = stack.pop() as TreeNode
        result.push(node.value)
        lastVisitedNode = node
        node = null // 重置node以确保下一次循环时能从栈中取节点
      } else {
        // 否则，遍历右子树
        node = peekNode.right
        peekNode.right = null // 临时将右子树置空，表示已经访问过
      }
      console.log(
        '#138 stack:',
        stack.map(a => a?.value),
        'result:',
        result,
      )
    }
  }

  return result
} */

const postOrderTraversalNonRecursive = (root: TreeNode) => {
  const stack: TreeNode[] = []
  const result: TreeElement[] = []
  let curr: TreeNode | null = root,
    pre: TreeNode | null = null
  while (curr || stack.length > 0) {
    // 遍历左子树
    if (curr) {
      stack.push(curr)
      curr = curr.left
    } else {
      const top = stack[stack.length - 1]
      if (top.right && top.right !== pre) {
        curr = top.right
        // top.right = null
      } else {
        // 如果右子树不存在或已经被访问过，则访问当前节点
        curr = stack.pop() as TreeNode
        result.push(curr.value)
        pre = curr
        curr = null // 重置node以确保下一次循环时能从栈中取节点
      }
    }
  }
  return result
}

// 测试用例函数
export const testTreeNode = () => {
  // 测试用例 1: 创建一个简单的二叉树
  let root: TreeNode | null = new TreeNode(1)
  root.left = new TreeNode(2)
  root.right = new TreeNode(3)
  root.left.left = new TreeNode(4)
  root.left.right = new TreeNode(5)
  root.left.right.right = new TreeNode(6)
  if (
    root.value !== 1 ||
    root.left.value !== 2 ||
    root.right.value !== 3 ||
    root.left.left.value !== 4 ||
    root.left.right.value !== 5 ||
    root.left.right.right.value !== 6
  ) {
    console.error('TestCase 1 failed')
    return
  }
  // const result = postOrderTraverse(root)
  // const result1 = postOrderTraversalNonRecursive(root)
  const result1 = inOrderTraversal(root)
  console.log('#205 result1:', result1)

  // 测试用例 2: 创建一个不平衡的二叉树
  root = new TreeNode(1)
  root.left = new TreeNode(2)
  root.right = new TreeNode(3)
  root.left.left = new TreeNode(4)
  root.right.right = new TreeNode(6)
  root.right.right.right = new TreeNode(7)
  if (
    root.value !== 1 ||
    root.left.value !== 2 ||
    root.right.value !== 3 ||
    root.left.left.value !== 4 ||
    root.right.right.value !== 6 ||
    root.right.right.right.value !== 7
  ) {
    console.error('TestCase 2 failed')
    return
  }

  // const result2 = postOrderTraversalNonRecursive(root)
  const result2 = inOrderTraversal(root)
  console.log('#227 result2:', result2)

  // 测试用例 3: 创建一个只有根节点的二叉树
  root = new TreeNode(1)
  if (root.value !== 1 || root.left !== null || root.right !== null) {
    console.error('TestCase 3 failed')
    return
  }

  // 测试用例 4: 无需创建，直接测试 null 情况
  root = null
  if (root !== null) {
    console.error('TestCase 4 failed')
    return
  }

  console.log('All tests passed!')
}

// 运行测试用例
// testTreeNode()
