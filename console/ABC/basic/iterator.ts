// ;(Object.prototype as Array<number>)[Symbol.iterator] = function () {
//   // return [1, 2][Symbol.iterator]()
//   // return Object.values(this).reverse()[Symbol.iterator]()
//   return Object.values(this)[Symbol.iterator]()
// }

type MyObject = {
  [key: string]: number
}

class IterableObject {
  _local: MyObject
  constructor(obj: MyObject) {
    this._local = obj
  }

  [Symbol.iterator]() {
    return Object.values(this._local)[Symbol.iterator]()
  }
}

export const testCustomIterator = () => {
  // const [a, b] = { a: 1, b: 2 } as unknown as Array<number>
  // console.log(a, b)

  const [a, b] = new IterableObject({ a: 1, b: 2 })
  console.log(a, b)
}
