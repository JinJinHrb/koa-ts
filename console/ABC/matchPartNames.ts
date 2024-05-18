export const combine = (
  elements: number[],
  m: number,
  start: number,
  current: number[],
  result: number[][],
) => {
  if (current.length === m) {
    result.push(current.slice())
    return
  }
  for (let i = start; i < elements.length; i++) {
    current.push(elements[i])
    combine(elements, m, i + 1, current, result)
    current.pop()
  }
  return result
}

export const testMatchPartNames = () => {
  const n = 5
  const elements = Array.from({ length: n - 1 }, (_, i) => i + 1)
  console.log(combine(elements, 2, 0, [], []))
}
