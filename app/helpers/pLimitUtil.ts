import _ from 'lodash'

const PLimit = class {
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
