import { Page } from 'puppeteer'
export type TOccupiedPageInfo = {
  [key: number]: string
}

export type TPageWrapper = {
  page: Page
  isTemp: boolean
  occupiedIndex?: number
}

export interface IStringLiteral {
  type: string
  start: number
  end: number
  loc: Loc
  extra: Extra
  value: string
}

export interface Loc {
  start: Start
  end: End
}

export interface Start {
  line: number
  column: number
  index: number
}

export interface End {
  line: number
  column: number
  index: number
}

export interface Extra {
  rawValue: string
  raw: string
}

// 复杂类型
type A = {
  aa: string
  Bb: string
  cc_Dd: string
}
/*
// 目标：
type B = {
  aa: string
  bb: string
  ccDd: string
}
*/
type Camel<Obj> = {
  [Key in keyof Obj]: Obj[Key]
}

type res = Camel<A>
