import { JsonController, Get, Controller, Post, Body } from 'routing-controllers'
import { SessionsService } from '../services'
import { Service } from 'typedi'
import { DoParams } from 'app/services/tools.params'

@JsonController()
@Service()
@Controller('/tools')
export class ToolsController {
  constructor(private sessionsService: SessionsService) {}

  @Post('/do')
  async do(@Body() { path }: DoParams) {
    return [{ dir: path, file: '//cdn.ts.op' }]
  }
}
