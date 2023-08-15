import { JsonController, Controller, Post, Body } from 'routing-controllers'
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
import fs from 'fs'
import {
  findConnectActions,
  buildSingleActionsMap as buildSingleActionsMapHandler,
  buildSagaMap as buildSagaMapHandler,
  getHandlerGraph,
  findReferencedNodes,
  buildSagaGraphByActionsMap,
  recurBuildSagaGraph,
  ParseSingleReducersFileParams,
  parseSingleReducersFile,
} from 'app/services/babelHelper'
// import buildActionsMap from 'app/mock/actionsMap/buildActionsMap'
import { TActionsMap } from 'app/services/babelHelper'
import {
  // fillInHandler2ActionsMap,
  getActionsMap,
  getFileActions,
  getGraphNodes,
  getSagaGraph,
  getSagaMap,
} from 'app/services/babelHelper/innerHelper'
import {
  TraversePredicate,
  getHandlerActions,
  getSagaEffects,
  traverseSagaGraph,
} from 'app/services/babelHelper/sagaHelper'
import { DirectedGraph } from 'graphology'

/*
 * 寻找耦合的 saga
 * (0) /getAstAndAlterCode
 * (1) /traverseToGetGraph => app/mock/graphNodes/graphNodes.json
 * (2) /getFileActions 获取 js及jsx 与 actions 的依赖关系 => app/mock/fileActions/fileActions.json
 * (3) /buildActionsMap 完善 fileActions => app/mock/actionsMap/actionsMap.json
 * (4) /buildSagaMap => app/mock/sagaMap/buildSagaMap.json
 * 辅助：parseSingleSagaHandler
 * (5) /buildSagaGraph => app/mock/sagaGraph/sagaGraph.json
 * (6) /buildComponentRelation => app/mock/associatedComponents/associatedComponents.json
 */

/*
 * 寻找耦合的 reducer/state
 * (0) /getAstAndAlterCode
 */

@JsonController()
@Service()
@Controller('/babel')
export class BabelController {
  constructor(private babelService: BabelService) {}

  @Post('/parseReducer')
  async parseReducer(@Body() params: ParseSingleReducersFileParams) {
    const { ...result } = await parseSingleReducersFile(params)
    return { ...result }
  }

  // WangFan TODO 2023-07-26 11:28:58
  @Post('/findUnusedSaga')
  async findUnusedSaga() {
    const buildSagaMap = await getSagaMap()
    const { fileActions } = await getActionsMap()
    const warnings: string[] = []
    // const { fileActions } = buildActionsMap
    const actions2HandlerMap = buildSagaMap.actions2HandlerMap as any
    const handler2ActionsMap = buildSagaMap.handler2ActionsMap as any
    const flattenArray = function recur(array: any, keys: string[]): any {
      // console.log(`#56 keys.length: ${keys.length} array:`, array)
      const key = keys.shift()
      if (!key) {
        return array
      }
      const rtn: string[] = []
      for (const elem of array) {
        if (_.isArray(elem[key])) {
          elem[key].forEach((subElem: any) => {
            rtn.push(subElem)
          })
        } else {
          rtn.push(elem[key])
        }
      }
      return recur(rtn, keys)
    }
    const actionKeys = flattenArray(fileActions, [
      'groups',
      'actionsComponents',
      'usedActionsDependencies',
    ])
      .filter((a: any) => a)
      .map((a: any) => `${a.dependencyPath},${a.importedName}`)
      .filter((a: any) => a.charAt(0) === '/')

    const graph = getHandlerGraph(handler2ActionsMap)
    const referencedNodes = findReferencedNodes(_.clone(actionKeys), graph)
    const all = [...actionKeys, ...referencedNodes]
    const unusedNodes = graph.nodes().filter(a => !all.includes(a))
    const unusedActions = unusedNodes.filter(a => a.includes('/actions/'))
    const unusedHandlers = unusedNodes.filter(a => !a.includes('/actions/'))
    return { actionKeys, warnings, referencedNodes, unusedActions, unusedHandlers }
  }

