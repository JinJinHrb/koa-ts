export interface Option {
  type: string
  multi: boolean
  allowSelfLoops: boolean
}

export interface Node {
  key: string
}

export interface Edge {
  key: string
  source: string
  target: string
}

export interface Graph {
  options: Option
  attributes: any
  nodes: Node[]
  edges: Edge[]
}

export interface RootObject {
  message: string
  filename: string
  npmDependencies: string[]
  size: number
  graph: Graph
}
