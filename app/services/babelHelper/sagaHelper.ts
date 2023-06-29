import { TActionsMap, loc2String } from './index'
import traverse, { Node, NodePath } from '@babel/traverse'
import { ParseResult } from '@babel/parser'
import { File, SourceLocation } from '@babel/types'
import { addHandler2ActionsMap, findLocalActions } from './innerHelper'
import _ from 'lodash'
import { iterateObjectHandler } from '../../helpers/iterationUtil'
import { BabelService } from '../babel.service'

export type HandlerActions2Type = {
  actionsSource2: string
  actionsPropertyName2: string
  usageName: string
}

/* 获取某个函数内部调用的 Actions */
export const getHandlerActions = ({
  ast,
  babelService,
  handlerName,
  sagaEffectsFuns,
  warnings,
  filePath,
}: {
  ast: ParseResult<File>
  babelService: BabelService
  handlerName: string
  sagaEffectsFuns: TActionsMap
  warnings: string[]
  filePath: string
}) => {
  const handlerActions2Array: HandlerActions2Type[] = []
  const { call: localCall, fork: localFork, put: localPut } = sagaEffectsFuns
  let hasLocalPut = false
  const actionsMap: TActionsMap = {}
  traverse(ast, {
    enter(path) {
      const handlerBinding = path.scope.getBinding(handlerName)
      const handlerBindingPath = handlerBinding?.path
      const handlerBindingNode = handlerBindingPath?.node
      if (handlerBindingNode?.type !== 'FunctionDeclaration') {
        console.log(
          `#140 handlerName: ${handlerName}\nhandlerBindingNode:`,
          handlerBindingNode,
        )
        warnings.push(
          `#146 handlerBindingNode?.type !== 'FunctionDeclaration': handlerName: ${handlerName}, loc: ${
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
                  nonAnalyzedFile: filePath,
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
                  /* addHandler2ActionsMap(handler2ActionsMap, {
                    actionsSource,
                    actionsPropertyName,
                    handlerName,
                    handlerSource,
                    actionsSource2: babelService.getRealPathByAlias(
                      actionsSourceValue,
                      nonAnalyzedFile,
                    ),
                    actionsPropertyName2,
                    usageName,
                  }) */
                  const actionsSource2 = babelService.getRealPathByAlias(
                    actionsSourceValue,
                    filePath,
                  )
                  handlerActions2Array.push({
                    actionsSource2,
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
        // if (!hasLocalPut) {
        //   noPutHandlers.push(`${handlerSource},${handlerName}`)
        // }
      }
      path.stop()
    },
  })
  return handlerActions2Array
}

export const getSagaEffects = (fileAst: ParseResult<any>) => {
  const sagaEffectsFuns: TActionsMap = {}
  let isSagaFile = false
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
  })
  return { sagaEffectsFuns, isSagaFile }
}
