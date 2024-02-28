import traverse, { Node, NodePath } from '@babel/traverse'
import { ParseResult } from '@babel/parser'
import { File, SourceLocation } from '@babel/types'
import _ from 'lodash'
import pathUtil from 'path'
import {
  getParentPathSkipTSNonNullExpression,
  iterateObjectHandler,
} from 'app/helpers/iterationUtil'
import { TActionsMap, TFileCollectorElement, loc2String } from '.'
import { DirectedGraph } from 'graphology'
import { BabelService } from '../babel.service'
import { findGitRepo, getFileData, isDirectory, mkdirSync } from 'app/helpers/fsUtils'
import { RootObject as RootObject4GraphNodes } from 'app/mock/graphNodes/graphNodes.json.d'
import { RootObject as RootObject4FileActions } from 'app/mock/fileActions/fileActions.json.d'
import type { RootBuildSagaMap } from 'app/mock/sagaMap/buildSagaMap.json.d'
import type { RootActionsMap } from 'app/mock/fileActionsMap/fileActionsMap.json.d'
import type { RootSagaGraph } from 'app/mock/sagaGraph/sagaGraph.d'
import { getFilesByLocalIdentifier } from './sagaHelper'
import { parseCreateNetworkingSagas } from './createNetworkingSagasHelper'
import fs from 'fs'

