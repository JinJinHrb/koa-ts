export const reverseList = (head: any) => {
  let prev = null
  let curr = head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}

export const getMiddle = function (nums) {
  const n = nums.length
  let middle = Math.floor(n / 2)
  let start = 0,
    end = n - 1
  while (middle !== start && middle != end && nums[middle] < nums[middle + 1]) {
    // const startValue = nums[start]
    const endValue = nums[end]
    const middleValue = nums[middle]
    if (middleValue > endValue) {
      start = middle + 1
    } else {
      end = middle
    }
    middle = start + Math.ceil((end - start) / 2)
  }
  return middle
}

export const testGetMiddle = () => {
  const nums = [1]
  const middle = getMiddle(nums)
  console.log('#35 middle:', middle)
}
