/**
 * @param {string} s
 * @return {number}
 */
export const lengthOfLongestNoDupSubstring = function (s: string) {
  const obj: { [key: string]: number } = {}
  let max = 0,
    subString = ''
  let jMax = 0
  for (let i = 0, j = 0; i < s.length; i++) {
    if (obj[s[i]] !== undefined) {
      j = obj[s[i]] + 1
      jMax = Math.max(j, jMax)
    }
    obj[s[i]] = i
    if (max < i - jMax + 1) {
      subString = s.slice(jMax, i + 1)
    }
    max = Math.max(max, i - jMax + 1)
  }
  return [max, subString]
}

export const testLengthOfLongestSubstring = () => {
  const texts = ['ghabcefabcgh', 'abcabcbb', 'bbbbb', 'pwwkew', 'dvdf']
  console.log(
    '#20',
    texts.map(a => {
      return `${a}: ${lengthOfLongestNoDupSubstring(a).join(', ')}`
    }),
  )
}

export const longestCommonPrefix = (strs: string[]): string => {
  if (strs.length === 0) {
    return ''
  }
  const min = Math.min(...strs.map(a => a.length))
  let i = 0
  OUTER: for (; i < min; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== strs[j - 1][i]) {
        break OUTER
      }
    }
  }
  // console.log('#31', i, strs[0])
  return strs[0].slice(0, i)
}

export const testLongestCommonPrefix = () => {
  const strs = ['flower', 'flow', 'flight']
  // const strs = ['dog', 'racecar', 'car']
  console.log(`"${longestCommonPrefix(strs)}"`)
}
