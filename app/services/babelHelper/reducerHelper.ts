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
const parseReturnStatement = (returnStatement: any, warnings: string[]) => {
  const storeState: any[] = []
  // if (returnStatement.loc.start.line === 191) {
  //   warnings.push('#15 returnStatement:', JSON.stringify(returnStatement))
  // }

  // action.state.update(
  if (
    returnStatement.argument.type === 'CallExpression' &&
    returnStatement.argument.callee.type === 'MemberExpression' &&
    returnStatement.argument.callee.object.type === 'Identifier' &&
    returnStatement.argument.callee.object.name === 'state' &&
    returnStatement.argument.callee.property.type === 'Identifier' &&
    returnStatement.argument.callee.property.name === 'update'
  ) {
    if (
      // action.state.update(action.payload.usage...
      returnStatement.argument?.arguments?.[0] &&
      returnStatement.argument.arguments[0].type === 'MemberExpression' &&
      returnStatement.argument.arguments[0].object &&
      returnStatement.argument.arguments[0].object.type === 'MemberExpression' &&
      returnStatement.argument.arguments[0].object.object.type === 'Identifier' &&
      returnStatement.argument.arguments[0].object.object.name === 'action' &&
      returnStatement.argument.arguments[0].object.property.type === 'Identifier' &&
      returnStatement.argument.arguments[0].object.property.name === 'payload' &&
      returnStatement.argument.arguments[0].property.type === 'Identifier' &&
      returnStatement.argument.arguments[0].property.name === 'usage'
    ) {
      console.log(
        '#5 returnStatement loc:',
        returnStatement.argument.loc.start.line,
        returnStatement.argument.loc.end.line,
      )
    } else {
      console.log(
        '#10 returnStatement loc:',
        returnStatement.argument.loc.start.line,
        returnStatement.argument.loc.end.line,
      )
    }
  } else if (
    returnStatement.argument.type === 'CallExpression' &&
    returnStatement.argument.callee.type === 'MemberExpression' &&
    returnStatement.argument.callee.object.type === 'CallExpression'
  ) {
    console.log(
      '#15 returnStatement loc:', // state.set(usages.THREE_IN_ONE_TRANSFER, cell)
      returnStatement.argument.loc.start.line,
      returnStatement.argument.loc.end.line,
    )
  } else {
    console.log(
      '#20 returnStatement loc:',
      returnStatement.argument.loc.start.line,
      returnStatement.argument.loc.end.line,
    )
  }

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
        storeState = parseReturnStatement(value, warnings)
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
