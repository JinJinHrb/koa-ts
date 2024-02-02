import { iterateObjectHandler } from 'app/helpers/iterationUtil'
import { TActionsMap, TFileCollectorElement } from '.'
import { addActions2HandlerMap, findLocalActions } from './innerHelper'
import { Node } from '@babel/traverse'
import { BabelService } from '../babel.service'

export type ParseCreateNetworkingSagas = {
  actions2HandlerMap: TActionsMap
  calleeName: string
  handlerCollector: TFileCollectorElement[]
  expressionNode: Node
  path: any
  nonAnalyzedFile: string
  actionsMap: TActionsMap
  warnings: string[]
  babelService: BabelService
}

export const parseCreateNetworkingSagas = ({
  actions2HandlerMap,
  calleeName,
  handlerCollector,
  expressionNode,
  path,
  nonAnalyzedFile,
  actionsMap,
  warnings,
  babelService,
}: ParseCreateNetworkingSagas) => {
  const initNode = path.node.init
  const initArguments = initNode.arguments as any[]
  const firstArgument = initArguments[0]
  let actionsName = '',
    actionsPropertyName = '',
    stringLiteralActions = ''

  if (firstArgument.type === 'StringLiteral') {
    stringLiteralActions = actionsName = actionsPropertyName = firstArgument.value
  } else {
    iterateObjectHandler(firstArgument, (value: any, key) => {
      if (
        value &&
        value.type === 'MemberExpression' &&
        value.object?.type === 'Identifier'
      ) {
        actionsName = value.object.name
        actionsPropertyName = value.property.name
        return true
      }
      return false
    })
  }

  let localActionSource = ''
  if (!stringLiteralActions) {
    localActionSource = findLocalActions({
      nonAnalyzedFile,
      node: expressionNode,
      actionsMap,
      actionsName,
      path,
      warnings,
    })
  } else {
    actionsMap[stringLiteralActions] = stringLiteralActions
  }

  const actionsSource = actionsMap[actionsName]
    ? babelService.getAbsolutePathByAlias(actionsMap[actionsName], nonAnalyzedFile)
    : ''

  const rawUsages = { handlerSource: nonAnalyzedFile, importedHandlerName: calleeName }
  const result = {
    actionsSource,
    // actionsName,
    actionsPropertyName,
    handlerName: calleeName,
    handlerSource: nonAnalyzedFile,
    // usages,
    rawUsages,
  }
  handlerCollector.push(result) // 之后用于得到 handlerActionsMap
  addActions2HandlerMap(actions2HandlerMap, result) // 之后用于生成依赖图
}
