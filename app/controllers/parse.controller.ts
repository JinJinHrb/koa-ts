import { JsonController, Controller, Post, Body } from 'routing-controllers'
import { BabelService } from '../services'
import { Service } from 'typedi'
import _ from 'lodash'
import { GetAstAndAlterCodeParams } from 'app/services/babel.params'
import { getFileData, getFsStatPromise, isFile } from 'app/helpers/fsUtils'
import { getSharedComponentPrefixByModuleFederations } from 'app/services/babelHelper/innerHelper'
import { rankRequestByHar } from 'app/helpers/performanceHelper'

@JsonController()
@Service()
@Controller('/parse')
export class ParseController {
  constructor(private babelService: BabelService) {}

  @Post('/getModuleFederations')
  async getModuleFederations(
    @Body()
    { federationConfigPath, tsconfigPath, writeDirectory }: any,
  ) {
    if (this.babelService.tsconfigPath !== tsconfigPath) {
      await this.babelService.setAlias(tsconfigPath)
    }
    return await getSharedComponentPrefixByModuleFederations(
      this.babelService,
      federationConfigPath,
    )
  }

  @Post('/rankRequests')
  async rankRequests(
    @Body()
    { harPath }: any,
  ) {
    if (!isFile(harPath)) {
      return { error: `invalid filePath: ${harPath}` }
    }
    return await rankRequestByHar(harPath)
  }
}
