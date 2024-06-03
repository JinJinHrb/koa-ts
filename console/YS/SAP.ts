// [11:27 AM] Zhu, Shu (external - Project)
/**
 * Please implement a method which prints out a number with 1 second delay
 * The promise is in 'pending' state during the 1 second delay
 * The promise turns to 'fulfilled' state when the printing is done
 *  @param {number} num
 *  @return {Promise}
 */
const printNum = num => {
  // console.log('#10', num)
  return new Promise(rsv => {
    setTimeout(() => {
      console.log('#12', num)
      rsv(num)
    }, 1000)
  })
}

// [11:32 AM] Zhu, Shu (external - Project)
/**
 * Please use the above method printNum to
 * print all the elements of an array, e.g [1, 2, 3, 4, 5] simultaneously after 1 second
 * Please do not use async await
 */

const printNums = nums => {
  const promises = nums.map(printNum)
  return Promise.all(promises)
}

// const printNumsOneByOne = async nums => {
//   const tasks = nums.map(a => () => {
//     return printNum(a)
//   })
//   const recur = async () => {
//     if (tasks.length < 1) {
//       return
//     }
//     await tasks.shift()()
//     await recur()
//   }
//   await recur()
// }

const printNumsOneByOne = nums => {
  const tasks = nums.map(a => () => {
    return printNum(a)
  })
  const recur = () => {
    if (tasks.length < 1) {
      return
    }
    Promise.resolve(tasks.shift()()).then(recur)
  }
  recur()
}
printNumsOneByOne([1, 2, 3])

// printNum(5)
// -> 1s
// 5
