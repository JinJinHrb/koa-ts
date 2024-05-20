const findWords = (str, pre) => {
  str = str.trim()
  pre = pre.trim()

  /*
   * current: number 当前指针
   * result: string[] 可能得单词集合
   */
  const recur = (current, result) => {
    if (current > pre.length) {
      if (result.length === 0) {
        return pre
      }
      return result.sort().join(' ')
    }
    const ch = pre.slice(0, current)
    const next = result.filter(a => a.indexOf(ch) === 0)
    return recur(current + 1, next)
  }
  // const candidates = str.replace(/'/g, ' ').split(' ')
  const obj = {}
  const candidates = str
    .replace(/'|,|\./g, ' ')
    .replace(/\s+/, ' ')
    .split(' ')
    .filter(a => a && /^[a-zA-Z]+$/.test(a))
  let len = candidates.length
  for (let i = 0; i < len; i++) {
    const candidate = candidates[i]
    if (obj[candidate]) {
      candidates.splice(i, 1)
      i--
      len -= 1
    }
    obj[candidate] = true
  }
  console.log('obj:', obj)
  return recur(1, candidates)
}

export const testFindWords = () => {
  const str = `The furthest distance in the world, furthest, Is not between life and death, But when I stand in front of you, Yet you don't know that I love you.`
  const pre = 'f'
  // const str = `I love you`
  // const pre = 'He'
  console.log('result:', findWords(str, pre))
}

export const isSpelling = (str, arr) => {
  if (str === '') {
    return true
  }
  const ch = str.slice(0, 1)
  const index = arr.indexOf(ch)
  if (index > -1) {
    arr.splice(index, 1)
    return isSpelling(str.slice(1), arr)
  }
  const questionMarks = arr.filter(a => a === '?').length
  return questionMarks >= str.length
}

export const testSpelling = () => {
  // const candidates = ['cat', 'bt', 'hat', 'tree']
  // const collection = 'atach??'

  // const lines = ['4', 'cat', 'bt', 'hat', 'tree', 'atach??']
  const lines = ['4', 'cat', 'bt', 'hat', 'tree', 'zb']
  // const lines = [3, 'apple', 'car', 'window', 'welldoneapplec?']
  // const lines = [3, 'hello', 'world', 'cloud', 'welldonehoneyr']
  const num = parseInt(lines[0])
  const candidates = lines.slice(1, num + 1)
  const collection = lines[num + 1]

  console.log(
    'testSpelling:',
    candidates.filter(a => isSpelling(a, collection.split(''))).length,
  )
}

export const smartCar = () => {
  const lines = ['2,2', '30,20', '20,20']
  const firstLine = lines[0]
    .split(',')
    .map(a => a.trim())
    .filter(a => a)
    .map(a => parseInt(a))
  const m = firstLine[0]
  const n = firstLine[1]
  lines.splice(0, 1)
  const matrix = lines.map(a => a.split(',').map(a => parseInt(a.trim())))

  let cap = 100
  let fail = false
  while (cap > 0) {
    let gas = cap
    if (matrix[0][0] === -1) {
      gas = 100
    } else {
      gas = gas - matrix[0][0]
    }
    let i = 0,
      j = 0
    while (i < m && j < n) {
      const right =
        matrix[i] !== undefined && matrix[i][j + 1] !== undefined ? matrix[i][j + 1] : -2
      const down = matrix[i + 1] !== undefined ? matrix[i + 1][j] : -2
      if (right === -2 && down === -2) {
        break
      }
      if (right === -1) {
        gas = 100
        j++
      } else if (down === -1) {
        gas = 100
        i++
      } else if (down === -2 || right < down) {
        gas -= right
        j++
      } else {
        gas -= down
        i++
      }
      if (gas < 0) {
        fail = true
        break
      }
    }
    if (fail) {
      cap++
      break
    }
    cap--
  }
  if (cap === 100 && fail) {
    console.log(-1)
  } else {
    console.log(cap)
  }
}

export const testSmartCar = () => {
  smartCar()
}
