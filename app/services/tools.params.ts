import { IsNotEmpty } from 'class-validator'

export class DoParams {
  @IsNotEmpty()
  path!: string
}
