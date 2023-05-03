import { IsNotEmpty } from 'class-validator'

export class GetAstAndAlterCodeParams {
  @IsNotEmpty()
  path!: string
}

export class ByRegExpParams {
  @IsNotEmpty()
  filePath!: string

  @IsNotEmpty()
  tsconfigPath!: string

  regExp?: string
}