export const fillInHandler2ActionsMap = async ({
  babelService,
  handler2ActionsMap,
  handlerCollector,
  warnings,
  nonAnalyzedFile,
  fileAst,
  sagaEffectsFuns,
}: {
  babelService: BabelService
  handler2ActionsMap: TActionsMap
  handlerCollector: TFileCollectorElement[]
  warnings: string[]
  nonAnalyzedFile: string
  fileAst: ParseResult<File>
  sagaEffectsFuns: TActionsMap
}) => {
  const { call: localCall, fork: localFork, put: localPut } = sagaEffectsFuns
  const noPutHandlers: string[] = []
  for (const collector of handlerCollector) {
    const actionsMap: TActionsMap = {}
    const { actionsSource, actionsPropertyName, handlerName, handlerSource } = collector
    // const usages: string[] = []
    let ast = fileAst
    if (handlerSource !== nonAnalyzedFile) {
      if (!handlerSource) {
        throw new Error(
          `#40 !handlerSource analyzedFile: ${nonAnalyzedFile}, ` +
            `\nactionsSource: ${actionsSource}, \nactionsSource: ${actionsPropertyName}, ` +
            `\nactionsSource: ${handlerName}, \nactionsSource: ${handlerSource}`,
        )
      }
      ast = await babelService.getAst(handlerSource)
    }
    let hasLocalPut = false
    traverse(ast, {
      enter(path) {
        const handlerBinding = path.scope.getBinding(handlerName)
        const handlerBindingPath = handlerBinding?.path
        const handlerBindingNode = handlerBindingPath?.node as any

        let isCreateNetworkingSagas = false
        if (
          handlerBindingNode?.type === 'VariableDeclarator' &&
          handlerBindingNode?.init?.type === 'CallExpression' &&
          handlerBindingNode?.init?.callee?.name === 'createNetworkingSagas'
        ) {
          isCreateNetworkingSagas = true
        }

        if (
          handlerBindingNode?.type !== 'FunctionDeclaration' &&
          !isCreateNetworkingSagas
        ) {
          warnings.push(
            `#68 handlerBindingNode?.type !== 'FunctionDeclaration': nonAnalyzedFile: ${nonAnalyzedFile} handlerName: ${handlerName}, loc: ${
              handlerBindingNode?.loc
                ? loc2String(handlerBindingNode?.loc as SourceLocation)
                : ''
            }`,
          )
        } else {
          handlerBindingPath!.traverse({
            // fillInHandler2ActionsMap 方法中不需要搜集所有的 usage 分支
            /* IfStatement(subPath) {
              if (subPath.node.test.type === 'BinaryExpression') {
                const leftAndRight = [subPath.node.test.left, subPath.node.test.right]
                for (let i = 0; i < 2; i++) {
                  const leftOrRight = leftAndRight[i]
                  if (leftOrRight.type === 'Identifier' && leftOrRight.name === 'usage') {
                    const j = (i + 1) % 2
                    const memberExpression = leftAndRight[j] as any
                    if (memberExpression.type === 'MemberExpression') {
                      usages.push(
                        memberExpression.object.name +
                          '.' +
                          memberExpression.property.name,
                      )
                    }
                    break
                  }
                }
              }
            }, */
            // 处理 redux-saga put
            CallExpression(subPath) {
              const { node: subNode } = subPath
              if (
                subNode.callee.type === 'Identifier' &&
                subNode.callee.name === localPut
              ) {
                hasLocalPut = true
                const firstArgument = subNode.arguments[0]
                // console.log('#170 firstArgument:', firstArgument)
                const parseFirstArgument = (value: any, key?: any) => {
                  if (
                    !_.endsWith(value?.callee?.type, 'MemberExpression') ||
                    !value.callee.object.name ||
                    !value.callee.property.name
                  ) {
                    return false
                  }
                  // console.log('#167 MemberExpression:', value)
                  const actionsSourceValue = findLocalActions({
                    nonAnalyzedFile,
                    node: subNode,
                    actionsMap,
                    actionsName: value.callee.object.name,
                    path: subPath,
                    warnings,
                  })
                  if (actionsSourceValue) {
                    const actionsPropertyName2 = value.callee.property.name
                    const theArgument = value.arguments[0]
                    let usageName = ''
                    const getUsageName = (value: any, key?: string) => {
                      if (
                        value.type == 'ObjectProperty' &&
                        value.key.name === 'usage' &&
                        _.endsWith(value.value.type, 'MemberExpression')
                      ) {
                        usageName = `${value.value.object.name}.${value.value.property.name}`
                        return true
                      }
                      return false
                    }

                    const flag = theArgument ? getUsageName(theArgument) : true
                    if (!flag) {
                      iterateObjectHandler(theArgument, (value: any, key: any) =>
                        getUsageName(value),
                      )
                    }
                    addHandler2ActionsMap(handler2ActionsMap, {
                      actionsSource,
                      actionsPropertyName,
                      handlerName,
                      handlerSource,
                      actionsSource2: babelService.getAbsolutePathByAlias(
                        actionsSourceValue,
                        nonAnalyzedFile,
                      ),
                      actionsPropertyName2,
                      usageName,
                    })
                  } else {
                    if (!['Date'].includes(value.callee?.object?.name)) {
                      warnings.push(
                        `#201 actions not found by , ${value.callee.object.name}, loc: ${
                          subPath.node.loc ? loc2String(subPath.node.loc) : ''
                        }`,
                      )
                    }
                  }
                  return true
                }
                const flag = parseFirstArgument(firstArgument)
                if (!flag) {
                  iterateObjectHandler(firstArgument, parseFirstArgument)
                }
              }
            },
          })
          if (!hasLocalPut) {
            noPutHandlers.push(`${handlerSource},${handlerName}`)
          }
        }
        path.stop()
      },
    })
  }
  if (!_.isEmpty(noPutHandlers)) {
    console.log('#176 noPutHandlers:', noPutHandlers)
  }
}

export const addHandler2ActionsMap = (
  handler2ActionsMap: TActionsMap,
  {
    actionsSource,
    actionsPropertyName,
    handlerName,
    handlerSource,
    actionsSource2,
    actionsPropertyName2,
    usageName,
  }: {
    actionsSource: string
    actionsPropertyName: string
    handlerName: string
    handlerSource: string
    actionsSource2: string
    actionsPropertyName2: string
    usageName: string
  },
) => {
  const key = `${handlerSource},${handlerName}`
  if (!handler2ActionsMap[key]) {
    handler2ActionsMap[key] = []
  }
  const actions2HandlerKey = `${actionsSource},${actionsPropertyName}` // 指向这个 handler的 action
  const actions2HandlerKey2 = `${actionsSource2},${actionsPropertyName2}` // 这个 handler 触发的 action
  let existed = handler2ActionsMap[key].filter(
    (a: any) =>
      a.actions2HandlerKey === actions2HandlerKey &&
      a.actions2HandlerKey2 === actions2HandlerKey2,
  )[0]
  if (!existed) {
    existed = {
      actions2HandlerKey,
      actions2HandlerKey2,
    }
    handler2ActionsMap[key].push(existed)
  }
  if (usageName) {
    if (!_.isArray(existed.usageNames)) {
      existed.usageNames = [usageName]
    } else {
      existed.usageNames = _.uniq([...existed.usageNames, usageName].filter(a => a))
    }
  }
}

