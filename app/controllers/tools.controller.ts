import { JsonController, Get, Controller, Post, Body } from 'routing-controllers'
import { ToolsService } from '../services'
import { Service } from 'typedi'
import { DoParams } from 'app/services/tools.params'

@JsonController()
@Service()
@Controller('/tools')
export class ToolsController {
  constructor(private toolsService: ToolsService) {}

  @Post('/do')
  async do(@Body() { path }: DoParams) {
    const stats = await this.toolsService.listStatsPromise(path)
    return [{ dir: path, stats }]
  }
}
