import { IsNotEmpty } from 'class-validator'

export class GetAstAndAlterCodeParams {
  @IsNotEmpty()
  path!: string
}

export class ByRegExpParams {
  filePath?: string
  filePaths?: string[]

  @IsNotEmpty()
  tsconfigPath!: string

  regExp?: string

  // 如果只是单纯测试单个文件，而不是递归整个项目，设 ture
  noRecur?: boolean
}
