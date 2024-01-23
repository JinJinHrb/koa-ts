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
import { traceIdentifier } from './innerHelper'
import { NodePath } from '@babel/core'

const UPDATE_SET_SET_IN = ['update', 'set', 'setIn']
const parseReturnStatement = (
  path: NodePath<any>,
  returnStatement: any,
  warnings: string[],
) => {
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
    returnStatement.argument.callee.property.type === 'Identifier'
  ) {
    if (returnStatement.argument.callee.property.name === 'update') {
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
          '#1 returnStatement loc:',
          returnStatement.argument.loc.start.line,
          returnStatement.argument.loc.end.line,
        )
      } else {
        console.log(
          '#2 returnStatement loc:',
          returnStatement.argument.loc.start.line,
          returnStatement.argument.loc.end.line,
        )
      }
    } else if (returnStatement.argument.callee.property.name === 'set') {
      console.log(
        // return state.set(action.payload.usage, cell)
        '#3 returnStatement loc:',
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
    /*
      current.type === 'CallExpression'
      && current.callee.type === 'MemberExpression'
      && current.callee.object.type === 'Identifier'
      && current.callee.property.type === 'Identifier'
      输出：
        current.callee.object.name // state
        current.callee.property.name // set

      current.arguments[0].type === 'MemberExpression'
      && current.arguments[0].object.type === 'Identifier'
      && current.arguments[0].property.type === 'Identifier'
        current.arguments[0].object.name // usages
        current.arguments[0].property.name // THREE_IN_ONE_TRANSFER
      输出：
        current.arguments[1].type === 'Identifier'
        current.arguments[1].name // cell
    */
    const traces = traceIdentifier({ identifier: 'cell', path, warnings })
    console.log(
      '#15 returnStatement loc:', // state.set(usages.THREE_IN_ONE_TRANSFER, cell)
      returnStatement.argument.loc.start.line,
      returnStatement.argument.loc.end.line,
      'traces:',
      traces,
    )
  } else {
    console.log(
      // return state.set(action.payload.usage, cell)
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

// WangFan TODO 2024-01-18 12:03:41
export const getActionsKey = (
  filePath: string,
  path: NodePath<ExportDefaultDeclaration>,
  objectMethods: (ObjectMethod | ObjectProperty | SpreadElement)[],
  warnings: string[],
) => {
  // const { node } = path // ExportDefaultDeclaration,
  // console.log(
  //   '#135',
  //   'filePath:',
  //   filePath,
  //   'loc:',
  //   loc2String(node?.loc as SourceLocation),
  // )
  const actionsProperties: string[] = []
  for (const objectExpressionProperty of objectMethods) {
    const { key } = objectExpressionProperty as ObjectProperty
    // const actionsName = key.object.name
    const actionsProperty = key.property.name
    const { /* params: objectExpressionParams, */ body: objectExpressionBody } =
      objectExpressionProperty as any
    // console.log(
    //   '#140 actionsName:',
    //   actionsName,
    //   'actionsProperty:',
    //   actionsProperty,
    //   'loc:',
    //   loc2String(objectExpressionProperty?.loc as SourceLocation),
    // )
    actionsProperties.push(actionsProperty)
  }
  return actionsProperties
}

export const getActionsStatesMapByObjectMethod = (
  actionStatesMap: TActionStatesMap,
  path: NodePath<ExportDefaultDeclaration>,
  objectMethods: (ObjectMethod | ObjectProperty | SpreadElement)[],
  warnings: string[],
) => {
  const { node } = path // ExportDefaultDeclaration,
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
        storeState = parseReturnStatement(path, value, warnings)
        return true
      }
      return false
    })
    console.log('parseReturnStatement #52 array:', storeState)

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
