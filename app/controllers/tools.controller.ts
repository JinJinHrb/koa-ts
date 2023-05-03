import { JsonController, Get, Controller, Post, Body } from 'routing-controllers'
import { ToolsService } from '../services'
import { Service } from 'typedi'
import { ByRegExpParams, GetAstAndAlterCodeParams } from 'app/services/tools.params'
import pathUtil from 'path'
import { ParseResult } from '@babel/parser'
import { File } from '@babel/types'
import { getFsStatPromise, isDirectory, listStatsPromise } from 'app/helpers/fsUtils'
import _ from 'lodash'

@JsonController()
@Service()
@Controller('/tools')
export class ToolsController {
  constructor(private toolsService: ToolsService) {}

  @Post('/getAstAndAlterCode')
  async do(@Body() { path }: GetAstAndAlterCodeParams) {
    let ast: ParseResult<File> | ParseResult<File>[] | undefined, stats
    if (isDirectory(path)) {
      stats = await listStatsPromise(path)
      const promises: Promise<ParseResult<File>>[] | undefined = stats
        ?.filter(a => a.fileFlag)
        .map(a => a.fname)
        .map(a => this.toolsService.getAst(pathUtil.resolve(path, a as string)))

      ast = await Promise.all(promises as Promise<ParseResult<File>>[])
    } else {
      stats = await getFsStatPromise(path)
      ast = await this.toolsService.getAst(path)
      this.toolsService.alterCode(ast)
    }
    return { path, ast, stats }
  }

  @Post('/getPathByAlias')
  async setAlias(
    @Body() { tsconfigPath, filePath }: Pick<ByRegExpParams, 'tsconfigPath' | 'filePath'>,
  ) {
    if (tsconfigPath) {
      await this.toolsService.setAlias(tsconfigPath)
    }
    return { filePath: this.toolsService.getAlias(filePath) }
  }

  @Post('/traverseToGetGraph')
  async traverseToGetGraph(@Body() { filePath, regExp, tsconfigPath }: ByRegExpParams) {
    // tsconfigPath
    await this.toolsService.setAlias(tsconfigPath)

    let tempFileDependencies: string[] = []
    const {
      filename,
      fileDependencies,
      // npmDependencies,
      // aliasFileMap,
      // aliasNpmMap,
      graph,
    } = await this.toolsService.recurStepOne(filePath)
    tempFileDependencies = fileDependencies
    let notSourceFileDependencies: string[]

    while (
      !_.isEmpty(
        (notSourceFileDependencies = tempFileDependencies.filter(
          fd => !this.toolsService.isGraphSource(fd),
        )),
      )
    ) {
      for (const fd of notSourceFileDependencies) {
        try {
          const {
            // filename,
            fileDependencies,
            // npmDependencies,
            // aliasFileMap,
            // aliasNpmMap,
            // graph,
          } = await this.toolsService.recurStepOne(fd)
          tempFileDependencies = fileDependencies
        } catch (e) {
          console.error('traverseToGetGraph #83 error:', e, '\ndependency path:', fd)
        }
      }
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
    this.toolsService.buildDirectedGrpah('shanghai', 'beijing')
    this.toolsService.buildDirectedGrpah('beijing', 'tianjing')
    this.toolsService.buildDirectedGrpah('hangzhou', 'shanghai')
    this.toolsService.buildDirectedGrpah('shanghai', 'nanjing')
    this.toolsService.buildDirectedGrpah('nanjing', 'shanghai')
    const graph = this.toolsService.buildDirectedGrpah('nanjing', 'tianjing')
    return graph.toJSON()
  }
}
