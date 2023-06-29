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

export interface ActionsMethod {
  name: string
  usage: string
}

export interface UsedActionsDependency {
  localName: string
  importedName: string
  sourceValue: string
  dependencyPath: string
  usage?: string
  usageVariable?: string
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

export interface NodeLoc {
  start: Start
  end: End
}

export interface ActionsComponent {
  type: string
  loc: Loc
  actionsMethods: ActionsMethod[]
  usedActionsDependencies: UsedActionsDependency[]
  nodeLoc: NodeLoc
}

export interface Group {
  actionsDependencies: ActionsDependency[]
  actionsComponents: ActionsComponent[]
  unknownElements: any[]
  spreadElementNames: string[]
  objectPropertyMap: any
}

export interface FileAction {
  filePath: string
  localConnect: string
  localCompose: string
  groups: Group[]
}

export interface Warning {
  filePath: string
  result?: any
}

export interface RootActionsMap {
  message: string
  fileActions: FileAction[]
  warnings: Warning[]
}
