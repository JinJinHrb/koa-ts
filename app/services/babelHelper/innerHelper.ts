import pathUtil from 'path'
import { BabelService } from '../babel.service'
import { isDirectory, isFile } from '../../helpers/fsUtils'
import traverse, { Node, NodePath } from '@babel/traverse'
import { ParseResult } from '@babel/parser'
import {
  File,
  ArgumentPlaceholder,
  Expression,
  JSXNamespacedName,
  SpreadElement,
} from '@babel/types'

import generate from '@babel/generator'
import _ from 'lodash'
import { getParentPathSkipTSNonNullExpression } from '../../helpers/iterationUtil'

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
    const propsBinding = subPath.scope.getBinding('props')
    console.log('#192 propsBinding:', propsBinding)
  } */
}
