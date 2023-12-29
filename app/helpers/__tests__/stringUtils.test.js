// eslint-disable-next-line @typescript-eslint/no-var-requires
const { replaceCurlyBrackets, resumeCurlyBrackets } = require('../stringUtil')

describe('replaceCurlyBrackets', () => {
  it('should replace {{}} with {{CurlyBrackets [1]}}', () => {
    const input = 'Hello {{name}}, welcome to {{city}}!'
    const expectedOutput = 'Hello CurlyBrackets [1], welcome to CurlyBrackets [2]!'
    const [output, matches] = replaceCurlyBrackets(input)
    expect(output).toBe(expectedOutput)
    expect(matches).toEqual(['name', 'city'])
  })

  it('should replace multiple {{}} with {{CurlyBrackets [1]} {{CurlyBrackets [2]}}}', () => {
    const input = 'This is a {{test}} and another {{example}}.'
    const expectedOutput = 'This is a CurlyBrackets [1] and another CurlyBrackets [2].'
    const [output, matches] = replaceCurlyBrackets(input)
    expect(output).toBe(expectedOutput)
    expect(matches).toEqual(['test', 'example'])
  })

  describe('replaceCurlyBrackets', () => {
    it('should return the original string when there are no matches', () => {
      const input = 'Hello world!'
      const expectedOutput = 'Hello world!'
      const [output, matches] = replaceCurlyBrackets(input)
      expect(output).toBe(expectedOutput)
      expect(matches).toEqual([])
    })
  })
})

describe('resumeCurlyBrackets', () => {
  it('should replace {{}} with {{CurlyBrackets [1]}}', () => {
    const input = 'Hello CurlyBrackets [1], welcome to China!'
    const expectedOutput = 'Hello {{name}}, welcome to China!'
    const output = resumeCurlyBrackets(input, ['name'])
    expect(output).toBe(expectedOutput)
  })

  it('should replace multiple {{}} with {{CurlyBrackets [1]} {{CurlyBrackets [2]}}}', () => {
    const input = 'This is a CurlyBrackets [1] and another CurlyBrackets [2].'
    const expectedOutput = 'This is a {{test}} and another {{example}}.'
    const output = resumeCurlyBrackets(input, ['test', 'example'])
    expect(output).toBe(expectedOutput)
  })

  describe('replaceCurlyBrackets', () => {
    it('should return the original string when there are no matches', () => {
      const input = 'Hello world!'
      const expectedOutput = 'Hello world!'
      const output = resumeCurlyBrackets(input, [])
      expect(output).toBe(expectedOutput)
    })
  })
})
