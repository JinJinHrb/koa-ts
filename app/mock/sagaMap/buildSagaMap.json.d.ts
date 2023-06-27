type actions2HandlerMap = {
  [key: string]: key2Path4ActionsMap[]
}

type key2Path4ActionsMap = {
  [key in 'handler2ActionsKey' | 'usage']: string
}

type handler2ActionsMap = {
  [key: string]: (key2Path4HandlerMap1 | key2Path4HandlerMap2)[]
}

type key2Path4HandlerMap1 = {
  [key in 'actions2HandlerKey' | 'actions2HandlerKey2']?: string
}

type key2Path4HandlerMap2 = {
  [key in 'usageNames']?: string[]
}

export type RootBuildSagaMap = {
  actions2HandlerMap: actions2HandlerMap
  handler2ActionsMap: handler2ActionsMap
  warnings: string[]
}
