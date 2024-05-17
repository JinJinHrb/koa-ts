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
