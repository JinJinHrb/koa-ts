export interface ActionsDependency {
  isNamespace: boolean
  localName: string
  sourceValue: string
  dependencyPath: string
  exportNames: string[]
}

export interface Start {
  line: number
  column: number
  index: number
}

export interface End {
  line: number
  column: number
  index: number
}

export interface Loc {
  start: Start
  end: End
}

export interface ActionsComponent {
  type: string
  loc: Loc
}

export interface Group {
  actionsDependencies: ActionsDependency[]
  actionsComponents: ActionsComponent[]
  unknownElements: unknown[]
  spreadElementNames: string[]
  objectPropertyMap: unknown
}

export interface Data {
  filePath: string
  localConnect: string
  localCompose: string
  groups: Group[]
}

export interface RootObject {
  message: string
  data: Data[]
}
