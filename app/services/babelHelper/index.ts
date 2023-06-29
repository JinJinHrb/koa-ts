/*
 * 与 CRM 业务代码耦合度较高的分析代码
 */

import pathUtil from 'path'
import { BabelService } from '../babel.service'
import { isDirectory, getFileData, isFile } from '../../helpers/fsUtils'
import traverse, { Node, NodePath } from '@babel/traverse'
import { ParseResult } from '@babel/parser'
import { File, SourceLocation } from '@babel/types'
import generate from '@babel/generator'
import _ from 'lodash'
import { getParentPathSkipTSNonNullExpression } from 'app/helpers/iterationUtil'
import {
  addCallExpressionPaths,
  fillInActions2HandlerMap,
  fillInHandler2ActionsMap,
  getActionsMap,
  getFileActions,
} from './innerHelper'
import { DirectedGraph } from 'graphology'
import { getSagaEffects } from './sagaHelper'

// 先不处理 usage
export const buildSagaGraphHandler = async () => {
  const graph = new DirectedGraph()
  const { fileActions } = await getActionsMap()
  for (const { filePath, groups } of fileActions) {
    for (const { actionsComponents } of groups) {
      for (const { usedActionsDependencies } of actionsComponents) {
        for (const {
          localName,
          importedName,
          sourceValue,
          dependencyPath,
          usage,
          usageVariable,
        } of usedActionsDependencies) {
          // console.log('#36 filePath:', filePath, 'dependencyPath:', dependencyPath)
          const nodeSource = filePath
          const nodeTarget = `${dependencyPath},${importedName}`
          buildDirectedGrpah(graph, nodeSource, nodeTarget)
          const theEdge = graph.findEdge(
            (_edge, _attributes, source, target) =>
              source === nodeSource && target === nodeTarget,
          )
          if (theEdge) {
            if (usage) {
              const usages = graph.getEdgeAttribute(theEdge, 'usages') ?? ([] as any)
              usages.push(usage)
              graph.setEdgeAttribute(theEdge, 'usages', usages)
            } else if (usageVariable) {
              const usageVariables =
                graph.getEdgeAttribute(theEdge, 'usageVariable') ?? ([] as any)
              usageVariables.push(usageVariable)
              graph.setEdgeAttribute(theEdge, 'usageVariables', usageVariables)
            }
          }
        }
      }
    }
  }
  return graph
}

export const findReferencedNodes = function recurFindNodes(
  actionKeys: string[],
  graph: DirectedGraph,
  result: string[] = [],
): any {
  let toCheckSource: string | undefined = ''
  toCheckSource = actionKeys.shift()
  if (_.isNil(toCheckSource)) {
    return result
  }
  const edgeEntries = graph.edgeEntries()
  let filterTargets: string[] = []
  for (const edgeEntry of edgeEntries) {
    if (edgeEntry.source === toCheckSource) {
      filterTargets.push(edgeEntry.target)
    }
  }
  filterTargets = filterTargets.filter(a => !result.includes(a))
  if (!_.isEmpty(filterTargets)) {
    actionKeys.push(...filterTargets)
    actionKeys = _.uniq(actionKeys)
    result.push(...filterTargets)
    result = _.uniq(result)
  }

  return recurFindNodes(actionKeys, graph, result)
}

