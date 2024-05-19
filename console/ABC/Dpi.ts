export const testDpi = () => {
  const n = 5
  const matrix = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
  ]

  /* const n = 6
  const matrix = [
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 5],
    [3, 6],
  ] */

  const getDpi = (x: number) => {
    const unionGroups: number[][] = []
    for (const element of matrix) {
      let a = element[0]
      let b = element[1]
      if (b < a) {
        const temp = a
        a = b
        b = temp
      }
      if (a != x && b !== x) {
        const unionGroup = unionGroups.filter(groups => groups.some(v => v === a))[0]
        if (unionGroup) {
          if (unionGroup.includes(a) && !unionGroup.includes(b)) {
            unionGroup.push(b)
          }
        } else {
          unionGroups.push([a, b])
        }
      } else if (a === x) {
        const unionGroup = unionGroups.filter(groups => groups.some(v => v === b))[0]
        if (!unionGroup) {
          unionGroups.push([b])
        }
      } else if (b === x) {
        const unionGroup = unionGroups.filter(groups => groups.some(v => v === a))[0]
        if (!unionGroup) {
          unionGroups.push([a])
        }
      }
    }
    console.log('#63 unionGroups:', unionGroups, 'x:', x)
    const nums = unionGroups.map(a => a.length)
    return Math.max(...nums)
  }

  const breakPoints = Array.from({ length: n }, (_, i) => i + 1)

  const dpis = breakPoints
    .map(x => {
      return {
        dpi: getDpi(x),
        x,
      }
    })
    .sort((a, b) => {
      const a_dpi = a.dpi
      const b_dpi = b.dpi
      return a_dpi - b_dpi
    })
  console.log('dpis:', dpis)
}
