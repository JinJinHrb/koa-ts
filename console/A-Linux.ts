/* JavaScript Node ACM模式 控制台输入获取 */
import readline from "readline";

export const run = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  const lines: number|string[] = [];
  let n: number;
  rl.on("line", (line) => {
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
}

function getResult(matrix:number[][], n: number) {
  const ufs = new UnionFindSet(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) { // 这里j从i+1开始，是因为矩阵是对称的
      if (matrix[i][j] === 1) {
        ufs.union(i, j);
      }
    }
  }

  // connected对象的属性代表某个连通分量的顶级父节点，属性值代表该连通分量下的节点个数
  const connected: any = {};

  for (let i = 0; i < n; i++) {
    const fa = ufs.find(ufs.fa[i]);
    connected[fa] ? connected[fa]++ : (connected[fa] = 1);
  }

  // 返回最大节点数
  return Math.max.apply(null, Object.values(connected));
}

// 并查集实现
class UnionFindSet {
  fa: number[];
  count: number;
  constructor(n: number) {
    this.fa = new Array(n).fill(0).map((_, i) => i);
    console.log('UnionFindSet #55', this.fa)
    this.count = n;
  }

  find(x: number): number {
    console.log('find #62', 'x:', x)
    if (x !== this.fa[x]) {
      console.log('find #63 x:', x, 'fa[x]:', this.fa[x])
      const y = (this.fa[x] = this.find(this.fa[x]));
      console.log('find #64 y:', y, '\n')
      return y
    }
    console.log('find #68 x:', x)
    return x;
  }

  union(x: number, y: number) {
    console.log('union #73', 'x:', x, 'y:', y)
    const x_fa = this.find(x);
    console.log('union #74 x:', x, 'x_fa:', x_fa)
    const y_fa = this.find(y);
    console.log('union #76 y:', y, 'y_fa:', y_fa)

    if (x_fa !== y_fa) {
      console.log('union #79', 'this.fa[y_fa]:', this.fa[y_fa], 'y_fa:', y_fa, 'x_fa:', x_fa)
      this.fa[y_fa] = x_fa;
      this.count--;
      console.log('union #82 this.count:', this.count)
    }
  }
}

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