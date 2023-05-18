import { JsonController, Get, Controller, Post, Body } from 'routing-controllers'
import { BabelService } from '../services'
import { Service } from 'typedi'
import { ByRegExpParams, GetAstAndAlterCodeParams } from 'app/services/babel.params'
import pathUtil from 'path'
import { ParseResult } from '@babel/parser'
import { File } from '@babel/types'
import {
  getFileData,
  getFileDataSync,
  getFsStatPromise,
  isDirectory,
  listFilteredFilesPromise,
  listStatsPromise,
} from 'app/helpers/fsUtils'
import _ from 'lodash'
import graphNodes from 'app/mock/graphNodes'
import fs from 'fs'
import {
  findConnectActions,
  findQueryGeneral,
  findReduxConnect,
  removeUnusedVars,
} from 'app/services/babelHelper'

@JsonController()
@Service()
@Controller('/babel')
export class BabelController {
  constructor(private babelService: BabelService) {}

  @Post('/getAstAndAlterCode')
  async getAstAndAlterCode(@Body() { path, tsconfigPath }: GetAstAndAlterCodeParams) {
    if (this.babelService.tsconfigPath !== tsconfigPath) {
      await this.babelService.setAlias(tsconfigPath)
    }
    let ast: ParseResult<File> | ParseResult<File>[] | undefined, stats
    let result: any = {}
    if (isDirectory(path)) {
      stats = await listStatsPromise(path)
      const promises: Promise<ParseResult<File>>[] | undefined = stats
        ?.filter(a => a.fileFlag)
        .map(a => a.fname)
        .map(a => this.babelService.getAst(pathUtil.resolve(path, a as string)))

      ast = await Promise.all(promises as Promise<ParseResult<File>>[])
    } else {
      stats = await getFsStatPromise(path)
      const code = (await getFileData(path))?.toString()
      ast = await this.babelService.getAstByCode(code)
      // result = removeUnusedVars(ast, code)
      // result = findQueryGeneral(ast)
      result = await findConnectActions(ast, path, this.babelService)
    }
    return { path, result, ast, stats }
  }

  @Post('/getPathByAlias')
  async getPathByAlias(
    @Body() { tsconfigPath, filePath }: Pick<ByRegExpParams, 'tsconfigPath' | 'filePath'>,
  ) {
    if (tsconfigPath) {
      await this.babelService.setAlias(tsconfigPath)
    }
    return { filePath: this.babelService.getAlias(filePath as string) }
  }

  @Post('/traverseToGetGraph')
  async traverseToGetGraph(
    @Body() { filePath, filePaths, tsconfigPath, noRecur }: ByRegExpParams,
  ) {
    if (_.isEmpty(filePath) && !_.isEmpty(filePaths)) {
      filePath = filePaths?.shift()
    }

    // tsconfigPath
    await this.babelService.setAlias(tsconfigPath)

    const {
      filename,
      fileDependencies,
      // npmDependencies,
      // aliasFileMap,
      // aliasNpmMap,
      graph,
    } = await this.babelService.recurStepOne(filePath as string)

    if (noRecur !== true) {
      const notSourceFileDependencies: string[] = fileDependencies
      while (!_.isEmpty(notSourceFileDependencies) || !_.isEmpty(filePaths)) {
        const fd = !_.isEmpty(notSourceFileDependencies)
          ? (notSourceFileDependencies.shift() as string)
          : (filePaths?.shift() as string)
        try {
          const {
            // filename,
            fileDependencies,
            // npmDependencies,
            // aliasFileMap,
            // aliasNpmMap,
            // graph,
          } = await this.babelService.recurStepOne(fd)
          fileDependencies.forEach(fd => {
            if (
              !fd.endsWith('.css') &&
              !fd.endsWith('.less') &&
              !fd.endsWith('.sass') &&
              !fd.endsWith('.svg') &&
              !this.babelService.isGraphSource(fd)
            ) {
              notSourceFileDependencies.push(fd)
            }
          })
        } catch (e) {
          console.error('traverseToGetGraph #83 error:', e, '\ndependency path:', fd)
        }
      }
      console.log(
        'traverseToGetGraph #86',
        'tempFileDependencies:',
        notSourceFileDependencies,
      )
    }
    return {
      filename,
      // fileDependencies,
      // npmDependencies,
      // aliasFileMap,
      // aliasNpmMap,
      size: graph.directedSize,
      graph: graph.toJSON(),
    }
  }

  @Post('/buildDirectedGraph')
  async buildDirectedGraph() {
    // tsconfigPath
    this.babelService.buildDirectedGrpah('shanghai', 'beijing')
    this.babelService.buildDirectedGrpah('beijing', 'tianjing')
    this.babelService.buildDirectedGrpah('hangzhou', 'shanghai')
    this.babelService.buildDirectedGrpah('shanghai', 'nanjing')
    this.babelService.buildDirectedGrpah('nanjing', 'shanghai')
    const graph = this.babelService.buildDirectedGrpah('nanjing', 'tianjing')
    return graph.toJSON()
  }

  @Post('/removeFilteredFilesDemo')
  async removeFilteredFilesDemo(
    @Body()
    { folderPath, isRecur: pIsRecur }: { folderPath: string; isRecur?: boolean | string },
  ) {
    const isRecur = _.isString(pIsRecur) ? pIsRecur === 'Y' : Boolean(pIsRecur)
    const candidates = (await listFilteredFilesPromise({
      filterHandler: a => a.fileFlag ?? false,
      folderPath,
      isRecur,
      mapHandler: a => {
        return a.absPath as string
      },
    })) as string[]
    const toRemovePaths = candidates.filter(
      a =>
        !a.endsWith('package.json') &&
        !a.includes('/shared/types/') &&
        !a.includes('/resources/') &&
        !a.includes('/formily-xtd/') &&
        !a.includes('/test/') &&
        !a.includes('/__test__/') &&
        !a.includes('/__tests__/') &&
        !a.includes('/constants/env/') &&
        !graphNodes.map(a => a.key).includes(a),
    )
    toRemovePaths.forEach(path => {
      fs.unlink(path, function (err) {
        if (err) return console.error(`delete file "${path}" error:`, err)
      })
    })
    return toRemovePaths
  }

  @Post('/parsePackageJsonDemo')
  parsePackageJsonDemo(@Body() { folderPath }: { folderPath: string }) {
    try {
      const packageJsonPath = pathUtil.resolve(folderPath, 'package.json')
      const rawData = getFileDataSync(packageJsonPath).toString()
      const data = JSON.parse(rawData)
      return pathUtil.resolve(folderPath, data.main)
    } catch (e) {
      console.error('findFilePathByCandidate #102 error:', e)
    }
  }
}