  @Post('/buildComponentRelation')
  async buildAppConnections() {
    const {
      graph: { nodes, edges },
    } = await getSagaGraph()
    const directedGraph = new DirectedGraph()
    directedGraph.import({ nodes, edges })
    const associatedCollections: {
      componentFilePath: string
      associatedSagaTakers: Set<string>
      associatedComponents?: string[]
      associatedComponentsMap?: { [key: string]: string[] }
    }[] = []

    for (const edgeDetail of edges) {
      if (edgeDetail.source.includes(',')) {
        continue
      }
      const componentFilePath = edgeDetail.source
      const associatedSagaTakers = new Set<string>()
      traverseSagaGraph({
        directedGraph,
        edgeDetail,
        associatedSagaTakers,
      })
      associatedCollections.push({ componentFilePath, associatedSagaTakers })
    }
    for (let i = 0; i < associatedCollections.length; i++) {
      const associatedCollection = associatedCollections[i]
      const {
        componentFilePath: componentFilePath1,
        associatedSagaTakers: associatedSagaTakers1,
      } = associatedCollection
      const associatedSagaTakers1Array = [...associatedSagaTakers1]
      const associatedComponents: string[] = []
      const associatedComponentsMap: { [key: string]: string[] } = {}
      for (let j = 0; j < associatedCollections.length; j++) {
        if (i === j) {
          continue
        }
        const {
          componentFilePath: componentFilePath2,
          associatedSagaTakers: associatedSagaTakers2,
        } = associatedCollections[j]
        let hasAssociatedComponent = false
        for (const associatedSagaTakers1Element of associatedSagaTakers1Array) {
          if (associatedSagaTakers2.has(associatedSagaTakers1Element)) {
            hasAssociatedComponent = true
            if (!associatedComponentsMap[componentFilePath2]) {
              associatedComponentsMap[componentFilePath2] = []
            }
            if (
              !associatedComponentsMap[componentFilePath2].includes(
                associatedSagaTakers1Element,
              )
            ) {
              associatedComponentsMap[componentFilePath2].push(
                associatedSagaTakers1Element,
              )
            }
          }
        }
        if (
          hasAssociatedComponent &&
          !associatedComponents.includes(componentFilePath2)
        ) {
          associatedComponents.push(componentFilePath2)
        }
        if (_.isEmpty(associatedComponentsMap)) {
          associatedCollection.associatedComponentsMap = associatedComponentsMap
        }
      }
      if (!_.isEmpty(associatedComponents)) {
        associatedCollection.associatedComponents = associatedComponents
      }
    }
    const result = associatedCollections.map(a => {
      const { componentFilePath, associatedSagaTakers, associatedComponents, ...rest } = a
      associatedComponents?.sort()
      return {
        componentFilePath,
        associatedComponentsCount: associatedComponents?.length ?? 0,
        associatedComponents,
        associatedSagaTakers: [...associatedSagaTakers],
        ...rest,
      }
    })

    ;(result as any).sort((a: any, b: any) => {
      const {
        associatedSagaTakers: associatedSagaTakers1,
        associatedComponents: associatedComponents1,
      } = a

      const {
        associatedSagaTakers: associatedSagaTakers2,
        associatedComponents: associatedComponents2,
      } = b

      if ((associatedComponents2 ?? [].length) !== (associatedComponents1 ?? [].length)) {
        return (associatedComponents2 ?? []).length - (associatedComponents1 ?? []).length
      }

      if ((associatedSagaTakers2 ?? [].length) !== (associatedSagaTakers1 ?? [].length)) {
        return (associatedSagaTakers2 ?? []).length - (associatedSagaTakers1 ?? []).length
      }
      return 0
    })
    return { associatedCollections: result }
  }

  @Post('/buildSagaGraph')
  async buildSagaGraph() {
    // const { actions2HandlerMap, handler2ActionsMap } = await getSagaMap()
    const graph = await buildSagaGraphByActionsMap()
    const graphJson = graph.toJSON()
    const actionsKeys = graphJson.nodes.filter(a => a.key.includes(',')).map(a => a.key)
    const sagaMap = await getSagaMap()
    recurBuildSagaGraph({ actionsKeys: _.clone(actionsKeys), graph, sagaMap })
    return { graph }
  }

  @Post('/buildSagaMap')
  async buildSagaMap(
    @Body()
    {
      filePath,
      tsconfigPath,
      noRecur,
    }: {
      filePath: string
      tsconfigPath: string
      noRecur?: boolean
    },
  ) {
    const analyzedFiles = new Set<string>()
    const actions2HandlerMap: TActionsMap = {},
      handler2ActionsMap: TActionsMap = {}
    const result = await buildSagaMapHandler({
      noRecur,
      analyzedFiles,
      actions2HandlerMap,
      handler2ActionsMap,
      tsconfigPath,
      filePath,
    })
    const { warnings, ast } = result || {}

    Object.keys(actions2HandlerMap).forEach(k => {
      const arr = actions2HandlerMap[k]
      arr.forEach((elem: any) => {
        delete elem.rawUsages
      })
    })

    const response: any = {
      // collectors,
      actions2HandlerMap,
      handler2ActionsMap,
      // size: graph?.directedSize,
      // graph: graph?.toJSON(),
      // order: graph?.order,
      warnings,
    }
    if (ast) {
      response.ast = ast
    }
    return response
  }

