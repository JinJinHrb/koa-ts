import pathUtil from 'path'
import { BabelService } from '../babel.service'
import { isDirectory, isFile } from '../../helpers/fsUtils'
import traverse, { Node, NodePath } from '@babel/traverse'
import { ParseResult } from '@babel/parser'
import { File } from '@babel/types'
import generate from '@babel/generator'
import _ from 'lodash'

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

export const findConnectActions = async (
  ast: ParseResult<File>,
  filePath: string,
  babelService: BabelService,
) => {
  const result: any = {
    localConnect: '',
    actionsDependencies: [], // { key, value, sourceValue }
  }
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
        // bindActionCreatorsContainer.scope.getBinding(result.localConnect)
        const spreadElementNames: any = []
        const objectPropertyMap: any = {}
        const unknownElements: any = []

        const firstContainerArgument = (bindActionCreatorsReference.container as any)
          .arguments[0]
        if (firstContainerArgument.type === 'ObjectExpression') {
          // console.log(
          //   `(${i})`,
          //   '#100 bindActionCreators.referencePaths[i].container.arguments[0].properties',
          //   firstContainerArgument.properties,
          // )
          firstContainerArgument.properties.forEach((el: any) => {
            if (el.type === 'SpreadElement') {
              spreadElementNames.push(el.argument.name)
            } else if (el.type === 'ObjectProperty') {
              objectPropertyMap[el.key.name] = el.value.name
            } else {
              unknownElements.push(el)
            }
          })
        }

        const objectPropertyNames = Object.keys(objectPropertyMap).map(
          a => objectPropertyMap[a],
        )
        result.spreadElementNames = {
          ...spreadElementNames,
          ...result.spreadElementNames,
        }
        result.objectPropertyMap = {
          ...objectPropertyMap,
          ...result.objectPropertyMap,
        }
        result.unknownElements = {
          ...unknownElements,
          ...result.unknownElements,
        }
        ;[...spreadElementNames, ...objectPropertyNames].forEach(k => {
          const referenceActionsBinding = bindActionCreatorsReference.scope.getBinding(k)
          const referenceActionsBindingDeclaration =
            referenceActionsBinding?.path.findParent(path => path.isImportDeclaration())
          const sourceValue = (referenceActionsBindingDeclaration?.node as any).source
            .value
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
            result.actionsDependencies.push({
              isNamespace: true,
              localName: k,
              sourceValue,
            })
          } else {
            const importedName = referenceActionsBindingDeclarationSpecifier.imported.name
            result.actionsDependencies.push({
              localName: k,
              importedName,
              sourceValue,
            })
          }
        })
        // WangFan TODO 2023-05-18 22:24:49
        const embeddedComponentResponse = findEmbeddedComponent(
          bindActionCreatorsReference,
          result.localConnect,
        )
        result.actionsComponents = [
          ...embeddedComponentResponse.actionsComponents,
          ...(result.actionsComponents || []),
        ]
        result.warnings = [
          ...embeddedComponentResponse.warnings,
          ...(result.warnings || []),
        ]
      }
    },
  })
  for (const ad of result.actionsDependencies) {
    const sourceValue = ad.sourceValue
    const dependencyPath = await babelService.getImportedFileByAlias(
      filePath,
      sourceValue,
    )
    ad.dependencyPath = dependencyPath
  }
  return result
}

const findEmbeddedComponent = (
  bindActionCreatorsReference: NodePath<Node>,
  localConnect: string,
) => {
  const actionsComponents: any = [] // 被注入 actions 的组件名数组
  const warnings: any = []
  if (!localConnect) {
    return { actionsComponents, warnings }
  }
  const bindActionCreatorsParentsPath = bindActionCreatorsReference.findParent(
    path => path.parentPath.node.type === 'Program',
  )
  /*
    // 情形一：
    const mapDispatch = (dispatch: Dispatch) => ({
      actions: bindActionCreators({ ...actions, change, push, touch }, dispatch),
    })
  */
  // const localConnectBinding = bindActionCreatorsParentsPath.scope.getBinding(localConnect)
  // console.log('#220 localConnectBinding:', localConnectBinding)
  let wrappedConnectPath: NodePath<Node> | undefined
  bindActionCreatorsParentsPath.traverse({
    enter: subPath => {
      if (
        (subPath.node as any).name === localConnect &&
        (subPath.container as any)?.type === 'CallExpression'
      ) {
        wrappedConnectPath = subPath
        subPath.stop()
        return
      }
    },
  })
  if (
    !wrappedConnectPath &&
    bindActionCreatorsParentsPath.node.type === 'VariableDeclaration'
  ) {
    const variableDeclarator = bindActionCreatorsReference.findParent(
      path =>
        path.type === 'VariableDeclarator' &&
        path.parentPath.node.start === bindActionCreatorsParentsPath.node.start,
    )
    const varName = (variableDeclarator.node as any).id.name
    const binding = variableDeclarator.scope.getBinding(varName)
    const referencePaths = binding?.referencePaths || []
    for (let i = 0; i < referencePaths.length; i++) {
      const referencePath = referencePaths[i]
      const parentOfCallExpression = referencePath.findParent(
        path =>
          path.node.type === 'CallExpression' &&
          path.parentPath.node.type !== 'CallExpression',
      )

      const lastArguments = (parentOfCallExpression.node as any).arguments
      if (lastArguments.length !== 1) {
        warnings.push(
          '[Warning] #230 lastArguments.length !== 1 (start line: ' +
            parentOfCallExpression.node.loc?.start.line +
            ', start column: ' +
            parentOfCallExpression.node.loc?.start.column +
            ', end line: ' +
            parentOfCallExpression.node.loc?.end.line,
          ', end column: ' + parentOfCallExpression.node.loc?.end.column + ')',
        )
      } else {
        const lastArgument = lastArguments[0]
        if (lastArgument.type === 'CallExpression') {
          if (lastArgument.arguments.length === 1) {
            if (lastArgument.arguments[0].type === 'Identifier') {
              actionsComponents.push({
                type: 'Identifier',
                name: lastArgument.arguments[0].name,
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
            actionsComponents.push({
              type: 'Identifier',
              name: lastArgument.name,
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
    wrappedConnectPath.parentPath.parentPath.node.type === 'CallExpression' &&
    wrappedConnectPath.parentPath.parentPath.node.arguments.length === 1
  ) {
    const wrappedConnectArgument =
      wrappedConnectPath.parentPath.parentPath.node.arguments[0]
    if (wrappedConnectArgument.type === 'Identifier') {
      actionsComponents.push({
        type: 'Identifier',
        name: wrappedConnectArgument.name,
      })
    } else {
      actionsComponents.push({
        type: wrappedConnectArgument.type,
        loc: wrappedConnectArgument.loc,
      })
    }
  } else {
    console.log(
      '#300 !wrappedConnectPath bindActionCreatorsParentsPath.node:',
      bindActionCreatorsParentsPath.node,
    )
    warnings.push(
      '[Warning] #300 actionsComponents not found (start line: ' +
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
