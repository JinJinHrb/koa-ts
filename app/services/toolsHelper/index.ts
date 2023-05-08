import pathUtil from 'path'
import { ToolsService } from '../tools.service'
import { getFileData, isDirectory, isFile } from '../../helpers/fsUtils'

export const dynamicImportExportHandler = function (
  this: ToolsService,
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
