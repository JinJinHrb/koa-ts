/* import readline from 'readline'

const rc = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rc.on('line', line => {
  const inputs = line.split(' ')
  const elements = inputs[0].split('')
  const m = parseInt(inputs[1])
  //
}) */

export const joinChars = (
  elements: string[],
  m: number,
  start: number,
  current: string[],
  result: string[][],
) => {
  if (current.length === m) {
    result.push(current.slice())
    return
  }

  for (let i = start; i < elements.length; i++) {
    current.push(elements[i])
    joinChars(elements, m, start + 1, current, result)
    current.pop()
  }
  return result
}

export const testJoinChars = () => {
  // console.log(joinChars('abc'.split(''), 1, 0, [], []))
  console.log(joinChars('dde'.split(''), 2, 0, [], []))
}
