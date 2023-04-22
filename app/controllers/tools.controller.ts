import { JsonController, Get, Controller, Post, Body } from 'routing-controllers'
import { ToolsService } from '../services'
import { Service } from 'typedi'
import { ByRegExpParams, AlterCodeParams } from 'app/services/tools.params'
import pathUtil from 'path'
import { ParseResult } from '@babel/parser'
import { File } from '@babel/types'
import { getFsStatPromise, isDirectory, listStatsPromise } from 'app/helpers/fsUtils'

@JsonController()
@Service()
@Controller('/tools')
export class ToolsController {
  constructor(private toolsService: ToolsService) {}

  @Post('/alterCode')
  async do(@Body() { path }: AlterCodeParams) {
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

  @Post('/getApisByRegExp')
  async getApisByRegExp(@Body() { filePath, regExp, tsconfigPath }: ByRegExpParams) {
    // tsconfigPath
    this.toolsService.setAlias(tsconfigPath)
    const { filename, dependencies } = await this.toolsService.recurStepOne(filePath)
    return { filename, dependencies }
  }
}
