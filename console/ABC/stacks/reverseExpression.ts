const DIGIT = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const getOpPriority = (op: string | null) => {
  if (op === null) {
    return 0
  }
  if (['+', '-'].includes(op)) {
    return 1
  } else if (['*', '/'].includes(op)) {
    return 2
  }
  return 0
}

const getReverseExpression = (expression: string) => {
  expression = expression.replace(/\s+/g, '')
  const opStack: string[] = []
  const digitStack: string[] = []
  for (let i = 0; i < expression.length; ) {
    let j = i + 1,
      ch = ''
    if (DIGIT.includes(expression[i])) {
      while (j < expression.length && DIGIT.includes(expression[j])) {
        j++
      }
      ch = expression.slice(i, j)
      i = j
      digitStack.push(ch)
    } else {
      ch = expression[i]
      if (['(', ')'].includes(ch)) {
        if (ch === ')') {
          // 把所有的符号都挪到 digitStack, 直到遇到 '('
          let nextOp
          while (![undefined, '('].includes((nextOp = opStack.pop()))) {
            digitStack.push(nextOp as string)
          }
        } else {
          opStack.push(ch)
        }
      } else {
        const lastOp = opStack.length > 0 ? opStack[opStack.length - 1] : null
        const lastOpPriority = getOpPriority(lastOp)
        const opPriority = getOpPriority(ch)
        if (lastOpPriority < opPriority) {
          opStack.push(ch)
        } else {
          digitStack.push(ch)
        }
      }
      i++
    }
  }
  while (opStack.length > 0) {
    digitStack.push(opStack.pop() as string)
  }
  // return digitStack.join(',')
  return digitStack
}

function evalRPN(tokens: string[]) {
  const stack: number[] = []
  const operators = ['+', '-', '*', '/']

  for (const token of tokens) {
    if (!operators.includes(token)) {
      stack.push(parseInt(token))
    } else {
      const num2 = stack.pop() as number
      const num1 = stack.pop() as number
      switch (token) {
        case '+':
          stack.push(num1 + num2)
          break
        case '-':
          stack.push(num1 - num2)
          break
        case '*':
          stack.push(num1 * num2)
          break
        case '/':
          stack.push(Math.trunc(num1 / num2))
          break // 注意JavaScript除法可能产生浮点数
      }
    }
  }
  return stack.pop()
}

export const testEvalRPN = () => {
  console.log(evalRPN(['1', '2', '+']), 3)
  console.log(evalRPN(['3', '4', '+']), 7)
  console.log(evalRPN(['5', '2', '*', '3', '+']), 13)
  console.log(evalRPN(['5', '2', '3', '*', '+']), 11)
  console.log(evalRPN(['100', '50', '25', '-', '/']), 4)
}

export const testGetReverseExpression = () => {
  console.log(getReverseExpression('1+2*3'), 'vs 1,2,3,*,+')
  console.log(getReverseExpression('3+4'), 'vs 3,4,+')
  console.log(getReverseExpression('5 + (2 * 3)'), 'vs 5,2,3,*,+')
  console.log(getReverseExpression('10 - (4 / 2)'), 'vs 10,4,2,/,-')
  console.log(getReverseExpression('(7 + 8) * 2'), 'vs 7,8,+,2,*')
  console.log(getReverseExpression('100 / (50 - 25)'), 'vs 100,50,25,-,/')
}