  @Post('/parseSingleSagaHandler')
  async parseSingleSagaHandler(
    @Body()
    {
      filePath,
      tsconfigPath,
      handlerName,
      graph: pGraph,
    }: {
      filePath: string
      tsconfigPath: string
      handlerName: string
      graph: any
    },
  ) {
    const code = (await getFileData(filePath as string))?.toString()
    const babelService = new BabelService()
    await babelService.setAlias(tsconfigPath)
    const ast = await babelService.getAstByCode(code)
    let graph = pGraph
    if (!graph) {
      const traverseResult = await babelService.traverseToGetGraph({
        filePath,
        noRecur: true,
      })
      graph = traverseResult.graph
    }
    const { sagaEffectsFuns, isSagaFile } = await getSagaEffects(ast)

    const warnings: string[] = []
    // await fillInHandler2ActionsMap({
    //   babelService,
    //   handler2ActionsMap,
    //   handlerCollector,
    //   warnings,
    //   nonAnalyzedFile,
    //   fileAst,
    //   sagaEffectsFuns,
    // })
    const handlerActions2Array = getHandlerActions({
      ast,
      babelService,
      handlerName,
      sagaEffectsFuns,
      warnings,
      filePath,
    })

    return {
      handlerActions2Array,
      sagaEffectsFuns,
      isSagaFile,
      graph,
    }
  }

  @Post('/getFileActions')
  async getFileActions(@Body() { tsconfigPath }: { tsconfigPath: string }) {
    const graphNodes = await getGraphNodes()
    await this.babelService.setAlias(tsconfigPath)
    const nodes = graphNodes.graph.nodes
    const data = []
    let filePath = ''
    try {
      for (const node of nodes) {
        filePath = node.key
        if (
          !filePath.endsWith('.ts') &&
          !filePath.endsWith('.tsx') &&
          !filePath.endsWith('.js') &&
          !filePath.endsWith('.jsx')
        ) {
          continue
        }
        console.log('getFileActions #50 filePath:', filePath)
        const code = (await getFileData(filePath))?.toString()
        const ast = await this.babelService.getAstByCode(code)
        const result = await findConnectActions(ast, filePath, this.babelService)
        if (!_.isEmpty(result.groups)) {
          data.push(result)
        }
      }
    } catch (e) {
      console.error('getFileActions #60 filePath:', filePath, '\nerror:', e)
    }

    return { data }
  }

  @Post('/buildActionsMap')
  async buildActionsMap(@Body() { tsconfigPath }: { tsconfigPath: string }) {
    const graphNodes = await getGraphNodes()
    await this.babelService.setAlias(tsconfigPath)
    /* const code = (await getFileData(filePath))?.toString()
    const ast = await this.babelService.getAstByCode(code)
    const result = buildSingleActionsMapHandler(filePath, ast)
    return { filePath, result } */
    const nodes = graphNodes.graph.nodes
    const fileActions = [],
      warnings = []
    let filePath = ''
    try {
      for (const node of nodes) {
        filePath = node.key
        if (
          !filePath.endsWith('.ts') &&
          !filePath.endsWith('.tsx') &&
          !filePath.endsWith('.js') &&
          !filePath.endsWith('.jsx')
        ) {
          continue
        }
        console.log('buildActionsMap #95 filePath:', filePath)
        const code = (await getFileData(filePath))?.toString()
        const ast = await this.babelService.getAstByCode(code)
        const result = await buildSingleActionsMapHandler(filePath, ast)
        if (!_.isEmpty(result?.groups)) {
          fileActions.push(result)
        } else {
          warnings.push({ filePath, result })
        }
      }
    } catch (e) {
      console.error('buildActionsMap #102 filePath:', filePath, '\nerror:', e)
    }
    return { fileActions, warnings }
  }

  @Post('/getFilesWhoseActionsMethodsEmpty')
  async getFilesWhoseActionsMethodsEmpty() {
    const { data: fileActions } = await getFileActions()
    // const files = buildActionsMap.fileActions
    const files = fileActions
      .filter(({ groups }: any) => {
        for (const group of groups) {
          console.log('#117 group:', group)
          for (const actionsComponent of group.actionsComponents) {
            if (_.isEmpty(actionsComponent.actionsMethods)) {
              return true
            }
          }
        }
        return false
      })
      .map(a => a.filePath)
    return { files }
  }

