export interface Option {
  type: string
  multi: boolean
  allowSelfLoops: boolean
}

export interface Node {
  key: string
}

export interface Attribute {
  usages?: string[]
  usagesVariables?: string[]
}

export interface Edge {
  key: string
  source: string
  target: string
  attributes: Attribute
}

export interface Graph {
  options: Option
  attributes: Attribute
  nodes: Node[]
  edges: Edge[]
}

export interface RootSagaGraph {
  message: string
  graph: Graph
}