export const fillInActions2HandlerMap = async ({
  babelService,
  actions2HandlerMap,
  nonAnalyzedFile,
  warnings,
  fileAst,
  sagaEffectsFuns,
  toAnalyzeFiles,
}: {
  babelService: BabelService
  actions2HandlerMap: TActionsMap
  nonAnalyzedFile: string
  warnings: string[]
  fileAst: ParseResult<File>
  sagaEffectsFuns: TActionsMap
  toAnalyzeFiles: string[]
}) => {
  const {
    call: localCall,
    fork: localFork,
    put: localPut,
    all: localAll,
  } = sagaEffectsFuns
  const handlerCollector: TFileCollectorElement[] = []
  const actionsMap: TActionsMap = {}
  traverse(fileAst, {
    // CRM 项目中所有 saga 文件入口都是 default
    ExportDefaultDeclaration(path: NodePath<any>) {
      path.traverse({
        ObjectExpression(objectExpressionPath: NodePath<any>) {
          objectExpressionPath.traverse({
            CallExpression(callExpressionPath) {
              const callExpressionNode = callExpressionPath.node
              if (localFork === (callExpressionNode.callee as any)?.name) {
                if (callExpressionNode.arguments.length !== 1) {
                  warnings.push(
                    `fillInActions2HandlerMap #270 callExpressionNode.arguments.length !== 1 nonAnalyzedFile: ${nonAnalyzedFile}`,
                  )
                  path.stop()
                  return
                } else if (callExpressionNode.arguments[0].type !== 'Identifier') {
                  warnings.push(
                    `fillInActions2HandlerMap #277 callExpressionNode.arguments[0].type !== 'Identifier' nonAnalyzedFile: ${nonAnalyzedFile}`,
                  )
                  path.stop()
                  return
                }
                const localIdentifier = callExpressionNode.arguments[0].name
                const toAnalyzeFile = getFilesByLocalIdentifier({
                  babelService,
                  filePath: nonAnalyzedFile,
                  localIdentifier,
                  path,
                })
                toAnalyzeFiles.push(toAnalyzeFile)
              }
            },
          })
        },
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
          const yieldArgument = expression.argument
          const calleeArguments = yieldArgument.arguments
          const calleeName =
            yieldArgument.type === 'CallExpression' ? yieldArgument.callee?.name : ''
          if (calleeName === localAll) {
            if (
              calleeArguments.length !== 1 ||
              calleeArguments[0].type !== 'Identifier'
            ) {
              warnings.push(
                `#281 calleeArguments.length !== 1 || calleeArguments[0].type !== 'Identifier': ${nonAnalyzedFile}, loc: ${loc2String(
                  expression.loc,
                )}`,
              )
            }
            const sagas = calleeArguments[0].name
            const sagasBinding = path.scope.getBinding(sagas)
            const sagasBindingNode = sagasBinding?.path.node
            if (
              sagasBindingNode?.type !== 'VariableDeclarator' ||
              !['ObjectExpression', 'TSAsExpression'].includes(
                sagasBindingNode?.init?.type ?? '',
              )
            ) {
              warnings.push(
                `#281 sagasBindingNode?.type !== 'VariableDeclarator': ${nonAnalyzedFile}, loc: ${loc2String(
                  expression.loc,
                )}`,
              )
              return
            }

            const sagaNames: string[] = []
            sagasBinding!.path.traverse({
              SpreadElement(subPath) {
                const { node: subNode } = subPath as any
                if (
                  subNode.type === 'SpreadElement' &&
                  subNode.argument.type === 'Identifier'
                ) {
                  sagaNames.push(subNode.argument.name)
                }
              },
              CallExpression(subPath) {
                const { node: subNode } = subPath as any
                if (
                  subNode.type === 'CallExpression' &&
                  subNode.callee?.name === localFork &&
                  subNode.arguments.length === 1 &&
                  subNode.arguments[0].type === 'Identifier'
                ) {
                  sagaNames.push(subNode.arguments[0].name)
                }
              },
            })
            // console.log('#327 nonAnalyzedFile:', nonAnalyzedFile, 'sagaNames:', sagaNames)
            for (const sagaName of sagaNames) {
              const sagaBinding = path.scope.getBinding(sagaName)
              const sagaBindingNode = sagaBinding?.path.node
              if (sagaBindingNode?.type === 'ImportDefaultSpecifier') {
                const importDeclaration = sagaBinding!.path.findParent(
                  subPath => subPath.node.type === 'ImportDeclaration',
                )
                const alias = (importDeclaration.node as any).source.value
                const absPath = babelService.getAbsolutePathByAlias(
                  alias,
                  nonAnalyzedFile,
                )
                toAnalyzeFiles.push(absPath)
              } else if (sagaBindingNode?.type === 'ImportSpecifier') {
                const importDeclaration = sagaBinding!.path.findParent(
                  subPath => subPath.node.type === 'ImportDeclaration',
                )
                const alias = (importDeclaration.node as any).source.value
                const absPath = babelService.getAbsolutePathByAlias(
                  alias,
                  nonAnalyzedFile,
                )
                toAnalyzeFiles.push(absPath)
              }
            }
            return
          } else if (!calleeName.includes('take')) {
            const handlerBinding = path.scope.getBinding(calleeName)
            const handlerBindingNode = handlerBinding?.path.node as any
            const initCalleeName = handlerBindingNode?.init?.callee?.name
            if (initCalleeName === 'createNetworkingSagas') {
              parseCreateNetworkingSagas({
                actions2HandlerMap,
                calleeName,
                handlerCollector,
                expressionNode: expressionStatementPath.node,
                path: handlerBinding?.path,
                nonAnalyzedFile,
                actionsMap,
                warnings,
                babelService,
              })
            } else {
              console.log('#282 expression:', expression)
              warnings.push(
                `#281 !calleeName.includes('take'): ${nonAnalyzedFile}, loc: ${loc2String(
                  expression.loc,
                )}, calleeName: ${calleeName}`,
              )
            }
            return
          } else if (calleeArguments.length !== 2) {
            console.log('#290 expression:', expression)
            warnings.push(
              `#292 calleeArguments.length !== 2: ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          }

          const isActionsStringWrapped =
            calleeArguments[0].type === 'CallExpression' &&
            calleeArguments[0].callee.name === 'String'
          /* if (
            calleeArguments[0].type === 'CallExpression' &&
            calleeArguments[0].callee.name === 'String'
          ) {
            warnings.push(
              `#300 calleeArguments[0].type !== 'CallExpression': ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          } */
          if (calleeArguments[1].type !== 'Identifier') {
            warnings.push(
              `#307 calleeArguments[1].type !== 'Identifier': ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          }
          const firstArgument = calleeArguments[0]
          const secondArgument = calleeArguments[1]
          if (
            isActionsStringWrapped &&
            (firstArgument.type !== 'CallExpression' ||
              firstArgument.arguments.length !== 1 ||
              firstArgument.arguments[0].type !== 'MemberExpression')
          ) {
            warnings.push(
              `#311 firstArgument.arguments[0].type !== 'MemberExpression': ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          }
          if (secondArgument.type !== 'Identifier') {
            warnings.push(
              `#319 secondArgument.type !== 'Identifier': ${nonAnalyzedFile}, loc: ${loc2String(
                expression.loc,
              )}`,
            )
            return
          }
          let stringLiteralActions: string | undefined,
            actionsName: string | undefined,
            actionsPropertyName: string | undefined
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

          let handlerSource = ''
          const localHandlerName = secondArgument.name
          let importedHandlerName = localHandlerName
          if (!actionsName || !actionsPropertyName || !localHandlerName) {
            warnings.push(
              `#344 critical property is missing! nonAnalyzedFile: ${nonAnalyzedFile} actionsName: "${actionsName}", ` +
                `actionsPropertyName: "${actionsPropertyName}", handlerName: "${localHandlerName}".` +
                ` loc: ${loc2String(path.node.loc)}`,
            )
            return
          }
          if (!stringLiteralActions) {
            findLocalActions({
              nonAnalyzedFile,
              node: expressionStatementPath.node,
              actionsMap,
              actionsName,
              path,
              warnings,
            })
          } else {
            actionsMap[stringLiteralActions] = stringLiteralActions
          }

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
            const sourceValue = babelService.getAbsolutePathByAlias(
              relativePath,
              nonAnalyzedFile,
            )
            handlerSource = sourceValue
          } else if (handlerBindingNode?.type !== 'FunctionDeclaration') {
            warnings.push(
              `#379 handlerBindingNode?.type !== 'FunctionDeclaration': nonAnalyzedFile: ${nonAnalyzedFile} localHandlerName: ${localHandlerName}, loc: ${
                handlerBindingNode?.loc
                  ? loc2String(handlerBindingNode?.loc as SourceLocation)
                  : ''
              }`,
            )
          } else {
            handlerSource = nonAnalyzedFile
          }

          const rawUsages = { handlerSource, importedHandlerName }
          const actionsSource = actionsMap[actionsName]
            ? babelService.getAbsolutePathByAlias(
                actionsMap[actionsName],
                nonAnalyzedFile,
              )
            : ''
          const result = {
            actionsSource,
            // actionsName,
            actionsPropertyName,
            handlerName: importedHandlerName,
            handlerSource,
            // usages,
            rawUsages,
          }
          handlerCollector.push(result) // 之后用于得到 handlerActionsMap
          addActions2HandlerMap(actions2HandlerMap, result) // 之后用于生成依赖图
          // buildDirectedGrpah()
        },
      })
    },
  })

  const promises: Promise<any>[] = []
  Object.keys(actions2HandlerMap).forEach(k => {
    const arr = actions2HandlerMap[k]
    arr
      .map(
        (elem: any) =>
          new Promise((rsv, rej) => {
            const { handlerSource, importedHandlerName } = elem.rawUsages
            findUsages({
              nonAnalyzedFile,
              handlerSource,
              importedHandlerName,
              ast: fileAst,
              tsconfigPath: babelService.tsconfigPath,
              warnings,
            }).then(usages => {
              if (!_.isEmpty(usages)) {
                elem.usages = usages
              }
              rsv(elem)
            })
          }),
      )
      .forEach((a: any) => promises.push(a))
  })

  await Promise.all(promises)
  return handlerCollector
}

/** 找到一个方法中所有的 usage 分支 */
const findUsages = async ({
  nonAnalyzedFile,
  handlerSource,
  importedHandlerName,
  ast,
  tsconfigPath,
  warnings,
}: {
  importedHandlerName: string
  nonAnalyzedFile: string
  handlerSource: string
  ast: ParseResult<File>
  tsconfigPath: string
  warnings: string[]
}) => {
  let fileAst = ast
  if (nonAnalyzedFile !== handlerSource) {
    const babelService = new BabelService()
    await babelService.setAlias(tsconfigPath)
    fileAst = await babelService.getAst(handlerSource)
  }
  const usages: string[] = []
  traverse(fileAst, {
    enter(path) {
      const handlerBinding = path.scope.getBinding(importedHandlerName)
      const handlerBindingPath = handlerBinding?.path
      const handlerBindingNode = handlerBindingPath?.node as any
      if (handlerBindingNode?.type !== 'FunctionDeclaration') {
        if (
          handlerBindingNode?.init.type === 'CallExpression' &&
          handlerBindingNode?.init.callee.name === 'createNetworkingSagas'
        ) {
          console.log(
            `#619 handlerBindingNode?.init.callee.name === 'createNetworkingSagas': nonAnalyzedFile: ${nonAnalyzedFile} importedHandlerName: ${importedHandlerName}, loc: ${
              handlerBindingNode?.loc
                ? loc2String(handlerBindingNode?.loc as SourceLocation)
                : ''
            }`,
          )
        } else {
          warnings.push(
            `#627 handlerBindingNode?.type !== 'FunctionDeclaration': nonAnalyzedFile: ${nonAnalyzedFile} importedHandlerName: ${importedHandlerName}, loc: ${
              handlerBindingNode?.loc
                ? loc2String(handlerBindingNode?.loc as SourceLocation)
                : ''
            }`,
          )
        }
      } else {
        handlerBindingPath!.traverse({
          IfStatement(subPath) {
            if (subPath.node.test.type === 'BinaryExpression') {
              const leftAndRight = [subPath.node.test.left, subPath.node.test.right]
              for (let i = 0; i < 2; i++) {
                const leftOrRight = leftAndRight[i]
                if (leftOrRight.type === 'Identifier' && leftOrRight.name === 'usage') {
                  const j = (i + 1) % 2
                  const memberExpression = leftAndRight[j] as any
                  if (memberExpression.type === 'MemberExpression') {
                    usages.push(
                      memberExpression.object.name + '.' + memberExpression.property.name,
                    )
                  }
                  break
                }
              }
            }
          },
        })
        // console.log(`#182 handlerName: "${handlerName}" usages:`, usages)
      }
      path.stop()
    },
  })

  return usages
}

export const addActions2HandlerMap = (
  map: TActionsMap,
  {
    actionsSource,
    // actionsName,
    actionsPropertyName,
    handlerName,
    handlerSource,
    rawUsages,
  }: // usages,
  {
    actionsSource: string
    // actionsName: string
    actionsPropertyName: string
    handlerName: string
    handlerSource: string
    rawUsages: { handlerSource: string; importedHandlerName: string }
    // usages: string[]
  },
) => {
  const key = `${actionsSource},${actionsPropertyName}`
  if (!map[key]) {
    map[key] = []
  }
  const handler2ActionsKey = `${handlerSource},${handlerName}`
  const mapValue = map[key]
  const record = map[key].filter(
    (a: any) => a.handler2ActionsKey === handler2ActionsKey,
  )[0]
  if (_.isEmpty(record)) {
    mapValue.push({
      handler2ActionsKey,
      rawUsages,
      // usages,
    })
  } else {
    const recordRawUsages = _.uniqBy(
      [...record.rawUsages, rawUsages],
      a => a.handlerSource + a.importedHandlerName,
    )
    if (!_.isEmpty(recordRawUsages)) {
      record.rawUsages = recordRawUsages
    }
  }
  // console.log('#535 map keys.length', Object.keys(map).length)
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

export const findLocalActions = ({
  nonAnalyzedFile,
  node: subNode,
  actionsMap,
  actionsName,
  path,
  warnings,
}: {
  nonAnalyzedFile: string
  node: Node
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
    if (!actionsBindingPath) {
      if (!['Date'].includes(actionsName)) {
        console.log(
          `#563 !actionsBindingPath nonAnalyzedFile: ${nonAnalyzedFile} actionsName: ${actionsName}`,
          'subNode:',
          subNode,
        )
        warnings.push(
          `#563 !actionsBindingPath nonAnalyzedFile: ${nonAnalyzedFile}, actionsName: ${actionsName}, ` +
            `loc: ${loc2String(path.node.loc)}`,
        )
      }
      return null
    }
    const bindingType = actionsBindingPath.node.type // 'ImportNamespaceSpecifier'
    const bindingParentType = actionsBindingParentPath.node.type // 'ImportDeclaration'
    if (
      bindingType !== 'ImportNamespaceSpecifier' ||
      bindingParentType !== 'ImportDeclaration'
    ) {
      warnings.push(
        `#187 bindingType or bindingParentType unhandled nonAnalyzedFile: ${nonAnalyzedFile} loc: ${loc2String(
          actionsBindingPath.node.loc,
        )}`,
      )
    } else {
      /* actionsMap[actionsName] = babelService.getRealPathByAlias(
        (actionsBindingParentPath?.node as any)?.source?.value,
        nonAnalyzedFile,
      ) */
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
    console.log('#98 buildSingleActionsMap')
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
    console.log('#114 buildSingleActionsMap')
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
    console.log('#126 buildSingleActionsMap')
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
    console.log('#192 buildSingleActionsMap')
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

export const getGraphNodes = async () =>
  JSON.parse(
    (
      await getFileData(
        pathUtil.resolve(
          __dirname.slice(0, __dirname.indexOf('app')),
          './app/mock/graphNodes/graphNodes.json',
        ),
      )
    )?.toString(),
  ) as RootObject4GraphNodes

export const getFileActions = async () =>
  JSON.parse(
    (
      await getFileData(
        pathUtil.resolve(
          __dirname.slice(0, __dirname.indexOf('app')),
          './app/mock/fileActions/fileActions.json',
        ),
      )
    )?.toString(),
  ) as RootObject4FileActions

export const getActionsMap = async () =>
  JSON.parse(
    (
      await getFileData(
        pathUtil.resolve(
          __dirname.slice(0, __dirname.indexOf('app')),
          './app/mock/fileActionsMap/fileActionsMap.json',
        ),
      )
    )?.toString(),
  ) as RootActionsMap

export const getSagaMap = async () =>
  JSON.parse(
    (
      await getFileData(
        pathUtil.resolve(
          __dirname.slice(0, __dirname.indexOf('app')),
          './app/mock/sagaMap/buildSagaMap.json',
        ),
      )
    )?.toString(),
  ) as RootBuildSagaMap

export const getSagaGraph = async () =>
  JSON.parse(
    (
      await getFileData(
        pathUtil.resolve(
          __dirname.slice(0, __dirname.indexOf('app')),
          './app/mock/sagaGraph/sagaGraph.json',
        ),
      )
    )?.toString(),
  ) as RootSagaGraph

export function getWriteFolderAndWritePath(filePath: string, baseDirectory?: string) {
  const projectPath = findGitRepo(filePath)
  const prjArr = projectPath?.split(pathUtil.sep).filter(a => a)
  const writeFolder = _.trim(prjArr?.slice(-1).join('_'))

  const relativePathStr = filePath.slice(projectPath?.length)
  const rpArr = relativePathStr.split(pathUtil.sep).filter(a => a)
  const writePath = pathUtil.join(writeFolder, rpArr.join('_'))
  const response = { writeFolder, writePath }
  if (baseDirectory) {
    response.writeFolder = pathUtil.join(baseDirectory, response.writeFolder)
    response.writePath = pathUtil.join(baseDirectory, response.writePath)
  }
  return response
}

export async function writeResponse(
  filePath: string,
  response: any,
  writeDirectory?: string,
) {
  const dirName =
    filePath.lastIndexOf(pathUtil.sep) === filePath.length - 1
      ? filePath.slice(filePath.slice(0, -1).lastIndexOf(pathUtil.sep), -1)
      : filePath.slice(filePath.lastIndexOf(pathUtil.sep))
  if (dirName && writeDirectory) {
    if (!isDirectory(writeDirectory)) {
      response.warning = `writePath is not a directory: ${writeDirectory}`
    } else {
      const { writeFolder, writePath } = getWriteFolderAndWritePath(
        filePath,
        writeDirectory,
      )
      mkdirSync(writeFolder)
      // 格式化JSON数据
      const formattedJson = JSON.stringify(response, null, 2)

      // 将格式化后的JSON数据写入到另一个文件中
      try {
        await new Promise((rsv, rej) => {
          fs.writeFile(`${writePath}.ast.json`, formattedJson, 'utf8', err => {
            if (err) {
              // console.error('Error writing file:', err)
              rej(err)
              return
            }
            // console.log('File has been written successfully!')
            rsv({ message: 'OK', writePath })
          })
        })
      } catch (e) {
        response.error = (e as Error)?.message ?? `fail to write ${writePath}`
      }
    }
  }
}
