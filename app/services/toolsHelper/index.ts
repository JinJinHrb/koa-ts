import pathUtil from 'path'
import { ToolsService } from '../tools.service'
import { isDirectory, isFile } from '../../helpers/fsUtils'
import traverse from '@babel/traverse'
import { ParseResult } from '@babel/parser'
import { File } from '@babel/types'
import generate from '@babel/generator'

export const dynamicImportExportHandler = function (
  this: ToolsService,
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
  //保存所依赖的模块
  if (value.indexOf('.') === 0) {
    aliasFileMap[value] =
      this.findFilePathByCandidate(pathUtil.resolve(dirname, value)) ??
      pathUtil.resolve(dirname, value)
  } else {
    const tempAlias = this.getAlias(value)
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

export const findQueryGeneral = (ast: ParseResult<File>) => {
  const result: any = []
  traverse(ast, {
    FunctionDeclaration(path) {
      if (result.length > 0) {
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
              result.push(usageEquivalent.property.name)
            }
          },
        })
      }
    },
  })
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
                    'ToolsService #64',
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
