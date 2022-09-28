interface Dict {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [name: string]: Function
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const dictToArray = (dict: Dict): Array<Function> =>
  Object.keys(dict).map(name => dict[name])

export const print = {
  log: (text: string) => console.log('\x1b[37m%s \x1b[2m%s\x1b[0m', '>', text),
  danger: (text: string) => console.log('\x1b[31m%s \x1b[31m%s\x1b[0m', '>', text),
  tip: (text: string) => console.log('\x1b[36m%s \x1b[36m%s\x1b[0m', '>', text),
}
