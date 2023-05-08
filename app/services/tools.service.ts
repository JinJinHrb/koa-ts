import { Service } from 'typedi'
import pathUtil from 'path'
import { parse } from '@babel/parser'
import traverse, { NodePath } from '@babel/traverse'
import { ExportNamedDeclaration } from '@babel/types'
import { ParseResult } from '@babel/parser'
import {
  File,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
} from '@babel/types'
import { getFileData, getFileDataSync, isDirectory, isFile } from 'app/helpers/fsUtils'
import wildcard from 'wildcard'
import _ from 'lodash'
import Graph, { DirectedGraph } from 'graphology'
import { IStringLiteral } from './types'
import { dynamicImportExportHandler as originDynamicImportExportHandler } from './toolsHelper'

type VariableSpecifierKey =
  | ImportDefaultSpecifier
  | ImportNamespaceSpecifier
  | ImportSpecifier

@Service()
export class ToolsService {
  projectPath = ''
  compilerOptionsPaths: { [key: string]: string[] } = {}
  directedGraph = new DirectedGraph()

  async getAst(path: string) {
    const code = (await getFileData(pathUtil.resolve(path, path)))?.toString()
    return parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx', 'decorators-legacy'],
    })
  }

  alterCode(ast: ParseResult<File>) {
    traverse(ast, {
      enter(path) {
        // 遍历没有引用的 businessOppNo
        if (
          !path.isReferencedIdentifier() &&
          path.isIdentifier({ name: 'businessOppNo' })
        ) {
          // const parent = path.findParent(path => path.isObjectExpression())
          console.log(
            '#44 !isReferencedIdentifier && "businessOppNo":',
            path.node,
            // 'parent ObjectExpression:',
            // parent,
          )
        }
        // 遍历所有箭头函数
        /* if (path.isArrayExpression()) {
          path.traverse({
            Identifier() {
              console.log('Called!')
            },
          })
        } */
      },
    })
  }

  // webpack 广度深度算法 START
  // 参考：https://juejin.cn/post/6850418113901985805
  async setAlias(tsconfigPath: string) {
    this.projectPath = pathUtil.dirname(tsconfigPath)
    const json = (await getFileData(tsconfigPath)) as unknown as string
    const obj = JSON.parse(json)
    if (!obj) {
      return null
    }
    this.compilerOptionsPaths = obj?.compilerOptions?.paths ?? {}
    return this.compilerOptionsPaths
  }

  /*
   * 根据 node: module 规则寻找可能的地址
   */
  findFilePathByCandidate(candidate: string) {
    if (isFile(candidate)) {
      return candidate
    }
    if (!candidate.endsWith('/') && !candidate.endsWith('.')) {
      if (isFile(candidate + '.ts')) {
        return candidate + '.ts'
      } else if (isFile(candidate + '.tsx')) {
        return candidate + '.tsx'
      } else if (isFile(candidate + '.d.ts')) {
        return candidate + '.d.ts'
      } else if (isFile(candidate + '.js')) {
        return candidate + '.js'
      } else if (isFile(candidate + '.jsx')) {
        return candidate + '.jsx'
      } else if (isFile(candidate + '.svg')) {
        return candidate + '.svg'
      } else if (isFile(candidate + '.json')) {
        return candidate + '.json'
      }
    }
    if (isDirectory(candidate)) {
      if (isFile(pathUtil.resolve(candidate, 'index.ts'))) {
        return pathUtil.resolve(candidate, 'index.ts')
      } else if (isFile(pathUtil.resolve(candidate, 'index.tsx'))) {
        return pathUtil.resolve(candidate, 'index.tsx')
      } else if (isFile(pathUtil.resolve(candidate, 'index.d.ts'))) {
        return pathUtil.resolve(candidate, 'index.d.ts')
      } else if (isFile(pathUtil.resolve(candidate, 'index.js'))) {
        return pathUtil.resolve(candidate, 'index.js')
      } else if (isFile(pathUtil.resolve(candidate, 'index.jsx'))) {
        return pathUtil.resolve(candidate, 'index.jsx')
      } else if (isFile(pathUtil.resolve(candidate, 'package.json'))) {
        try {
          const packageJsonPath = pathUtil.resolve(candidate, 'package.json')
          const rawData = getFileDataSync(packageJsonPath).toString()
          const data = JSON.parse(rawData)
          return pathUtil.resolve(candidate, data.main)
        } catch (e) {
          console.error('findFilePathByCandidate #102 error:', e)
        }
      }
    }
    return undefined
  }

  getAlias(alias: string) {
    const matchKeys = Object.keys(this.compilerOptionsPaths)
    const candidates: string[] = []
    for (const matchKey of matchKeys) {
      if (wildcard(matchKey, alias)) {
        const matchArray = (this.compilerOptionsPaths[matchKey] ?? []) as string[]
        if (!_.isArray(matchArray)) {
          continue
        }
        for (const matchVal of matchArray) {
          if (_.endsWith(matchKey, '*') && _.endsWith(matchVal, '*')) {
            const matchKeyPrefix = matchKey.slice(0, -1)
            const pathPrefix = matchVal.slice(0, -1)
            const aliasPostfix = alias.replace(matchKeyPrefix, '')
            candidates.push(pathUtil.join(this.projectPath, pathPrefix, aliasPostfix))
          } else if (!matchKey.includes('*') && !matchVal.includes('*')) {
            const aliasPostfix = alias.replace(matchKey, '')
            candidates.push(pathUtil.join(this.projectPath, matchVal, aliasPostfix))
          } else {
            console.warn('getAlias #92 unprocessed alias:', alias)
          }
        }
      }
    }
    const fPaths = _.uniq(candidates)
    for (const fPath of fPaths) {
      const realPath = this.findFilePathByCandidate(fPath)
      if (!_.isNil(realPath)) {
        return realPath
      }
    }
    console.warn('getAlias #121 fPaths:', fPaths, 'alias:', alias)
    return ''
  }

  async recurStepOne(filename: string) {
    // 读入文件
    const ast = await this.getAst(filename)
    // 遍历AST抽象语法树
    const { fileDependencies, npmDependencies, aliasFileMap, aliasNpmMap } =
      await this.traverseAST(filename, ast)
    const graph = this.buildFileDependencyGraph(filename, fileDependencies)
    //返回文件名称，和依赖关系
    return {
      filename,
      fileDependencies,
      npmDependencies,
      aliasFileMap,
      aliasNpmMap,
      graph,
    }
  }

  buildFileDependencyGraph(filename: string, fileDependencies: string[]) {
    if (this.isGraphSource(filename)) {
      return this.directedGraph
    }
    fileDependencies.forEach(b => {
      this.buildDirectedGrpah(filename, b)
    })
    return this.directedGraph
  }

  buildDirectedGrpah(a: string, b: string) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    if (!this.directedGraph.hasNode(a)) {
      this.directedGraph.addNode(a)
    }
    if (!this.directedGraph.hasNode(b)) {
      this.directedGraph.addNode(b)
    }
    const edge = this.directedGraph.edge(a, b)
    if (!this.directedGraph.hasEdge(edge)) {
      this.directedGraph.addDirectedEdge(a, b)
    }
    return this.directedGraph
  }

  /**
   * 判断某个资源是否是起点
   */
  isGraphSource(source: string) {
    return this.directedGraph.findEdge((...args) => {
      return args[2] === source
    })
  }

  /* getGraphArray(entryModule) {
    const graphArray = [entryModule]
    for (let i = 0; i < graphArray.length; i++) {
      const item = graphArray[i]
      const { dependencies } = item //拿到文件所依赖的模块集合(键值对存储)
      for (let j in dependencies) {
        graphArray.push(one(dependencies[j])) //敲黑板！关键代码，目的是将入口模块及其所有相关的模块放入数组
      }
    }
  }

  getGraph(graphArray) {
    const graph = {}
    graphArray.forEach(item => {
      graph[item.filename] = {
        dependencies: item.dependencies,
        code: item.code,
      }
    })
    return graph
  } */

  async traverseAST(filename: string, ast: ParseResult<File>) {
    const dirname = pathUtil.dirname(filename),
      aliasFileMap: { [key: string]: string } = {},
      aliasNpmMap: { [key: string]: string } = {},
      fileDependencies: string[] = [],
      npmDependencies: string[] = [],
      getAlias = this.getAlias.bind(this),
      findFilePathByCandidate = this.findFilePathByCandidate.bind(this),
      dynamicImportExportHandler = originDynamicImportExportHandler.bind(this),
      projectPath = this.projectPath
    const hasReferenceVariableSpecifierMap = new Map<any, string[]>()
    const nonReferenceVariableSpecifierMap = new Map<any, string[]>()

    traverse(ast, {
      //获取通过import引入的模块
      ImportDeclaration(path) {
        const { node } = path
        if (node.importKind === 'value') {
          // const newFile = './' + pathUtil.join(dirname, node.source.value)
          //保存所依赖的模块

          let alias = ''
          if (node.source.value.indexOf('.') === 0) {
            alias = aliasFileMap[node.source.value] =
              findFilePathByCandidate(pathUtil.resolve(dirname, node.source.value)) ??
              pathUtil.resolve(dirname, node.source.value)
          } else {
            const tempAlias = getAlias(node.source.value)
            if (tempAlias) {
              alias = aliasFileMap[node.source.value] = tempAlias
            } else if (
              isDirectory(
                pathUtil.resolve(projectPath, 'node_modules', node.source.value),
              )
            ) {
              alias = aliasNpmMap[node.source.value] = node.source.value
            } else if (
              isFile(pathUtil.resolve(projectPath, 'node_modules', node.source.value))
            ) {
              alias = aliasNpmMap[node.source.value] = node.source.value
            }
          }

          if (node.specifiers) {
            // "type": "ImportSpecifier"
            const specifiers = path.node.specifiers
              .filter(a => ['ImportDefaultSpecifier', 'ImportSpecifier'].includes(a.type))
              .map(a => a)
            for (const specifier of specifiers) {
              const name = specifier.local.name
              const binding = path.scope.getBinding(name)
              if (binding?.referenced === false) {
                const arr = nonReferenceVariableSpecifierMap.get(alias) ?? []
                arr.push(name)
                nonReferenceVariableSpecifierMap.set(alias, arr)
              } else if (binding?.referenced === true) {
                const arr = hasReferenceVariableSpecifierMap.get(alias) ?? []
                arr.push(name)
                hasReferenceVariableSpecifierMap.set(alias, arr)
              }
            }
          }
        }
      },
      CallExpression(path) {
        if (
          path.node.callee.type === 'Import' ||
          (path.node.callee.type === 'Identifier' && path.node.callee.name === 'require')
        ) {
          const arg1 = path.node.arguments[0] as unknown as IStringLiteral
          const value = arg1.value
          dynamicImportExportHandler({
            value,
            dirname,
            projectPath,
            aliasFileMap,
            aliasNpmMap,
          })
        }
      },
      ExportNamedDeclaration(path) {
        const { node } = path
        if (node.exportKind === 'value' && !_.isEmpty(node.source?.value)) {
          const value = node.source?.value as string
          dynamicImportExportHandler({
            value,
            dirname,
            projectPath,
            aliasFileMap,
            aliasNpmMap,
          })
        }
      },
      ExportAllDeclaration(path) {
        const { node } = path
        if ((node as any).exportKind === 'value' && !_.isEmpty(node.source?.value)) {
          const value = node.source?.value as string
          dynamicImportExportHandler({
            value,
            dirname,
            projectPath,
            aliasFileMap,
            aliasNpmMap,
          })
        }
      },
    })

    const toDelKeys: any[] = []
    nonReferenceVariableSpecifierMap.forEach((value, key, map) => {
      if (!_.isNil(hasReferenceVariableSpecifierMap.get(key))) {
        console.log(
          'ToolsService #219',
          key + ' = ' + value,
          'hasReferenceVariableSpecifierMap:',
          hasReferenceVariableSpecifierMap.get(key),
        )
        toDelKeys.push(key)
      }
    })
    toDelKeys.forEach(k => {
      nonReferenceVariableSpecifierMap.delete(k)
    })

    Object.keys(aliasFileMap).forEach(k => {
      fileDependencies.push(aliasFileMap[k])
    })
    Object.keys(aliasNpmMap).forEach(k => {
      npmDependencies.push(aliasNpmMap[k])
    })
    return { fileDependencies, npmDependencies, aliasFileMap, aliasNpmMap }
  }

  // webpack 广度深度算法 END
}
