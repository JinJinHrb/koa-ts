// 1: 1
// 2: 2
// 3: 4
// 4: 7
// ...
// 10: 274

export function cellLife(n: number) {
  if (!/\d/.test(n as unknown as string)) {
    return 0
  }
  let arr = [1, 0, 0]
  const recur = (i: number): number => {
    if (i >= n) {
      return arr.reduce((sum, a) => {
        return sum + a
      }, 0)
    }
    const brr = [0, 0, 0]
    brr[1] = arr[0]
    brr[2] = arr[1]
    brr[0] = arr[2] + arr[1] + arr[0]

    arr = brr
    return recur(i + 1)
  }
  return recur(1)
}

export const runCellLife = () => {
  console.log('cellLife:', cellLife(10))
}

// 实现以下功能：实现一个异步任务池，允许同时最多执行x个任务，x可配置

class AsyncPool {
  _queue: any = []
  _max = 0
  _count = 0

  constructor(n: number) {
    this._max = n
  }

  add(fn: any, ...arg: any) {
    const pFn = () =>
      new Promise(rsv => {
        fn(...arg).then(rsv)
      })

    this._count++
    if (this._count > this._max) {
      this._queue.push(pFn)
    } else {
      fn(...arg).then(() => {
        this._count--
        this.run()
      })
    }
  }

  run() {
    if (this._queue.length < 1) {
      return
    }
    const pFn = this._queue.shift()
    pFn().then(() => {
      this._count--
      this.run()
    })
  }
}

const task = (s: string, t: number) =>
  new Promise(rsv => {
    console.log('#76', s)
    setTimeout(() => {
      console.log('#77', s)
      rsv(s)
    }, t)
  })

export const testAsyncPool = () => {
  const ap = new AsyncPool(2)
  ap.add(task, 'a', 1000)
  ap.add(task, 'b', 3000)
  ap.add(task, 'c', 2000)
  ap.add(task, 'd', 1000)
  ap.add(task, 'e', 3000)
  ap.add(task, 'f', 2000)
  ap.add(task, 'g', 2000)
}
