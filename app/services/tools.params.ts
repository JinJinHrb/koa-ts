import { IsNotEmpty } from 'class-validator'

export class AlterCodeParams {
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