  @Post('/buildSingleActionsMap')
  async buildSingleActionsMap(
    @Body() { tsconfigPath, filePath }: { tsconfigPath: string; filePath: string },
  ) {
    await this.babelService.setAlias(tsconfigPath)
    const code = (await getFileData(filePath))?.toString()
    const ast = await this.babelService.getAstByCode(code)
    const result = await buildSingleActionsMapHandler(filePath, ast)
    return { filePath, result }
  }

  @Post('/getAstAndAlterCode')
  async getAstAndAlterCode(@Body() { filePath, tsconfigPath }: GetAstAndAlterCodeParams) {
    if (this.babelService.tsconfigPath !== tsconfigPath) {
      await this.babelService.setAlias(tsconfigPath)
    }
    let ast: ParseResult<File> | ParseResult<File>[] | undefined, stats
    let result: any = {}
    if (isDirectory(filePath)) {
      stats = await listStatsPromise(filePath)
      const promises: Promise<ParseResult<File>>[] | undefined = stats
        ?.filter(a => a.fileFlag)
        .map(a => a.fname)
        .map(a => this.babelService.getAst(pathUtil.resolve(filePath, a as string)))

      ast = await Promise.all(promises as Promise<ParseResult<File>>[])
    } else {
      stats = await getFsStatPromise(filePath)
      const code = (await getFileData(filePath))?.toString()
      ast = await this.babelService.getAstByCode(code)
      // result = removeUnusedVars(ast, code)
      // result = findQueryGeneral(ast)
      result = await findConnectActions(ast, filePath, this.babelService)
    }
    return { filePath, result, ast, stats }
  }

  @Post('/getPathByAlias')
  async getPathByAlias(
    @Body() { tsconfigPath, filePath }: Pick<ByRegExpParams, 'tsconfigPath' | 'filePath'>,
  ) {
    if (tsconfigPath) {
      await this.babelService.setAlias(tsconfigPath)
    }
    return { filePath: this.babelService.getRealPathByAlias(filePath as string) }
  }

  @Post('/getModuleFederationEntries')
  async getModuleFederationEntries(
    @Body()
    {
      federationConfigPath,
      tsconfigPath,
    }: {
      federationConfigPath: string
      tsconfigPath: string
    },
  ) {
    await this.babelService.setAlias(tsconfigPath)
    return await this.babelService.getModuleFederationEntries(federationConfigPath)
    // /Users/alexwang/workspace/xTransfer/mfe-user-crm/webpack-config/federationConfig.js
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
    const { filename, npmDependencies, graph } =
      await this.babelService.traverseToGetGraph({
        filePath,
        filePaths,
        noRecur,
      })
    return {
      filename,
      // fileDependencies,
      npmDependencies,
      // aliasFileMap,
      // aliasNpmMap,
      size: graph.directedSize,
      graph: graph.toJSON(),
    }
  }

  @Post('/findUnusedDependencies')
  async findUnusedDependencies(@Body() { projectPath }: { projectPath: string }) {
    const graphNodes = await getGraphNodes()
    const skipPrefixes = ['@types']
    const packageJsonPath = pathUtil.resolve(projectPath, 'package.json')
    const fileData = JSON.parse(String(await getFileData(packageJsonPath)))
    const dependencies = Object.keys(fileData.dependencies)
    const unusedDependencies = dependencies.filter(a => {
      const aPrefix = a.split('/')[0]
      let bool = true
      for (const npmDep of graphNodes.npmDependencies) {
        const npmDepPrefix = npmDep.split('/')[0]
        if (skipPrefixes.includes(npmDepPrefix)) {
          return true
        }
        if (aPrefix === npmDepPrefix || `@${aPrefix}` === npmDepPrefix) {
          bool = false
          break
        }
      }
      return bool
    })
    console.log('#174 unusedDependencies:', unusedDependencies)
    return { unusedDependencies }
  }

  @Post('/removeFilteredFilesDemo')
  async removeFilteredFilesDemo(
    @Body()
    { folderPath, isRecur: pIsRecur }: { folderPath: string; isRecur?: boolean | string },
  ) {
    const graphNodes = await getGraphNodes()
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
        !graphNodes.graph.nodes.map(a => a.key).includes(a),
    )
    toRemovePaths.forEach(path => {
      fs.unlink(path, function (err) {
        if (err) return console.error(`delete file "${path}" error:`, err)
      })
    })
    return { toRemovePaths }
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
}
