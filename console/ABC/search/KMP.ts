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

/* export const getNext = (str: string) => {
  const next = [0]
  for (let i = 1, j = 0; i < str.length; i++) {
    const chI = str[i]
    while (true) {
      const chJ = str[j]
      if (chI === chJ) {
        j++
        next[i] = j
        break
      } else if (j === 0) {
        next[i] = j
        break
      } else {
        j = next[j - 1]
      }
    }
  }
  return next
} */

export const search = (pattern: string, text: string) => {
  const result: number[] = []
  const next = getNext(pattern)
  for (let i = 0, j = 0; i < text.length; ) {
    const chI = text[i]
    const chJ = pattern[j]
    if (chI === chJ) {
      if (j < pattern.length - 1) {
        i++
        j++
      } else {
        result.push(i - j)
        j = next[j - 1]
      }
    } else if (j !== 0) {
      j = next[j - 1]
    } else {
      i++
    }
  }
  return result
}

export const getNext = (str: string) => {
  if (typeof str !== 'string' || !str) {
    return []
  }
  const next = [0]
  for (let i = 1, j = 0; i < str.length; i++) {
    const chI = str[i]
    while (true) {
      const chJ = str[j]
      if (chI === chJ) {
        next[i] = ++j
        break
      } else if (j !== 0) {
        j = next[j - 1]
      } else {
        next[i] = 0
        break
      }
    }
  }
  return next
}

export const computeLongestPrefixSuffix = (s: string) => {
  const n = s.length
  const next = new Array(n).fill(0)

  let j = 0 // 辅助变量，表示当前最长公共前后缀的长度
  for (let i = 1; i < n; i++) {
    while (j > 0 && s[i] !== s[j]) {
      j = next[j - 1] // 当前字符不匹配时，回溯到之前的最长公共前后缀
    }
    if (s[i] === s[j]) {
      j++ // 匹配成功，增加最长公共前后缀的长度
    }
    next[i] = j // 记录当前位置的最长公共前后缀长度
  }

  return next
}

export const testComputePrefixFunction = () => {
  // const text = 'ABABCABCAB'
  const text = 'ABABDABACDABABCABAB'
  // const prefixArray = computePrefixFunction(text)
  const prefixArray = computePrefixFunction(text)
  console.log('#71 prefixArray:', prefixArray)
  console.log('#72')
  const prefixArray2 = getNext(text)
  console.log('#73 prefixArray2:', prefixArray2)
}

export const testKmpSearch = () => {
  // 测试用例
  // const text = 'ABABDABACDABABCABAB'
  // const pattern = 'ABABCABAB'
  const text = 'ABABDABACDABABCABABCABAB'
  const pattern = 'ABABCABAB'
  const prefixArray = computePrefixFunction(pattern)
  console.log('#129 prefixArray:', prefixArray)
  const searchResult = KMPSearch(pattern, text) // 输出: Pattern found at index 10
  console.log('#131 searchResult:', searchResult)

  const prefixArray2 = getNext(pattern)
  console.log('#134 prefixArray2:', prefixArray2)
  const searchResult2 = search(pattern, text) // 输出: Pattern found at index 10
  console.log('#136 searchResult2:', searchResult2)
}

export const testShortestSubstring = () => {
  // const text = 'abcabcabc'
  // const text = 'ababab'
  // const text = 'abcdefg'
  // const text = 'abcdxxtabcdyyz'
  // const text = 'abcxabcyabcz'
  const text = 'ababcabab'
  const next = getNext(text)
  console.log('#144', next)
  const dp: number[] = Array.from({ length: text.length }, () => 0)
  let max = 0
  for (let i = 0; i < next.length; i++) {
    const j = next[i]
    if (j === 0) {
      dp[i] = 0
    } else if (text[i] === text[i - j + 1]) {
      dp[i] = 1
    } else {
      dp[i] = dp[i - 1] + 1
      max = Math.max(dp[i], max)
    }
  }
  console.log('dp', dp, '\nmax:', max)
}
