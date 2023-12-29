import {
  SourceLocation,
  ObjectProperty,
  ExportDefaultDeclaration,
  ObjectMethod,
  SpreadElement,
} from '@babel/types'
import { iterateObjectHandler } from 'app/helpers/iterationUtil'
import { loc2String, TActionStatesMap } from './index'
import _ from 'lodash'

const UPDATE_SET_SET_IN = ['update', 'set', 'setIn']
const parseReturnStatement = (returnStatement: any) => {
  const storeState: any[] = []
  iterateObjectHandler(returnStatement, (value: any, key: any) => {
    if (
      value.type === 'CallExpression' &&
      value.callee.property.type === 'Identifier' &&
      UPDATE_SET_SET_IN.includes(value.callee.property.name)
    ) {
      const { type, value: stateKey } = value.arguments[0]
      storeState.push({ type, stateKey })
    }
    return false
  })
  return storeState
}

export const objectMethodHelper = (
  actionStatesMap: TActionStatesMap,
  node: ExportDefaultDeclaration,
  objectMethods: (ObjectMethod | ObjectProperty | SpreadElement)[],
  warnings: string[],
) => {
  for (const objectExpressionProperty of objectMethods) {
    const { key } = objectExpressionProperty as ObjectProperty
    const { /* params: objectExpressionParams, */ body: objectExpressionBody } =
      objectExpressionProperty as any
    // console.log(
    //   '#858 objectExpressionParams:',
    //   objectExpressionParams,
    //   '\nobjectExpressionBody:',
    //   objectExpressionBody,
    // )
    let storeState: any[] = []
    iterateObjectHandler(objectExpressionBody, (value: any, key: any) => {
      if (value.type === 'ReturnStatement') {
        storeState = parseReturnStatement(value)
        return true
      }
      return false
    })
    // console.log('parseReturnStatement #52 array:', storeState)

    const keyType = key.type
    const keyObject = key.object
    const keyProperty = key.property
    if (keyType !== 'MemberExpression') {
      warnings.push(
        `[warning] #861 keyType !== 'MemberExpression', keyType: ${keyType}, ${loc2String(
          node?.loc as SourceLocation,
        )}`,
      )
      continue
    }

    const actionsName = keyObject.name
    const actionsProperty = keyProperty.name

    if (!actionStatesMap[`${actionsName}.${actionsProperty}`]) {
      actionStatesMap[`${actionsName}.${actionsProperty}`] = storeState
    }
  }
}
