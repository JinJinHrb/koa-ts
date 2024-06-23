import _ from 'lodash'

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
/* const dailyTemperatures = function (temperatures: number[]) {
  let stack: { temperature: number; index: number }[] = []
  const output = temperatures.reduce((state, temperature, index, array) => {
    for (let i = stack.length - 1; i > -1; i--) {
      const stackI = stack[i]
      if (stackI === null) {
        continue
      }
      const { temperature: temperatureI, index: indexI } = stackI
      if (temperatureI < temperature) {
        state[indexI] = index - indexI
        stack.splice(i, 1)
      } else {
        break
      }
    }
    if (index === array.length - 1) {
      state.push(0)
      return state
    }
    const diff = temperatures[index + 1] - temperature
    if (diff <= 0) {
      stack.push({ temperature, index })
      stack = stack.sort((a, b) => {
        return b.temperature - a.temperature
      })
      state.push(0)
    } else {
      state.push(1)
    }
    return state
  }, [] as number[])
  return [output, stack]
} */

function dailyTemperatures(temperatures: number[]) {
  const stack = [] // 存储索引的栈
  const result = new Array(temperatures.length).fill(0)

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const index = stack.pop() as number
      result[index] = i - index
    }
    stack.push(i)
  }

  return result
}

export const testDailyTemperatures = () => {
  const temperatures = [
    64, 40, 49, 73, 72, 35, 68, 83, 35, 73, 84, 88, 96, 43, 74, 63, 41, 95, 48, 46, 89,
    72, 34, 85, 72, 59, 87, 49, 30, 32, 47, 34, 74, 58, 31, 75, 73, 88, 64, 92, 83, 64,
    100, 99, 81, 41, 48, 83, 96, 92, 82, 32, 35, 68, 68, 92, 73, 92, 52, 33, 44, 38, 47,
    88, 71, 50, 57, 95, 33, 65, 94, 44, 47, 79, 41, 74, 50, 67, 97, 31, 68, 50, 37, 70,
    77, 55, 48, 30, 77, 100, 31, 100, 69, 60, 47, 95, 68, 47, 33, 64,
  ]
  const expected = [
    3, 1, 1, 4, 3, 1, 1, 3, 1, 1, 1, 1, 30, 1, 3, 2, 1, 25, 2, 1, 19, 2, 1, 3, 2, 1, 11,
    5, 1, 1, 2, 1, 3, 2, 1, 2, 1, 2, 1, 3, 2, 1, 0, 46, 3, 1, 1, 1, 30, 18, 5, 1, 1, 2, 1,
    12, 1, 10, 5, 1, 2, 1, 1, 4, 3, 1, 1, 11, 1, 1, 8, 1, 1, 5, 1, 3, 1, 1, 11, 1, 3, 2,
    1, 1, 5, 3, 2, 1, 1, 0, 1, 0, 3, 2, 1, 0, 0, 2, 1, 0,
  ]
  const output = dailyTemperatures(temperatures)
  console.log(_.isEqual(output, expected), 'output:', output)
  const error = []
  for (let i = 0; i < output.length; i++) {
    if (expected[i] !== output[i]) {
      error.push({
        index: i,
        temperaturesI: temperatures[i],
        temperaturesJ: temperatures[i + expected[i]],
        expected: expected[i],
        output: output[i],
      })
    }
  }
  if (error.length > 0) {
    console.log('#62 error:', error)
  }
}
