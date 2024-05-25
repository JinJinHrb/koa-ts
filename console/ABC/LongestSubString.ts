/**
 * @param {string} s
 * @return {number}
 */
export const lengthOfLongestSubstring = function (s: string) {
  const obj: { [key: string]: number } = {}
  let max = 0
  for (let i = 0, j = 0; i < s.length; i++) {
    if (obj[s[i]] !== undefined) {
      j = obj[s[i]] + 1
    }
    obj[s[i]] = i
    max = Math.max(max, i - j + 1)
  }
  return max
}
