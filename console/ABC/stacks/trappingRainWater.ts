// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
// 示例 1：
// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。

// 示例 2：
// 输入：height = [4,2,0,3,2,5]
// 输出：9

function getTrappingRainWater(height: number[]) {
  let left = 0,
    right = height.length - 1
  let leftMax = 0,
    rightMax = 0
  let water = 0

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left]
      } else {
        water += leftMax - height[left]
      }
      left++
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right]
      } else {
        water += rightMax - height[right]
      }
      right--
    }
  }
  return water
}

/* const getTrappingRainWater = (heights: number[]) => {
  let left = 0,
    right = heights.length - 1,
    maxLeft = 0,
    maxRight = 0,
    capacity = 0
  while (left < right) {
    if (heights[left] < heights[right]) {
      if (heights[left] > maxLeft) {
        maxLeft = heights[left]
      } else {
        capacity += maxLeft - heights[left]
      }
      left++
    } else {
      if (heights[right] > maxRight) {
        maxRight = heights[right]
      } else {
        capacity += maxRight - heights[right]
      }
      right--
    }
  }
  return capacity
} */

export const testTrappingRainWater = () => {
  const input = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
  // const input = [4, 2, 0, 3, 2, 5]
  // const result = getStageDiffs(input)
  // console.log('#25 result:', result)
  console.log(getTrappingRainWater(input))
}
