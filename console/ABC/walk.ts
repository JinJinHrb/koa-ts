export const walk = (n: number) => {
  const dp = Array.from({ length: n }, (_, i) => {
    return new Array(n).fill(0)
  })
  dp[0][0] = 1
  const forbidden = Array.from({ length: n }, (_, i) => {
    return new Array(n).fill(0)
  })
  // forbidden[1][1] = 1
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        continue
      }
      if (j !== 0 && forbidden[i][j - 1] !== 1) {
        dp[i][j] += dp[i][j - 1] // 右
      }
      if (i !== 0 && forbidden[i - 1][j] !== 1) {
        dp[i][j] += dp[i - 1][j] // 下
      }
    }
  }
  console.log(dp)
  return dp[n - 1][n - 1]
}

export const testWalk = () => {
  console.log(walk(3))
}
