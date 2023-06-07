import traverse, { Node, NodePath } from '@babel/traverse'
import { ParseResult } from '@babel/parser'
import { File, SourceLocation } from '@babel/types'
import _ from 'lodash'
import pathUtil from 'path'
import {
  getParentPathSkipTSNonNullExpression,
  iterateObjectHandler,
} from '../../helpers/iterationUtil'
import { TActionsMap, TFileCollector, TUnfilteredCollectors, loc2String } from '.'
import { DirectedGraph } from 'graphology'
import { BabelService } from '../babel.service'

export const sagaFileHandler = ({
  babelService,
  // sagaEffectsFuns, // call: 'call', fork: 'fork', put: 'put'
  // unfilteredCollectors,
  actions2HandlerMap,
  nonAnalyzedFile,
  warnings,
  fileAst,
  actionsMap,
}: {
  babelService: BabelService
  actions2HandlerMap: TActionsMap
  // sagaEffectsFuns: TActionsMap
  // unfilteredCollectors: TUnfilteredCollectors
  nonAnalyzedFile: string
  warnings: string[]
  fileAst: ParseResult<File>
  actionsMap: TActionsMap
}) => {
  // const { call: localCall, fork: localFork, put: localPut } = sagaEffectsFuns
  const unfilteredCollectors: TUnfilteredCollectors = {}
  const fileCollector = (unfilteredCollectors[nonAnalyzedFile] = [] as TFileCollector)
  traverse(fileAst, {
    // CRM 项目中所有 saga 文件入口都是 default
    ExportDefaultDeclaration(path: NodePath<any>) {
      path.traverse({
        ExpressionStatement(expressionStatementPath: NodePath<any>) {
          // const usages: string[] = []
          const expression = expressionStatementPath.node.expression
          if (
            expression.type !== 'YieldExpression' ||
            expression.argument.type !== 'CallExpression'
          ) {
            warnings.push(
              `#74 nonAnalyzedFile: ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          }
          const argument = expression.argument
          const calleeArguments = argument.arguments
          if (calleeArguments.length !== 2) {
            warnings.push(
              `#103 calleeArguments.length !== 2: ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          }
          if (calleeArguments[0].type !== 'CallExpression') {
            warnings.push(
              `#103 calleeArguments[0].type !== 'CallExpression': ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          }
          if (calleeArguments[1].type !== 'Identifier') {
            warnings.push(
              `#111 calleeArguments[1].type !== 'Identifier': ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          }
          const firstArgument = calleeArguments[0]
          const secondArgument = calleeArguments[1]
          if (
            firstArgument.type !== 'CallExpression' ||
            firstArgument.arguments.length !== 1 ||
            firstArgument.arguments[0].type !== 'MemberExpression'
          ) {
            warnings.push(
              `#111 firstArgument.arguments[0].type !== 'MemberExpression': ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          }
          if (secondArgument.type !== 'Identifier') {
            warnings.push(
              `#111 secondArgument.type !== 'Identifier': ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          }
          let actionsName: string | undefined, actionsPropertyName: string | undefined
          iterateObjectHandler(firstArgument, (value: any, key) => {
            if (actionsName && actionsPropertyName) {
              return
            }
            if (
              value &&
              value.type === 'MemberExpression' &&
              value.object?.type === 'Identifier'
            ) {
              actionsName = value.object.name
              actionsPropertyName = value.property.name
            }
          })
          let handlerSource = ''
          const localHandlerName = secondArgument.name
          let importedHandlerName = localHandlerName
          if (!actionsName || !actionsPropertyName || !localHandlerName) {
            warnings.push(
              `#187 critical property is missing! actionsName: "${actionsName}", ` +
                `actionsPropertyName: "${actionsPropertyName}", handlerName: "${localHandlerName}".` +
                ` loc: ${loc2String(path.node.loc)}`,
            )
            return
          }
          findLocalActions({
            actionsMap,
            actionsName,
            path,
            warnings,
          })

          const handlerBinding = path.scope.getBinding(localHandlerName)
          const handlerBindingPath = handlerBinding?.path
          const handlerBindingNode = handlerBindingPath?.node
          if (handlerBindingNode?.type === 'ImportSpecifier') {
            if (handlerBindingNode.imported.name !== localHandlerName) {
              importedHandlerName = handlerBindingNode.imported.name
            }
            const importDeclarationPath = handlerBinding?.path.findParent(subPath => {
              return subPath.type === 'ImportDeclaration'
            })
            const relativePath = (importDeclarationPath!.node as any).source.value
            const sourceValue = babelService.getRealPathByAlias(
              relativePath,
              nonAnalyzedFile,
            )
            console.log('#146 handlerBindingNode:', handlerBindingNode)
            handlerSource = sourceValue
          } else if (handlerBindingNode?.type !== 'FunctionDeclaration') {
            console.log(
              `#140 localHandlerName: ${localHandlerName}\nhandlerBindingNode:`,
              handlerBindingNode,
            )
            warnings.push(
              `#146 handlerBindingNode?.type !== 'FunctionDeclaration': localHandlerName: ${localHandlerName}, loc: ${
                handlerBindingNode?.loc
                  ? loc2String(handlerBindingNode?.loc as SourceLocation)
                  : ''
              }`,
            )
          } else {
            handlerSource = nonAnalyzedFile
          }

          // WangFan TODO 2023-06-07 10:04:47 迁移到 handler2Map
          // const handlerBinding = path.scope.getBinding(handlerName)
          // const handlerBindingPath = handlerBinding?.path
          // const handlerBindingNode = handlerBindingPath?.node
          // if (handlerBindingNode?.type !== 'FunctionDeclaration') {
          //   console.log(
          //     `#140 handlerName: ${handlerName}\nhandlerBindingNode:`,
          //     handlerBindingNode,
          //   )
          //   warnings.push(
          //     `#146 handlerBindingNode?.type !== 'FunctionDeclaration': handlerName: ${handlerName}, loc: ${
          //       handlerBindingNode?.loc
          //         ? loc2String(handlerBindingNode?.loc as SourceLocation)
          //         : ''
          //     }`,
          //   )
          // } else {
          //   handlerBindingPath!.traverse({
          //     IfStatement(subPath) {
          //       if (subPath.node.test.type === 'BinaryExpression') {
          //         const leftAndRight = [subPath.node.test.left, subPath.node.test.right]
          //         for (let i = 0; i < 2; i++) {
          //           const leftOrRight = leftAndRight[i]
          //           if (
          //             leftOrRight.type === 'Identifier' &&
          //             leftOrRight.name === 'usage'
          //           ) {
          //             const j = (i + 1) % 2
          //             const memberExpression = leftAndRight[j] as any
          //             if (memberExpression.type === 'MemberExpression') {
          //               usages.push(
          //                 memberExpression.object.name +
          //                   '.' +
          //                   memberExpression.property.name,
          //               )
          //             }
          //             break
          //           }
          //         }
          //       }
          //     },
          //     // 处理 redux-saga put
          //     CallExpression(subPath) {
          //       const { node: subNode } = subPath
          //       if (
          //         subNode.callee.type === 'Identifier' &&
          //         subNode.callee.name === localPut
          //       ) {
          //         const firstArgument = subNode.arguments[0]
          //         // console.log('#170 firstArgument:', firstArgument)

          //         const parseFirstArgument = (value: any, key?: any) => {
          //           if (
          //             !_.endsWith(value?.callee?.type, 'MemberExpression') ||
          //             !value.callee.object.name ||
          //             !value.callee.property.name
          //           ) {
          //             return false
          //           }
          //           // console.log('#167 MemberExpression:', value)
          //           const actionsSourceValue = findLocalActions({
          //             actionsMap,
          //             actionsName: value.callee.object.name,
          //             path: subPath,
          //             warnings,
          //           })
          //           if (actionsSourceValue) {
          //             const actionsName2 = value.callee.object.name
          //             const actionsPropertyName2 = value.callee.property.name
          //             const theArgument = value.arguments[0]

          //             let usageName2 = ''
          //             const getUsageName2 = (value: any, key?: string) => {
          //               if (
          //                 value.type == 'ObjectProperty' &&
          //                 value.key.name === 'usage' &&
          //                 _.endsWith(value.value.type, 'MemberExpression')
          //               ) {
          //                 usageName2 = `${value.value.object.name}.${value.value.property.name}`
          //                 return true
          //               }
          //               return false
          //             }
          //             const flag = getUsageName2(theArgument)
          //             if (!flag) {
          //               iterateObjectHandler(theArgument, (value: any, key: any) => {
          //                 getUsageName2(value)
          //               })
          //             }
          //             const toPrintArray = [
          //               '#191 actionsName2:',
          //               actionsName2,
          //               'actionsPropertyName2:',
          //               actionsPropertyName2,
          //             ]
          //             if (usageName2) {
          //               toPrintArray.push('usageName2:', usageName2)
          //             }
          //             console.log.apply(this, toPrintArray)
          //           } else {
          //             warnings.push(
          //               `#201 actions not found by , ${value.callee.object.name}, loc: ${
          //                 subPath.node.loc ? loc2String(subPath.node.loc) : ''
          //               }`,
          //             )
          //           }
          //           return true
          //         }

          //         const flag = parseFirstArgument(firstArgument)

          //         if (!flag) {
          //           iterateObjectHandler(firstArgument, parseFirstArgument)
          //         }
          //       }
          //     },
          //   })
          //   // console.log(`#182 handlerName: "${handlerName}" usages:`, usages)
          // }
          // actions2HandlerMap[[actionsMap[actionsName]]: {

          // }]
          const actionsSource = actionsMap[actionsName]
            ? babelService.getRealPathByAlias(actionsMap[actionsName], nonAnalyzedFile)
            : ''
          const result = {
            actionsSource,
            // actionsName,
            actionsPropertyName,
            handlerName: importedHandlerName,
            handlerSource,
            // usages,
          }
          fileCollector.push(result) // 之后用于得到 handlerActionsMap
          addActionsMap(actions2HandlerMap, result) // 之后用于生成依赖图
          // buildDirectedGrpah()
        },
      })
    },
  })
}

const addActionsMap = (
  map: TActionsMap,
  {
    actionsSource,
    // actionsName,
    actionsPropertyName,
    handlerName,
    handlerSource,
  }: // usages,
  {
    actionsSource: string
    // actionsName: string
    actionsPropertyName: string
    handlerName: string
    handlerSource: string
    // usages: string[]
  },
) => {
  const key = `${actionsSource},${actionsPropertyName}`
  if (!map[key]) {
    map[key] = []
  }
  const mapValue = map[key]
  const record = map[key].filter(
    (a: any) => a.handlerName === handlerName && a.handlerSource === handlerSource,
  )[0]
  if (_.isEmpty(record)) {
    mapValue.push({
      handlerName,
      handlerSource,
      // usages,
    })
  } /*  else {
    const recordUsages = _.uniq([...record.usages, ...usages].filter(a => a))
    if (!_.isEmpty(recordUsages)) {
      record.usages = recordUsages
    }
  } */
}

const buildDirectedGrpah = (directedGraph: DirectedGraph, a: string, b: string) => {
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  if (!directedGraph.hasNode(a)) {
    directedGraph.addNode(a)
  }
  if (!directedGraph.hasNode(b)) {
    directedGraph.addNode(b)
  }
  const edge = directedGraph.edge(a, b)
  if (!directedGraph.hasEdge(edge)) {
    directedGraph.addDirectedEdge(a, b)
  }
  return directedGraph
}

const findLocalActions = ({
  actionsMap,
  actionsName,
  path,
  warnings,
}: {
  actionsMap: TActionsMap
  actionsName: string
  warnings: string[]
  path: NodePath<any>
}) => {
  if (!actionsMap[actionsName]) {
    const actionsBinding = path.scope.getBinding(actionsName)
    const actionsBindingPath = actionsBinding?.path as NodePath<any>
    const actionsBindingParentPath =
      getParentPathSkipTSNonNullExpression(actionsBindingPath)
    const bindingType = actionsBindingPath.node.type // 'ImportNamespaceSpecifier'
    const bindingParentType = actionsBindingParentPath.node.type // 'ImportDeclaration'
    if (
      bindingType !== 'ImportNamespaceSpecifier' ||
      bindingParentType !== 'ImportDeclaration'
    ) {
      warnings.push(
        '#187 bindingType or bindingParentType unhandled:' +
          loc2String(actionsBindingPath.node.loc),
      )
    } else {
      actionsMap[actionsName] = (actionsBindingParentPath?.node as any)?.source?.value
    }
  }
  return actionsMap[actionsName]
}

/**
 * 处理 actions 调用的各种情况
 */
export const addCallExpressionPaths = (
  subPath: NodePath<any>,
  actionsExportedNames: any,
  callExpressionPaths: any,
) => {
  if (
    (subPath.node as any)?.name === 'actions' &&
    _.endsWith(
      getParentPathSkipTSNonNullExpression(subPath).node.type,
      'MemberExpression',
    ) &&
    _.endsWith(
      getParentPathSkipTSNonNullExpression(subPath, 2).node.type,
      'CallExpression',
    )
  ) {
    console.log('#98 buildSingleActionsGraph')
    const memberExpressionPath = getParentPathSkipTSNonNullExpression(subPath)
    actionsExportedNames.push((memberExpressionPath.node as any).property.name)
    callExpressionPaths.push(getParentPathSkipTSNonNullExpression(subPath, 2))
    return
  }

  if (
    (subPath.node as any)?.name === 'actions' &&
    (getParentPathSkipTSNonNullExpression(subPath).node as any).object?.name ===
      'props' &&
    _.endsWith(
      getParentPathSkipTSNonNullExpression(subPath, 2).node.type,
      'MemberExpression',
    ) &&
    _.endsWith(
      getParentPathSkipTSNonNullExpression(subPath, 3).node.type,
      'CallExpression',
    )
  ) {
    console.log('#114 buildSingleActionsGraph')
    const memberExpressionPath = getParentPathSkipTSNonNullExpression(subPath, 2)
    actionsExportedNames.push((memberExpressionPath.node as any).property.name)
    callExpressionPaths.push(getParentPathSkipTSNonNullExpression(subPath, 3))
    return
  }

  if (
    (subPath.node as any)?.name === 'actions' &&
    (getParentPathSkipTSNonNullExpression(subPath).node as any).object?.type ===
      'MemberExpression' &&
    (getParentPathSkipTSNonNullExpression(subPath).node as any).object?.object?.type ===
      'ThisExpression' &&
    (getParentPathSkipTSNonNullExpression(subPath).node as any).object?.property?.name ===
      'props'
  ) {
    console.log('#126 buildSingleActionsGraph')
    const startLine =
      getParentPathSkipTSNonNullExpression(subPath).node.loc?.start.line ?? -1
    const endLine = getParentPathSkipTSNonNullExpression(subPath).node.loc?.end.line ?? -1
    const memberExpressionPath = getParentPathSkipTSNonNullExpression(subPath).findParent(
      subPath2 =>
        _.endsWith(subPath2.node.type, 'MemberExpression') &&
        (getParentPathSkipTSNonNullExpression(subPath2).node.loc?.start.line ?? -2) <=
          startLine &&
        (getParentPathSkipTSNonNullExpression(subPath2).node.loc?.end.line ?? -2) >=
          endLine &&
        _.endsWith(
          getParentPathSkipTSNonNullExpression(subPath2).node.type,
          'CallExpression',
        ),
    )
    if (!memberExpressionPath) {
      console.log('#177 subPath.node:', subPath.node)
    } else {
      actionsExportedNames.push((memberExpressionPath.node as any).property.name)
      callExpressionPaths.push(getParentPathSkipTSNonNullExpression(memberExpressionPath))
      return
    }
  }

  if (
    getParentPathSkipTSNonNullExpression(subPath).node.type === 'ObjectProperty' &&
    (getParentPathSkipTSNonNullExpression(subPath).node as any).key.name === 'actions' &&
    _.isArray(
      (getParentPathSkipTSNonNullExpression(subPath).node as any).value.properties,
    )
  ) {
    console.log('#192 buildSingleActionsGraph')
    for (const property of (getParentPathSkipTSNonNullExpression(subPath).node as any)
      .value.properties) {
      const exportedName = property.key.name
      const localName = property.value.name
      const localBinding = subPath.scope.getBinding(localName)
      const referencePaths = localBinding?.referencePaths ?? []
      for (const referencePath of referencePaths) {
        const referenceParentPath = getParentPathSkipTSNonNullExpression(referencePath)
        if (referenceParentPath.node.type === 'CallExpression') {
          actionsExportedNames.push(exportedName)
          callExpressionPaths.push(referenceParentPath)
          break
        }
      }
    }
    return
  }

  /* if ((subPath.node as any)?.name === 'actions') {
    console.log(
      '#150 getParentPathSkipTSNonNullExpression(subPath).node:',
      getParentPathSkipTSNonNullExpression(subPath).node,
    )
    console.log(
      '#154 getParentPathSkipTSNonNullExpression(subPath, 2).node:',
      getParentPathSkipTSNonNullExpression(subPath, 2).node,
    )
    console.log(
      '#158 getParentPathSkipTSNonNullExpression(subPath, 3).node:',
      getParentPathSkipTSNonNullExpression(subPath, 3).node,
    )
  } */
}
