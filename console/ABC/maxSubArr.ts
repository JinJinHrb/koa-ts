/*
 * 给定一个数组nums, 返回一个他的连续子数组，使得这个子数组的和最大。 比如 nums = [3,5,-4, -6, 10, 2, -8, 9, -5], 他最大的子数组是[10, 2, -8, 9]
 */
const getMaxSubArr = (nums: number[]) => {
  let start = 0,
    end = 0,
    max = 0,
    maxStart = 0,
    maxEnd = 0

  for (let i = 0, sum = 0; i < nums.length; i++) {
    const num = nums[i]
    if (sum >= 0) {
      sum += num
      end = i
      if (sum > max) {
        max = sum
        maxStart = start
        maxEnd = end
      }
    } else {
      start = end = i
      sum = num
    }
  }
  return { max, maxStart, maxEnd, subArr: nums.slice(maxStart, maxEnd + 1) }
}

export const testGetMaxSubArr = () => {
  const nums = [3, 5, -4, -6, 10, 2, -8, 9, -5]
  console.log(getMaxSubArr(nums))
}
