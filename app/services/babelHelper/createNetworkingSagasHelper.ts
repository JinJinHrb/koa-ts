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
    ? babelService.getRealPathByAlias(actionsMap[actionsName], nonAnalyzedFile)
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

  console.log(
    '#20 parseCreateNetworkingSagas:',
    '\ncalleeName:',
    calleeName,
    '\nnonAnalyzedFile',
    nonAnalyzedFile,
    '\nactionsName:',
    actionsName,
    '\nactionsPropertyName:',
    actionsPropertyName,
    '\nstringLiteralActions:',
    stringLiteralActions,
    '\nlocalActionSource:',
    localActionSource,
    '\nactionsSource:',
    actionsSource,
    '\nwarnings:',
    warnings,
  )

  // const isActionsStringWrapped =
  //   calleeArguments[0].type === 'CallExpression' &&
  //   calleeArguments[0].callee.name === 'String'

  // if (calleeArguments[1].type !== 'Identifier') {
  //   warnings.push(
  //     `#307 calleeArguments[1].type !== 'Identifier': ${nonAnalyzedFile}, loc: ${loc2String(
  //       expression.loc,
  //     )}`,
  //   )
  //   return
  // }
  // const firstArgument = calleeArguments[0]
  // const secondArgument = calleeArguments[1]
  // if (
  //   isActionsStringWrapped &&
  //   (firstArgument.type !== 'CallExpression' ||
  //     firstArgument.arguments.length !== 1 ||
  //     firstArgument.arguments[0].type !== 'MemberExpression')
  // ) {
  //   warnings.push(
  //     `#311 firstArgument.arguments[0].type !== 'MemberExpression': ${nonAnalyzedFile}, loc: ${loc2String(
  //       expression.loc,
  //     )}`,
  //   )
  //   return
  // }
  // if (secondArgument.type !== 'Identifier') {
  //   warnings.push(
  //     `#319 secondArgument.type !== 'Identifier': ${nonAnalyzedFile}, loc: ${loc2String(
  //       expression.loc,
  //     )}`,
  //   )
  //   return
  // }
  // let stringLiteralActions: string | undefined,
  //   actionsName: string | undefined,
  //   actionsPropertyName: string | undefined
  // if (firstArgument.type === 'StringLiteral') {
  //   stringLiteralActions = actionsName = actionsPropertyName = firstArgument.value
  // } else {
  //   iterateObjectHandler(firstArgument, (value: any, key) => {
  //     if (
  //       value &&
  //       value.type === 'MemberExpression' &&
  //       value.object?.type === 'Identifier'
  //     ) {
  //       actionsName = value.object.name
  //       actionsPropertyName = value.property.name
  //       return true
  //     }
  //     return false
  //   })
  // }

  // let handlerSource = ''
  // const localHandlerName = secondArgument.name
  // let importedHandlerName = localHandlerName
  // if (!actionsName || !actionsPropertyName || !localHandlerName) {
  //   warnings.push(
  //     `#344 critical property is missing! nonAnalyzedFile: ${nonAnalyzedFile} actionsName: "${actionsName}", ` +
  //       `actionsPropertyName: "${actionsPropertyName}", handlerName: "${localHandlerName}".` +
  //       ` loc: ${loc2String(path.node.loc)}`,
  //   )
  //   return
  // }
  // if (!stringLiteralActions) {
  //   findLocalActions({
  //     nonAnalyzedFile,
  //     node: expressionStatementPath.node,
  //     actionsMap,
  //     actionsName,
  //     path,
  //     warnings,
  //   })
  // } else {
  //   actionsMap[stringLiteralActions] = stringLiteralActions
  // }

  // const handlerBinding = path.scope.getBinding(localHandlerName)
  // const handlerBindingPath = handlerBinding?.path
  // const handlerBindingNode = handlerBindingPath?.node
  // if (handlerBindingNode?.type === 'ImportSpecifier') {
  //   if (handlerBindingNode.imported.name !== localHandlerName) {
  //     importedHandlerName = handlerBindingNode.imported.name
  //   }
  //   const importDeclarationPath = handlerBinding?.path.findParent(subPath => {
  //     return subPath.type === 'ImportDeclaration'
  //   })
  //   const relativePath = (importDeclarationPath!.node as any).source.value
  //   const sourceValue = babelService.getRealPathByAlias(relativePath, nonAnalyzedFile)
  //   handlerSource = sourceValue
  // } else if (handlerBindingNode?.type !== 'FunctionDeclaration') {
  //   console.log(
  //     `#375 localHandlerName: ${localHandlerName}\nhandlerBindingNode:`,
  //     handlerBindingNode,
  //   )
  //   warnings.push(
  //     `#379 handlerBindingNode?.type !== 'FunctionDeclaration': localHandlerName: ${localHandlerName}, loc: ${
  //       handlerBindingNode?.loc
  //         ? loc2String(handlerBindingNode?.loc as SourceLocation)
  //         : ''
  //     }`,
  //   )
  // } else {
  //   handlerSource = nonAnalyzedFile
  // }

  // const rawUsages = { handlerSource, importedHandlerName }
  // const actionsSource = actionsMap[actionsName]
  //   ? babelService.getRealPathByAlias(actionsMap[actionsName], nonAnalyzedFile)
  //   : ''
  // const result = {
  //   actionsSource,
  //   // actionsName,
  //   actionsPropertyName,
  //   handlerName: importedHandlerName,
  //   handlerSource,
  //   // usages,
  //   rawUsages,
  // }
  // handlerCollector.push(result) // 之后用于得到 handlerActionsMap
  // addActions2HandlerMap(actions2HandlerMap, result) // 之后用于生成依赖图
}
