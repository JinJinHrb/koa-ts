import traverse, { Binding, Node, NodePath } from '@babel/traverse'
import { ParseResult } from '@babel/parser'
import { File, ImportSpecifier, SourceLocation } from '@babel/types'
import _ from 'lodash'
import pathUtil from 'path'
import {
  getParentPathSkipTSNonNullExpression,
  iterateObjectHandler,
} from '../..//helpers/iterationUtil'
import { DirectedGraph } from 'graphology'
import { BabelService } from '../babel.service'
import { getFileData } from 'app/helpers/fsUtils'
import { getFilesByLocalIdentifier } from '../babelHelper/sagaHelper'
import { parseCreateNetworkingSagas } from '../babelHelper/createNetworkingSagasHelper'
import { TActionsMap, TFileCollectorElement, loc2String } from '../babelHelper'
import { addHandler2ActionsMap, findLocalActions } from '../babelHelper/innerHelper'
import { CommitInfo, getCommitInfoForLine } from 'app/helpers/gitStatistics'

export const getBizComponentApplier = async (
  projectFolderPath: string,
  filePath: string,
  ast: ParseResult<File>,
) => {
  const importSpecifiers: {
    source: string
    importedName: string
    localName: string
    references: { line: number; column: number; index: number; commitInfo?: CommitInfo }[]
  }[] = []
  traverse(ast, {
    enter(path) {
      const { node } = path
      if (node.type === 'ImportDeclaration' && node.source.value.indexOf('@xt/') === 0) {
        const specifiers = node.specifiers
        const source = node.source.value

        /* importSpecifiers.push(
          ...specifiers.map(el => {
            const rtn: { importedName: string; localName: string } = {
              importedName: '',
              localName: '',
            }
            rtn.importedName = (el as ImportSpecifier).imported.name
            rtn.localName = el.local.name
            return rtn
          }),
        ) */

        for (const el of specifiers) {
          const temp: {
            source: string
            importedName: string
            localName: string
            references: { line: number; column: number; index: number }[]
          } = {
            source: '',
            importedName: '',
            localName: '',
            references: [],
          }
          if (el.type === 'ImportDefaultSpecifier') {
            temp.localName = el.local.name
          } else {
            temp.importedName = (el as ImportSpecifier).imported.name
            temp.localName = el.local.name
          }
          const references: { line: number; column: number; index: number }[] = []
          const binding = path.scope.getBinding(el.local.name)
          const {
            identifier,
            scope,
            path: bindingPath,
            referencePaths,
          } = binding as Binding
          // console.log('#65 identifier:', identifier)
          if (binding) {
            if (_.isArray(referencePaths)) {
              for (const referencePath of referencePaths) {
                const { line, column, index } = (referencePath.node.loc as SourceLocation)
                  .start as { line: number; column: number; index: number }
                references.push({ line, column, index })
              }
            }
          }
          temp.references = references
          temp.source = source
          importSpecifiers.push(temp)
        }
      }
      // path.stop()
    },
  })
  for (const importSpecifier of importSpecifiers) {
    const references = importSpecifier.references ?? []
    for (const reference of references) {
      const { line, column, index } = reference
      const commitInfo = (await new Promise((resolve, reject) => {
        getCommitInfoForLine(
          { projectFolderPath, filePath, lineNumber: line },
          (err, rsp) => {
            if (err) {
              reject(err)
            } else {
              resolve(rsp)
            }
          },
        )
      })) as CommitInfo | undefined
      reference.commitInfo = commitInfo
    }
  }
  // console.log('#33 importSpecifiers:', importSpecifiers)
  return importSpecifiers
}
