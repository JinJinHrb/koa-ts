import { IsNotEmpty } from 'class-validator'

export class PreviewParams {
  @IsNotEmpty()
  url!: string

  @IsNotEmpty()
  name!: string // 文件名
}
