import _ from 'lodash'

type DATA = {
  success: boolean
  error?: Error
  result?: any
}

const PLimit = class {
  max = 2
  count = 0
  queueList: (() => Promise<void>)[] = []
  data: DATA[] = []
  constructor(max: number) {
    if (_.isNumber(max) && max > 0) {
      this.max = max
    }
  }

  /** 入列与执行分离 */
  enqueue2(business: (...args: any) => Promise<any>, ...arg: any) {
    return new Promise(resolve => {
      const Fn = async () => {
        const result = await business(...arg)
        resolve(result)
        return result
      }
      this.queueList.push(Fn)
    })
  }

  /** 入列与执行分离 */
  run2() {
    return new Promise(resolve => {
      if (this.queueList.length < 1) {
        resolve([])
      } else {
        const Task = this.queueList.shift() as () => Promise<void>
        this.run(Task, resolve)
      }
    })
  }

  enqueue(business: (...args: any) => Promise<any>, ...arg: any) {
    return new Promise(resolve => {
      const Fn = async () => resolve(await business(...arg))
      this.count >= this.max ? this.queueList.push(Fn) : this.run(Fn)
    })
  }

  run(Fn: () => Promise<void>, resolve?: (value: unknown) => void) {
    this.count++
    Fn()
      .then(result => {
        this.data.push({ success: true, result })
        this.count--
        if (this.queueList.length > 0) {
          const Task = this.queueList.shift() as () => Promise<void>
          this.run(Task, resolve)
        } else if (resolve) {
          resolve(this.data)
        }
      })
      .catch(error => {
        this.data.push({ success: false, error })
        this.count--
        if (this.queueList.length > 0) {
          const Task = this.queueList.shift() as () => Promise<void>
          this.run(Task, resolve)
        } else if (resolve) {
          resolve(this.data)
        }
      })
  }
}

export const SimplePLimit = class {
  max = 2
  count = 0
  queueList: (() => Promise<void>)[] = []
  constructor(max: number) {
    if (_.isNumber(max) && max > 0) {
      this.max = max
    }
  }
  enqueue(business: (...args: any) => Promise<any>, ...arg: any) {
    return new Promise(resolve => {
      const Fn = async () => resolve(await business(...arg))
      this.count >= this.max ? this.queueList.push(Fn) : this.run(Fn)
    })
  }
  run(Fn: () => Promise<void>) {
    this.count++
    Fn().then(() => {
      this.count--
      if (this.queueList.length > 0) {
        const Task = this.queueList.shift() as () => Promise<void>
        this.run(Task)
      }
    })
  }
}

export default PLimit
