import { Service } from 'typedi'
import pathUtil from 'path'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { ParseResult } from '@babel/parser'
import { File } from '@babel/types'
import { getFileData, isDirectory } from 'app/helpers/fsUtils'
import wildcard from 'wildcard'
import _ from 'lodash'

@Service()
export class ToolsService {
  projectPath = ''
  compilerOptionsPaths: { [key: string]: string[] } = {}

  async getAst(path: string) {
    const code = (await getFileData(pathUtil.resolve(path, path)))?.toString()
    return parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    })
  }

  alterCode(ast: ParseResult<File>) {
    traverse(ast, {
      enter(path) {
        if (
          !path.isReferencedIdentifier() &&
          path.isIdentifier({ name: 'businessOppNo' })
        ) {
          const parent = path.findParent(path => path.isObjectExpression())
          console.log(
            '#118 !isReferencedIdentifier && "businessOppNo":',
            path.node,
            'parent ObjectExpression:',
            parent,
          )
        }
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

  getAlias(alias: string) {
    const matchKeys = Object.keys(this.compilerOptionsPaths)
    const rtn: string[] = []
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
            rtn.push(pathUtil.join(this.projectPath, pathPrefix, aliasPostfix))
          } else if (!matchKey.includes('*') && !matchVal.includes('*')) {
            const aliasPostfix = alias.replace(matchKey, '')
            rtn.push(pathUtil.join(this.projectPath, matchVal, aliasPostfix))
          }
        }
      }
    }
    return _.uniq(rtn)
  }

  async recurStepOne(filename: string) {
    // 读入文件
    const ast = await this.getAst(filename)
    // 遍历AST抽象语法🌲
    const dependencies = this.traverseAST(filename, ast)

    //返回文件名称，和依赖关系
    return {
      filename,
      dependencies,
    }
  }

  traverseAST(filename: string, ast: ParseResult<File>) {
    const dependencies: { [key: string]: string[] } = {}
    const getAlias = this.getAlias.bind(this)
    const projectPath = this.projectPath
    traverse(ast, {
      //获取通过import引入的模块
      ImportDeclaration({ node }) {
        if (node.importKind === 'value') {
          const dirname = pathUtil.dirname(filename)
          // const newFile = './' + pathUtil.join(dirname, node.source.value)
          //保存所依赖的模块
          if (node.source.value.indexOf('.') === 0) {
            dependencies[node.source.value] = [
              pathUtil.resolve(dirname, node.source.value),
            ]
          } else {
            if (
              isDirectory(
                pathUtil.resolve(projectPath, 'node_modules', node.source.value),
              )
            ) {
              dependencies[node.source.value] = [node.source.value]
            } else {
              dependencies[node.source.value] = getAlias(node.source.value)
            }
          }
        }
      },
    })
    return dependencies
  }
  // webpack 广度深度算法 END
}