export const getHandlerGraph = (handler2ActionsMap: any) => {
  const graph = new DirectedGraph()
  const keys = Object.keys(handler2ActionsMap)
  for (const key of keys) {
    const arr = handler2ActionsMap[key]
    for (const elem of arr) {
      const { actions2HandlerKey, actions2HandlerKey2 } = elem
      buildDirectedGrpah(graph, actions2HandlerKey, key)
      if (actions2HandlerKey2) {
        buildDirectedGrpah(graph, key, actions2HandlerKey2)
      }
    }
  }
  return graph
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

export type TFileCollectorElement = {
  actionsSource: string
  actionsPropertyName: string
  handlerName: string
  handlerSource: string
}
export type TUnfilteredCollectors = { [key: string]: TFileCollectorElement[] }
export type TActionsMap = { [key: string]: any }

let logLimit = 10

export const buildSagaMap = async function myBuildSagaGrah({
  analyzedFiles,
  actions2HandlerMap,
  handler2ActionsMap,
  tsconfigPath,
  filePath,
  nonAnalyzedFiles = [],
  warnings = [],
  noRecur,
}: {
  analyzedFiles: Set<string>
  actions2HandlerMap: TActionsMap
  handler2ActionsMap: TActionsMap
  tsconfigPath: string
  filePath: string
  nonAnalyzedFiles?: string[]
  warnings?: string[]
  noRecur?: boolean
}) {
  const code = (await getFileData(filePath as string))?.toString()
  const babelService = new BabelService()
  await babelService.setAlias(tsconfigPath)
  const ast = await babelService.getAstByCode(code)
  let isRootSaga = false
  traverse(ast, {
    ExportDefaultDeclaration(path) {
      const name = (path.node.declaration as any)?.id.name
      if (name === 'rootSaga') {
        isRootSaga = true
      }
      path.stop()
    },
  })

  const { filename, graph } = await babelService.traverseToGetGraph({
    filePath,
    noRecur: true,
  })

  const derivativeNonAnalyzedFiles = graph.nodes().filter(a => !analyzedFiles.has(a))
  for (const nonAnalyzedFile of derivativeNonAnalyzedFiles) {
    const fileAst = await babelService.getAst(nonAnalyzedFile)
    /* let isSagaFile = false
    const sagaEffectsFuns: TActionsMap = {}
    traverse(fileAst, {
      ImportDeclaration(path: NodePath<any>) {
        const { node } = path
        if (node.source.value === 'redux-saga/effects') {
          const specifiers = node.specifiers.filter(
            (a: any) => a.type === 'ImportSpecifier',
          )
          specifiers.forEach((k: any) => {
            const importedName = k.imported.name
            const localName = k.local.name
            sagaEffectsFuns[importedName] = localName
          })
          isSagaFile = true
          path.stop()
        }
      },
    }) */
    const { sagaEffectsFuns, isSagaFile } = await getSagaEffects(fileAst)
    if (isSagaFile) {
      const toAnalyzeFiles: string[] = []
      const handlerCollector = await fillInActions2HandlerMap({
        babelService,
        actions2HandlerMap,
        nonAnalyzedFile,
        warnings,
        fileAst,
        sagaEffectsFuns,
        toAnalyzeFiles,
      })
      nonAnalyzedFiles.push(...toAnalyzeFiles)
      if (logLimit > -1) {
        logLimit--
        console.log('babelHelper #206', {
          handler2ActionsMap,
          handlerCollector,
          sagaEffectsFuns,
        })
      }
      await fillInHandler2ActionsMap({
        babelService,
        handler2ActionsMap,
        handlerCollector,
        warnings,
        nonAnalyzedFile,
        fileAst,
        sagaEffectsFuns,
      })
    }
    // ExportDefaultDeclaration
    analyzedFiles.add(nonAnalyzedFile)
  }

  const nonAnalyzedFiles2 = nonAnalyzedFiles.filter(a => !analyzedFiles.has(a))
  console.log('#131 nonAnalyzedFiles2.length:', nonAnalyzedFiles2.length)
  if (!noRecur && nonAnalyzedFiles2.length > 0) {
    await myBuildSagaGrah({
      analyzedFiles,
      actions2HandlerMap,
      handler2ActionsMap,
      tsconfigPath,
      filePath: nonAnalyzedFiles2.shift() as string,
      nonAnalyzedFiles: nonAnalyzedFiles2,
      warnings,
      noRecur,
    })
  }

  return {
    warnings,
    filename,
    graph,
    ast: noRecur ? ast : null,
    isRootSaga,
  }
}

export type TActionsComponent = {
  type: string
  name?: string
  loc: SourceLocation
}

export const buildSingleActionsMap = async (filePath: string, ast: ParseResult<File>) => {
  const fileActions = await getFileActions()
  const record = _.cloneDeep(
    fileActions.data.filter(a => a.filePath === filePath)[0],
  ) as any
  if (!record || _.isEmpty(record.groups)) {
    return null
  }
  for (const group of record.groups) {
    const { actionsDependencies, actionsComponents, objectPropertyMap } = group
    for (const actionsComponent of actionsComponents) {
      let functionPath: NodePath<any> | undefined
      const { type, name, loc } = actionsComponent as TActionsComponent
      const actionsMethods: {
        name: string
        usage?: string
      }[] = []
      if (type === 'Identifier') {
        let targetNotFound = true,
          tmpName = name,
          tmpLoc = _.cloneDeep(loc)
        while (targetNotFound) {
          traverse(ast, {
            Identifier(subPath) {
              if (
                tmpName &&
                tmpName === (subPath.node as any)?.name &&
                subPath.node.loc?.start.line !== tmpLoc.start.line &&
                !['TSInterfaceDeclaration', 'TSTypeAliasDeclaration'].includes(
                  getParentPathSkipTSNonNullExpression(subPath).node.type,
                )
              ) {
                functionPath = subPath
                subPath.stop()
              }
            },
          })
          const parentPath2 = getParentPathSkipTSNonNullExpression(
            functionPath as NodePath<any>,
            2,
          )
          if (
            parentPath2.node.type === 'VariableDeclaration' &&
            (parentPath2.node as any)?.declarations.length === 1 &&
            (parentPath2.node as any)?.declarations[0].init?.type === 'CallExpression' &&
            ((parentPath2.node as any)?.declarations[0].init?.arguments?.length === 1 &&
              (parentPath2.node as any)?.declarations[0].init?.arguments[0].type) ===
              'Identifier'
          ) {
            tmpName = (parentPath2.node as any)?.declarations[0].init.arguments[0].name
            tmpLoc = (parentPath2.node as any)?.declarations[0].init.arguments[0].loc
          } else {
            targetNotFound = false
          }
        }
      } else {
        traverse(ast, {
          enter(subPath) {
            if (
              type === subPath.node.type &&
              subPath.node.loc?.start.line === loc.start.line
            ) {
              functionPath = subPath
              subPath.stop()
            }
          },
        })
      }
      if (functionPath) {
        getParentPathSkipTSNonNullExpression(functionPath).traverse({
          enter(subPath) {
            const callExpressionPaths: any = [],
              actionsExportedNames: any = []
            // 处理 actions 调用的各种情况
            addCallExpressionPaths(subPath, actionsExportedNames, callExpressionPaths)
            for (let i = 0; i < callExpressionPaths.length; i++) {
              const callExpressionPath = callExpressionPaths[i]
              const actionsExportedName = actionsExportedNames[i]
              if (actionsExportedName && callExpressionPath) {
                const theMethod: {
                  name: string
                  usage?: string
                  usageVariable?: string
                } = {
                  name: actionsExportedName,
                }
                callExpressionPath.traverse({
                  Identifier(subPath2: any) {
                    if (
                      subPath2.node.name === 'usage' &&
                      getParentPathSkipTSNonNullExpression(subPath2).node.type ===
                        'ObjectProperty'
                    ) {
                      const usageValue = (
                        getParentPathSkipTSNonNullExpression(subPath2).node as any
                      )?.value
                      if (
                        getParentPathSkipTSNonNullExpression(subPath2).node.type ===
                          'ObjectProperty' &&
                        usageValue.type === 'Identifier'
                      ) {
                        theMethod.usageVariable = usageValue.name
                      } else if (usageValue.type === 'StringLiteral') {
                        theMethod.usage = usageValue.value
                      } else if (usageValue.type === 'MemberExpression') {
                        theMethod.usage = `${usageValue.object.name}.${usageValue.property.name}`
                      } else {
                        console.log(
                          '#83 getParentPathSkipTSNonNullExpression(subPath2).node:',
                          getParentPathSkipTSNonNullExpression(subPath2).node,
                        )
                        theMethod.usage = '' // 空字符串说明有问题
                      }
                      subPath2.stop()
                    }
                  },
                })
                actionsMethods.push(theMethod)
              }
            }

            if (
              (subPath.node as any)?.name === 'actions' &&
              getParentPathSkipTSNonNullExpression(subPath).node.type ===
                'VariableDeclarator' &&
              (getParentPathSkipTSNonNullExpression(subPath).node as any)?.init.type ===
                'Identifier' &&
              (getParentPathSkipTSNonNullExpression(subPath).node as any)?.init.name ===
                'actions'
            ) {
              const properties = (
                (getParentPathSkipTSNonNullExpression(subPath).node as any)?.id
                  .properties || []
              ).filter((a: any) => a.type === 'ObjectProperty')
              const methodNameProperties = properties.map((a: any) => {
                return { exportedName: a.key.name, localName: a.value.name }
              })
              const bodyPath = getParentPathSkipTSNonNullExpression(
                subPath.findParent(path => path.type === 'VariableDeclaration'),
              )
              for (const methodNameProperty of methodNameProperties) {
                const theMethod: {
                  name: string
                  usage?: string
                  usageVariable?: string
                } = {
                  name: methodNameProperty.exportedName,
                }
                bodyPath.traverse({
                  CallExpression(subPath) {
                    if (
                      (subPath.node as any).callee?.name === methodNameProperty.localName
                    ) {
                      subPath.traverse({
                        enter(subPath2) {
                          const usageValue = (
                            getParentPathSkipTSNonNullExpression(subPath2).node as any
                          ).value
                          if ((subPath2.node as any).name === 'usage') {
                            console.log(
                              '#151 getParentPathSkipTSNonNullExpression(subPath2).node:',
                              getParentPathSkipTSNonNullExpression(subPath2).node,
                            )
                            if (
                              getParentPathSkipTSNonNullExpression(subPath2).node.type ===
                                'ObjectProperty' &&
                              usageValue.type === 'Identifier'
                            ) {
                              console.log(
                                '#160 theMethod.usageVariable:',
                                usageValue.name,
                              )
                              theMethod.usageVariable = usageValue.name
                            } else if (usageValue.type === 'StringLiteral') {
                              console.log('#167 theMethod.usage:', usageValue.name)
                              theMethod.usage = usageValue.value
                            } else if (usageValue.type === 'MemberExpression') {
                              console.log(
                                '#169 theMethod.usage:',
                                `${usageValue.object.name}.${usageValue.property.name}`,
                              )
                              theMethod.usage = `${usageValue.object.name}.${usageValue.property.name}`
                            } else {
                              console.log(
                                '#176 getParentPathSkipTSNonNullExpression(subPath2).node:',
                                getParentPathSkipTSNonNullExpression(subPath2).node,
                              )
                              theMethod.usage = '' // 空字符串说明有问题
                            }
                          }
                        },
                      })
                      subPath.stop()
                    }
                  },
                })
                actionsMethods.push(theMethod)
              }
            }
          },
        })
        actionsComponent.actionsMethods = _.uniqWith(
          actionsMethods,
          (a, b) => a.name === b.name && a.usage === b.usage,
        )
        const usedActionsDependencies: {
          localName: string
          importedName: string
          sourceValue: string
          dependencyPath: string
        }[] = []
        actionsComponent.actionsMethods.forEach(
          ({
            name: v,
            usage,
            usageVariable,
          }: {
            name: string
            usage?: string
            usageVariable?: string
          }) => {
            const k = objectPropertyMap[v] ?? v
            OUTTER: for (const actionsDependency of actionsDependencies) {
              if (actionsDependency.isNamespace) {
                const exportNames = actionsDependency.exportNames || []
                if (exportNames.includes(k)) {
                  const usedActionsDependency = {
                    localName: k,
                    importedName: k,
                    sourceValue: actionsDependency.sourceValue,
                    dependencyPath: actionsDependency.dependencyPath,
                    usage,
                    usageVariable,
                  } as {
                    localName: string
                    importedName: string
                    sourceValue: string
                    dependencyPath: string
                    usage?: string
                    usageVariable?: string
                  }
                  usedActionsDependencies.push(usedActionsDependency)
                  break OUTTER
                }
              } else if (actionsDependency.localName === k) {
                usedActionsDependencies.push(_.clone(actionsDependency))
                break OUTTER
              }
            }
          },
        )
        actionsComponent.usedActionsDependencies = usedActionsDependencies
        actionsComponent.nodeLoc = functionPath.node.loc
      }

      if (!actionsComponent.nodeLoc) {
        if (_.isNil(group.warnings)) {
          group.warnings = []
        }
        group.warnings.push(
          '#73 no actionsComponent found, type: "' + type + '", name: "' + name + '"',
        )
      }
    }
  }
  return record
}

export const dynamicImportExportHandler = function (
  this: BabelService,
  {
    value,
    dirname,
    projectPath,
    aliasFileMap,
    aliasNpmMap,
  }: {
    value: string
    dirname: string
    projectPath: string
    aliasFileMap: { [key: string]: string }
    aliasNpmMap: { [key: string]: string }
  },
) {
  if (!value) {
    console.warn('[Warning] #27 dynamicImportExportHandler !value', {
      value,
      dirname,
      projectPath,
      aliasFileMap,
      aliasNpmMap,
    })
    return
  }
  //保存所依赖的模块
  if (value.indexOf('.') === 0) {
    aliasFileMap[value] =
      this.findFilePathByCandidate(pathUtil.resolve(dirname, value)) ??
      pathUtil.resolve(dirname, value)
  } else {
    const tempAlias = this.getRealPathByAlias(value)
    if (tempAlias) {
      aliasFileMap[value] = tempAlias
    } else if (isDirectory(pathUtil.resolve(projectPath, 'node_modules', value))) {
      aliasNpmMap[value] = value
    } else if (isFile(pathUtil.resolve(projectPath, 'node_modules', value))) {
      aliasNpmMap[value] = value
    }
  }
}

// /Users/alexwang/workspace/xTransfer/mfe-user-crm/shared/crmEmail/sagas/index.ts
export const removeUnusedVars = (ast: ParseResult<File>, code: string) => {
  return generate(
    ast,
    {
      retainLines: true,
      compact: 'auto',
      concise: false,
      // quotes: 'double',
      // ...
    },
    code,
  )
}

export type TConnectActionsResult = {
  filePath: string
  localConnect: string
  localCompose: string
  groups: TConnectActionsGroup[]
}

export type TConnectActionsGroup = {
  actionsDependencies: any
  actionsComponents: any
  warnings: string[]
  unknownElements: any
}

const isActionsFound = (
  actionsKey: string,
  bindActionCreatorsReference: NodePath<Node>,
) => {
  let functionExpresstionPath: NodePath<Node> = bindActionCreatorsReference
  let actionsKeyPath: NodePath<Node> | undefined
  while (true) {
    functionExpresstionPath = functionExpresstionPath.findParent(
      path => path.type === 'ArrowFunctionExpression',
    )
    if (!functionExpresstionPath) {
      break
    }
    functionExpresstionPath.traverse({
      Identifier(subPath: any) {
        if (subPath.node.name === actionsKey) {
          actionsKeyPath = subPath
          subPath.stop()
        }
      },
    })
  }
  return actionsKeyPath
}

export const findConnectActions = async (
  ast: ParseResult<File>,
  filePath: string,
  babelService: BabelService,
) => {
  const result: TConnectActionsResult = {
    filePath,
    localConnect: '',
    localCompose: '',
    groups: [],
  }
  traverse(ast, {
    ImportDeclaration(path) {
      const { node } = path
      if (node.source.value !== 'redux') {
        return
      }
      const composeSpecifier = node.specifiers.filter(
        (a: any) => a.imported.name === 'compose',
      )[0]
      if (!composeSpecifier) {
        return
      }
      result.localCompose = composeSpecifier.local.name
      path.stop()
    },
  })

  traverse(ast, {
    ImportDeclaration(path) {
      const { node } = path
      if (node.source.value !== 'react-redux') {
        return
      }
      const connectSpecifier = node.specifiers.filter(
        (a: any) => a.imported.name === 'connect',
      )[0]
      if (!connectSpecifier) {
        return
      }
      result.localConnect = connectSpecifier.local.name
      const binding = path.scope.getBinding(result.localConnect)
      const bindings = binding?.scope.bindings || {}
      const bindKeys = Object.keys(bindings)
      /* bindKeys: [
        'React',                'PureComponent',
        'connect',              'bindActionCreators',
        'Link',                 'Breadcrumb',
        'Tabs',                 'push',
        'classNames',           'matchBreadcrumbs',
        'matchTradeBradCrumbs', 'style',
        'modalActions',         'faqActions',
        'EMModalUsages',        'mapQueryTag',
        'EMSideFunctionType',   'TabPane',
        'NavPanel'
      ] */
      if (
        binding?.referenced === false ||
        !bindKeys.includes('bindActionCreators') ||
        !bindKeys.includes('connect')
      ) {
        path.stop()
        return
      }

      const bindActionCreators = bindings['bindActionCreators']
      let i = 0,
        bindActionCreatorsReference: NodePath<Node>
      while (
        !_.isEmpty(bindActionCreators.referencePaths) &&
        !_.isNil((bindActionCreatorsReference = bindActionCreators.referencePaths[i++]))
      ) {
        // referencePaths Start
        const group: any = {
          actionsParamName: '', // 作为参数传入的 actions 名
          actionsDependencies: [], // { key, value, sourceValue }
          actionsComponents: [],
          warnings: [],
          unknownElements: {},
        }
        const spreadElementNames: any = []
        const objectPropertyMap: any = {}
        const unknownElements: any = []

        const firstContainerArgument = (bindActionCreatorsReference.container as any)
          .arguments[0]
        if (firstContainerArgument.type === 'ObjectExpression') {
          firstContainerArgument.properties.forEach((el: any) => {
            if (el.type === 'SpreadElement') {
              spreadElementNames.push(el.argument.name)
            } else if (el.type === 'ObjectProperty') {
              objectPropertyMap[el.key.name] = el.value.name
            } else {
              unknownElements.push(el)
            }
          })
        } else if (firstContainerArgument.type === 'Identifier') {
          const identifierName = firstContainerArgument.name
          spreadElementNames.push(identifierName)
        } else {
          group.warnings.push(
            '[warning] #152 firstContainerArgument.type unprocessed:',
            firstContainerArgument.type,
          )
        }

        const objectPropertyNames = Object.keys(objectPropertyMap).map(
          a => objectPropertyMap[a],
        )
        group.spreadElementNames = spreadElementNames
        group.objectPropertyMap = objectPropertyMap
        group.unknownElements = unknownElements
        ;[...spreadElementNames, ...objectPropertyNames]
          .filter(a => a)
          .forEach(k => {
            const referenceActionsBinding =
              bindActionCreatorsReference.scope.getBinding(k)
            const referenceActionsBindingDeclaration =
              referenceActionsBinding?.path.findParent(path => path.isImportDeclaration())
            const sourceValue = (referenceActionsBindingDeclaration?.node as any)?.source
              .value
            if (!referenceActionsBindingDeclaration?.node) {
              const actionsKeyPath = isActionsFound(k, bindActionCreatorsReference)
              if (actionsKeyPath) {
                group.actionsParamName = k
              } else {
                group.warnings.push('#234 no actions key found: ' + k)
              }
            } else {
              const referenceActionsBindingDeclarationSpecifiers = (
                referenceActionsBindingDeclaration?.node as any
              ).specifiers
              const referenceActionsBindingDeclarationSpecifier =
                referenceActionsBindingDeclarationSpecifiers.filter(
                  (a: any) => a.local.name === k,
                )[0]
              if (
                referenceActionsBindingDeclarationSpecifier.type ===
                'ImportNamespaceSpecifier'
              ) {
                group.actionsDependencies.push({
                  isNamespace: true,
                  localName: k,
                  sourceValue,
                })
              } else {
                const importedName =
                  referenceActionsBindingDeclarationSpecifier.imported.name
                group.actionsDependencies.push({
                  isNamespace: false,
                  localName: k,
                  importedName,
                  sourceValue,
                })
              }
            }
          })
        const embeddedComponentResponse = findConnectedComponent(
          bindActionCreatorsReference,
          result,
        )
        group.actionsComponents = embeddedComponentResponse.actionsComponents
        group.warnings = embeddedComponentResponse.warnings
        if (_.isEmpty(group.warnings)) {
          delete group.warnings
        }
        if (_.isEmpty(group.actionsParamName)) {
          delete group.actionsParamName
        }
        result.groups.push(group)
        // referencePaths End
      }
    },
  })
  for (const group of result.groups) {
    for (const ad of group.actionsDependencies) {
      const sourceValue = ad.sourceValue
      const dependencyPath = await babelService.getImportedFileByAlias(
        filePath,
        sourceValue,
      )
      ad.dependencyPath = dependencyPath

      if (ad.isNamespace) {
        const dependencyAst = await babelService.getAst(dependencyPath)
        let localCreateAction: string
        traverse(dependencyAst, {
          ImportDeclaration(subPath) {
            const { node } = subPath
            if (node.source.value !== 'redux-actions') {
              return
            }
            const createActionSpecifier = node.specifiers.filter(
              (a: any) => a.imported.name === 'createAction',
            )[0]
            if (!createActionSpecifier) {
              return
            }
            localCreateAction = createActionSpecifier.local.name
            const createActionBinding = subPath.scope.getBinding(localCreateAction)
            const referencePaths = createActionBinding?.referencePaths || []
            const exportNames = referencePaths.map(
              a =>
                (
                  a.findParent(subPath => subPath.type === 'ExportNamedDeclaration')
                    .node as any
                ).declaration.declarations[0].id.name,
            )
            ad.exportNames = exportNames
          },
        })
      }
    }
  }
  return result
}

const findConnectedComponent = (
  bindActionCreatorsReference: NodePath<Node>,
  result: { localConnect: string; localCompose: string },
) => {
  const { localConnect, localCompose } = result || {}
  const actionsComponents: any = [] // 被注入 actions 的组件名数组
  const warnings: any = []
  if (!localConnect) {
    return { actionsComponents, warnings }
  }

  const bindActionCreatorsParentsPath = bindActionCreatorsReference.findParent(
    path => getParentPathSkipTSNonNullExpression(path).node.type === 'Program',
  )

  const programPath = getParentPathSkipTSNonNullExpression(bindActionCreatorsParentsPath)

  /*
    // 情形一：
    const mapDispatch = (dispatch: Dispatch) => ({
      actions: bindActionCreators({ ...actions, change, push, touch }, dispatch),
    })
  */
  // const localConnectBinding = bindActionCreatorsParentsPath.scope.getBinding(localConnect)
  // console.log('#220 localConnectBinding:', localConnectBinding)
  let wrappedConnectPath: NodePath<Node> | undefined
  let wrappedComposePath: NodePath<Node> | undefined
  let connectDecorator: NodePath<Node> | undefined
  bindActionCreatorsParentsPath.traverse({
    enter: subPath => {
      if (
        (subPath.node as any).name === localConnect &&
        (subPath.container as any)?.type === 'CallExpression'
      ) {
        wrappedConnectPath = subPath
        if (wrappedComposePath && wrappedConnectPath) {
          subPath.stop()
        }
      }
      if (
        (subPath.node as any).name === localCompose &&
        (subPath.container as any)?.type === 'CallExpression'
      ) {
        wrappedComposePath = subPath
        if (wrappedComposePath && wrappedConnectPath) {
          subPath.stop()
        }
      }
    },
  })
  if (wrappedConnectPath) {
    connectDecorator = wrappedConnectPath?.findParent(
      subPath => getParentPathSkipTSNonNullExpression(subPath)?.type === 'Decorator',
    )
  }
  if (connectDecorator) {
    const classDeclarationPath = connectDecorator.findParent(
      subPath => subPath.node.type === 'ClassDeclaration',
    )
    if (!classDeclarationPath) {
      warnings.push(
        '[Warning] #306 ClassDeclaration not found (start line: ' +
          connectDecorator.node.loc?.start.line +
          ', start column: ' +
          connectDecorator.node.loc?.start.column +
          ', end line: ' +
          connectDecorator.node.loc?.end.line,
        ', end column: ' + connectDecorator.node.loc?.end.column + ')',
      )
    }
    const bodyNode = (classDeclarationPath.node as any).body
    console.log('#721 actionsComponents.push')
    actionsComponents.push({ type: bodyNode.type, loc: bodyNode.loc })
    return { actionsComponents, warnings }
  }
  if (wrappedComposePath) {
    const parentCallExpressionPath = wrappedComposePath.findParent(
      subPath =>
        subPath.node.type === 'CallExpression' &&
        getParentPathSkipTSNonNullExpression(subPath).node.type !== 'CallExpression',
    )
    const composeArguments = (parentCallExpressionPath.node as any).arguments
    if (composeArguments.length === 1) {
      if (composeArguments[0].type === 'Identifier') {
        console.log('#734 actionsComponents.push')
        actionsComponents.push({
          type: 'Identifier',
          name: composeArguments[0].name,
          loc: composeArguments[0].loc,
        })
      } else {
        console.log('#741 actionsComponents.push')
        actionsComponents.push({
          type: composeArguments[0].type,
          loc: composeArguments[0].loc,
        })
      }
    } else {
      warnings.push(
        '[Warning] #316 composeArguments.length !== 1 (start line: ' +
          parentCallExpressionPath.node.loc?.start.line +
          ', start column: ' +
          parentCallExpressionPath.node.loc?.start.column +
          ', end line: ' +
          parentCallExpressionPath.node.loc?.end.line,
        ', end column: ' + parentCallExpressionPath.node.loc?.end.column + ')',
      )
    }
    return { actionsComponents, warnings }
  }

  if (
    !wrappedConnectPath &&
    bindActionCreatorsParentsPath.node.type === 'VariableDeclaration'
  ) {
    const variableDeclarator = bindActionCreatorsReference.findParent(
      path =>
        path.type === 'VariableDeclarator' &&
        getParentPathSkipTSNonNullExpression(path).node.start ===
          bindActionCreatorsParentsPath.node.start,
    )
    const varName = (variableDeclarator.node as any).id.name
    const binding = variableDeclarator.scope.getBinding(varName)
    const referencePaths = binding?.referencePaths || []
    for (let i = 0; i < referencePaths.length; i++) {
      const referencePath = referencePaths[i]
      const parentOfCallExpression = referencePath.findParent(
        path =>
          path.node.type === 'CallExpression' &&
          getParentPathSkipTSNonNullExpression(path).node.type !== 'CallExpression',
      )
      if (!parentOfCallExpression) {
        continue
      }
      const lastArguments = (parentOfCallExpression.node as any).arguments
      if (lastArguments.length !== 1) {
        if (
          parentOfCallExpression.node.type === 'CallExpression' &&
          (parentOfCallExpression.node.callee as any).name === localCompose
        ) {
          const notImportIdentifiers = parentOfCallExpression.node.arguments
            .filter(a => a.type === 'Identifier')
            .map((a: any) => {
              return {
                name: a.name,
                loc: a.loc,
              }
            })
            .filter(a => {
              const binding = programPath.scope.getBinding(a.name)
              const bindingNode = (binding as any).path.node
              return bindingNode.type !== 'ImportSpecifier'
            })
          // console.log('#289 compose identifier arguments:', identifiers)
          if (notImportIdentifiers.length !== 1) {
            console.log(
              '#310 notImportIdentifiers.length !== 1 notImportIdentifiers:',
              notImportIdentifiers,
            )
          } else {
            console.log('#810 actionsComponents.push')
            actionsComponents.push({
              type: 'Identifier',
              name: notImportIdentifiers[0].name,
              loc: notImportIdentifiers[0].loc,
            })
          }
        } else {
          console.log(
            '#291 parentOfCallExpression.node:',
            parentOfCallExpression.node,
            'localCompose:',
            localCompose,
          )
          warnings.push(
            '[Warning] #230 lastArguments.length !== 1 (start line: ' +
              parentOfCallExpression.node.loc?.start.line +
              ', start column: ' +
              parentOfCallExpression.node.loc?.start.column +
              ', end line: ' +
              parentOfCallExpression.node.loc?.end.line,
            ', end column: ' + parentOfCallExpression.node.loc?.end.column + ')',
          )
        }
      } else {
        const lastArgument = lastArguments[0]
        if (lastArgument.type === 'CallExpression') {
          if (lastArgument.arguments.length === 1) {
            if (lastArgument.arguments[0].type === 'Identifier') {
              console.log('#839 actionsComponents.push')
              actionsComponents.push({
                type: 'Identifier',
                name: lastArgument.arguments[0].name,
                loc: lastArgument.arguments[0].loc,
              })
            } else {
              warnings.push(
                '[Warning] #239 lastArgument.arguments[0].type !== "Identifier" (start line: ' +
                  parentOfCallExpression.node.loc?.start.line +
                  ', start column: ' +
                  parentOfCallExpression.node.loc?.start.column +
                  ', end line: ' +
                  parentOfCallExpression.node.loc?.end.line,
                ', end column: ' + parentOfCallExpression.node.loc?.end.column + ')',
              )
            }
          } else {
            warnings.push(
              '[Warning] #242 lastArgument.arguments.length !== 1 (start line: ' +
                parentOfCallExpression.node.loc?.start.line +
                ', start column: ' +
                parentOfCallExpression.node.loc?.start.column +
                ', end line: ' +
                parentOfCallExpression.node.loc?.end.line,
              ', end column: ' + parentOfCallExpression.node.loc?.end.column + ')',
            )
          }
        } else {
          if (lastArgument.type === 'Identifier') {
            console.log('#869 actionsComponents.push')
            actionsComponents.push({
              type: 'Identifier',
              name: lastArgument.name,
              loc: lastArgument.loc,
            })
          } else {
            warnings.push(
              '[Warning] #249 lastArgument.type !== "Identifier" (start line: ' +
                parentOfCallExpression.node.loc?.start.line +
                ', start column: ' +
                parentOfCallExpression.node.loc?.start.column +
                ', end line: ' +
                parentOfCallExpression.node.loc?.end.line,
              ', end column: ' + parentOfCallExpression.node.loc?.end.column + ')',
            )
          }
        }
      }
    }
  } else if (
    wrappedConnectPath &&
    getParentPathSkipTSNonNullExpression(wrappedConnectPath, 2).node.type ===
      'CallExpression' &&
    (getParentPathSkipTSNonNullExpression(wrappedConnectPath, 2).node as any).arguments
      .length === 1
  ) {
    const wrappedConnectArgument = (
      getParentPathSkipTSNonNullExpression(wrappedConnectPath, 2).node as any
    ).arguments[0]
    if (wrappedConnectArgument.type === 'Identifier') {
      console.log('#900 actionsComponents.push')
      actionsComponents.push({
        type: 'Identifier',
        name: wrappedConnectArgument.name,
        loc: wrappedConnectArgument.loc,
      })
    } else if (
      wrappedConnectArgument.type === 'CallExpression' &&
      wrappedConnectArgument.arguments[0].type === 'Identifier'
    ) {
      console.log('#910 actionsComponents.push')
      actionsComponents.push({
        type: 'Identifier',
        name: wrappedConnectArgument.arguments[0].name,
        loc: wrappedConnectArgument.arguments[0].loc,
      })
    } else {
      console.log('#917 actionsComponents.push')
      actionsComponents.push({
        type: wrappedConnectArgument.type,
        loc: wrappedConnectArgument.loc,
      })
    }
  } else if (
    bindActionCreatorsParentsPath.node.type === 'ExpressionStatement' &&
    (bindActionCreatorsParentsPath.node as any)?.expression.type ===
      'AssignmentExpression' &&
    (bindActionCreatorsParentsPath.node as any)?.expression.right.type ===
      'CallExpression'
  ) {
    if (
      (bindActionCreatorsParentsPath.node.expression as any).right.arguments.length === 1
    ) {
      const theArgument = (bindActionCreatorsParentsPath.node.expression as any).right
        .arguments[0]
      console.log('#924 actionsComponents.push') // WangFan TODO 2023-05-22 21:17:09 to remove
      if (theArgument.type === 'Identifier') {
        actionsComponents.push({
          type: 'Identifier',
          name: theArgument.name,
          loc: theArgument.loc,
        })
      } else {
        actionsComponents.push({
          type: theArgument.type,
          loc: theArgument.loc,
        })
      }
    } else {
      warnings.push(
        '[Warning] #352 bindActionCreatorsParentsPath.node.expression.right.arguments.length != 1 (start line: ' +
          bindActionCreatorsParentsPath.node.loc?.start.line +
          ', start column: ' +
          bindActionCreatorsParentsPath.node.loc?.start.column +
          ', end line: ' +
          bindActionCreatorsParentsPath.node.loc?.end.line,
        ', end column: ' + bindActionCreatorsParentsPath.node.loc?.end.column + ')',
      )
    }
  } else {
    console.log(
      '#363 bindActionCreatorsParentsPath.node:',
      bindActionCreatorsParentsPath.node,
    )

    warnings.push(
      '[Warning] #367 actionsComponents not found (start line: ' +
        bindActionCreatorsParentsPath.node.loc?.start.line +
        ', start column: ' +
        bindActionCreatorsParentsPath.node.loc?.start.column +
        ', end line: ' +
        bindActionCreatorsParentsPath.node.loc?.end.line,
      ', end column: ' + bindActionCreatorsParentsPath.node.loc?.end.column + ')',
    )
  }
  return { actionsComponents, warnings }
}

export const findQueryGeneral = (ast: ParseResult<File>) => {
  const result: any = {
    usedEnumMembers: [],
    unusedEnumMembers: [],
  }
  let enumMembers: string[] = []
  traverse(ast, {
    FunctionDeclaration(path) {
      if (result.usedEnumMembers.length > 0) {
        path.stop()
        return
      }
      const { node } = path
      if (node.id?.name === 'queryGeneralSuccess' && node.generator) {
        path.traverse({
          IfStatement(ifPath) {
            if (
              ifPath.node?.test?.type !== 'BinaryExpression' ||
              ifPath.node?.test?.operator !== '==='
            ) {
              return
            }
            const operands: any = [ifPath.node?.test?.left, ifPath.node?.test?.right]
            const usage = operands.filter(
              (a: any) => a?.type === 'Identifier' && a?.name === 'usage',
            )[0]
            if (!usage) {
              return
            }
            const usageEquivalent = operands.filter(
              (a: any) => a?.type !== 'Identifier' && a?.name !== 'usage',
            )[0]
            if (!usageEquivalent) {
              return
            }
            if (usageEquivalent.type === 'MemberExpression') {
              if (_.isEmpty(enumMembers)) {
                const programPath = path.findParent(p => p.isProgram())
                programPath.traverse({
                  TSEnumDeclaration(declarePath) {
                    if (declarePath.node.id.name === usageEquivalent.object.name) {
                      enumMembers = declarePath.node.members.map(a => (a.id as any)?.name)
                      declarePath.stop()
                    }
                  },
                })
              }
              result.usedEnumMembers.push(usageEquivalent.property.name)
            }
          },
        })
      }
    },
  })
  result.unusedEnumMembers = enumMembers.filter(a => !result.usedEnumMembers.includes(a))
  return result
}

export const findReduxConnect = (ast: ParseResult<File>) => {
  const result: any = []
  traverse(ast, {
    ImportDeclaration(path) {
      if (result.length > 0) {
        return
      }
      const { node } = path
      if (node.importKind === 'value' && node.source.value.includes('actions/')) {
        // const newFile = './' + pathUtil.join(dirname, node.source.value)
        //保存所依赖的模块
        if (node.specifiers) {
          // "type": "ImportSpecifier"
          const specifiers = node.specifiers
            .filter(a =>
              [
                'ImportNamespaceSpecifier',
                // 'ImportDefaultSpecifier',
                // 'ImportSpecifier',
              ].includes(a.type),
            )
            .map(a => a)
          for (const specifier of specifiers) {
            const name = specifier.local.name
            const binding = path.scope.getBinding(name)
            if (binding?.referenced === true) {
              const bindings = binding.scope.bindings
              // const connectNode = Object.keys(bindings)
              //   .filter(a => a === 'ccc')
              // .map(a => bindings[a])[0].path.parent
              // result.push(bindings['connect'].identifier)
              // result.push(connectNode)
              // find connect
              const bindingKeys = Object.keys(bindings)
              for (const bindingKey of bindingKeys) {
                const bindingNode = bindings[bindingKey]
                const pathParent = bindingNode.path?.parent
                if (
                  pathParent.type === 'ImportDeclaration' &&
                  pathParent.source.value === 'react-redux'
                ) {
                  const possibleConnect = pathParent.specifiers.filter(
                    a =>
                      a.type === 'ImportSpecifier' &&
                      a.local.name === bindingKey &&
                      a.imported.name === 'connect',
                  )?.[0]
                  if (possibleConnect) {
                    // result.push(bindings[bindingKey].identifier)
                    // console.log(
                    //   'bindingNode.referencePaths:',
                    //   bindingNode.referencePaths,
                    // )
                    const calleeNode = bindingNode.referencePaths.filter(
                      a => a.key === 'callee',
                    )?.[0]
                    console.log('calleeNode.parent:', calleeNode?.parent)
                    result.push(calleeNode?.parent)
                    return
                  }
                }
              }
              /* Object.keys(bindings).forEach(k => {
                  console.log(
                    'BabelService #64',
                    'name:',
                    name,
                    'key:',
                    k,
                    'the binding name:',
                    bindings[k],
                  )
                  result.push(bindings[k].identifier)
                }) */
            }
          }
        }
      }
    },
  })
  return result
}

export const loc2String = (loc: SourceLocation) =>
  `start.line: ${loc.start.line}, start.column: ${loc.start.column}, ` +
  `start.line: ${loc.end.line}, start.column: ${loc.end.column}`
