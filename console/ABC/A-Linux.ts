/* JavaScript Node ACM模式 控制台输入获取 */
/* import readline from "readline";

export const run = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  const lines: number|string[] = [];
  let n: number;
  rl.on('line', (line) => {
    lines.push(line);
  
    if (lines.length === 1) {
      n = Number(lines[0]) - 0;
    }
  
    if (n && lines.length === n + 1) {
      lines.shift();
      const matrix = lines.map((line) => line.split(" ").map(Number));
      console.log(getResult(matrix, n));
      lines.length = 0;
    }
  });
} */

export const testALinux = () => {
  /* 输入样例
  4
  1 1 0 0
  1 1 1 0
  0 1 1 0
  0 0 0 1
  */

  /* 
  输出：3
  */

  const matrix = [
    [1, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 1],
  ]
  console.log(getResult(matrix, 4))
}

function getResult(matrix: number[][], n: number) {
  const ufs = new UnionFindSet(n)

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 这里j从i+1开始，是因为矩阵是对称的
      if (matrix[i][j] === 1) {
        ufs.union(i, j)
      }
    }
  }

  // connected对象的属性代表某个连通分量的顶级父节点，属性值代表该连通分量下的节点个数
  const connected: any = {}

  for (let i = 0; i < n; i++) {
    const fa = ufs.find(ufs.fa[i])
    connected[fa] ? connected[fa]++ : (connected[fa] = 1)
  }

  // 返回最大节点数
  return Math.max.apply(null, Object.values(connected))
}

// 并查集实现
class UnionFindSet {
  fa: number[]
  count: number
  constructor(n: number) {
    this.fa = new Array(n).fill(0).map((_, i) => i)
    this.count = n
  }

  find(x: number): number {
    if (x !== this.fa[x]) {
      return (this.fa[x] = this.find(this.fa[x]))
    }
    return x
  }

  union(x: number, y: number) {
    const x_fa = this.find(x)
    const y_fa = this.find(y)

    if (x_fa !== y_fa) {
      this.fa[y_fa] = x_fa
      this.count--
    }
  }
}

/* class UnionFindSet {
  fa: number[]
  count: number

  constructor(n: number) {
    this.count = n
    this.fa = Array.from({ length: n }, (_, i) => i)
  }

  find(i: number): number {
    if (i === this.fa[i]) {
      return i
    }
    return (this.fa[i] = this.find(this.fa[i]))
  }

  union(i: number, j: number) {
    const faI = this.find(i)
    const faJ = this.find(j)
    if (faI !== faJ) {
      this.fa[faJ] = faI
      this.count--
    }
  }
} */

export const testUnionFindSet = () => {
  const ufs = new UnionFindSet(10)
  console.log('ufs.fa.length === 10', ufs.fa.length === 10)
  for (let i = 0; i < ufs.fa.length; i++) {
    console.log(`ufs.fa[i] === i (i: ${i})`, ufs.fa[i] === i) // 检查初始时每个元素的父节点是否为自身
  }
  console.log('ufs.count === 10', ufs.count === 10) // 检查初始时集合数量

  // 查找初始元素的根节点, 查找其他元素的根节点
  console.log('ufs.find(0)', ufs.find(0), 'ufs.find(4)', ufs.find(4))

  ufs.union(0, 1) // 合并集合0和集合1
  console.log('ufs.union(0, 1) // 合并集合0和集合1')
  console.log('ufs.find(0) === ufs.find(1)', ufs.find(0) === ufs.find(1)) // 检查合并后两个元素的根节点是否相同
  console.log('ufs.count === 9', ufs.count === 9) // 合并后集合数量减少一个

  console.log('ufs.find(2)', ufs.find(2), 'ufs.find(3)', ufs.find(3))
  ufs.union(2, 3) // 合并另一个集合对
  console.log('ufs.union(2, 3) // 合并集合2和集合3')
  console.log('ufs.find(0)', ufs.find(0), 'ufs.find(2)', ufs.find(2))
  ufs.union(0, 2) // 合并前两个集合的根节点所在的集合
  console.log('ufs.union(0, 2) // 合并集合0和集合2')
  console.log('ufs.find(0)', ufs.find(0), 'ufs.find(1)', ufs.find(1)) // 检查合并后所有元素的根节点是否相同
  console.log('ufs.find(0)', ufs.find(0), 'ufs.find(2)', ufs.find(2))
  console.log('ufs.find(0)', ufs.find(0), 'ufs.find(3)', ufs.find(3))
  console.log('ufs.count === 7', ufs.count === 7) // 合并后集合数量再次减少
}
