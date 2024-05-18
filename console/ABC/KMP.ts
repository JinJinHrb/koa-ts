function KMPSearch(pattern: string, text: string) {
  const result: number[] = []
  const prefixTable = computePrefixFunction(pattern)
  let q = 0 // the number of characters matched
  for (let i = 0; i < text.length; ) {
    if (pattern[q] == text[i]) {
      q++
      i++
    }
    if (q == pattern.length) {
      console.log('Pattern found at index ' + (i - q))
      result.push(i - q)
      q = prefixTable[q - 1] // for overlapping matches
    } else if (i < text.length && pattern[q] != text[i]) {
      if (q != 0) q = prefixTable[q - 1]
      else i++
    }
  }
  return result
}

function computePrefixFunction(pattern: string) {
  const prefixTable: number[] = new Array(pattern.length).fill(0)
  let len = 0 // length of the previous longest prefix suffix
  let i = 1
  prefixTable[0] = 0 // prefixTable[0] is always 0

  // the loop calculates prefixTable[i] for i = 1 to pattern.length-1
  while (i < pattern.length) {
    if (pattern[i] == pattern[len]) {
      len++
      prefixTable[i] = len
      i++
    } else {
      if (len != 0) {
        len = prefixTable[len - 1]
      } else {
        prefixTable[i] = len
        i++
      }
    }
  }
  return prefixTable
}

export const testComputePrefixFunction = () => {
  // const prefixArray = computePrefixFunction('ABABCABAB')
  const prefixArray = computePrefixFunction('ABABCABCAB')
  console.log('#48 prefixArray:', prefixArray)
}

export const testKmpSearch = () => {
  // 测试用例
  const text = 'ABABDABACDABABCABAB'
  const pattern = 'ABABCABAB'
  const prefixArray = computePrefixFunction(pattern)
  console.log('#56 prefixArray:', prefixArray)
  const searchResult = KMPSearch(pattern, text) // 输出: Pattern found at index 10
  console.log('#58 searchResult:', searchResult)
}
