import { Page } from 'puppeteer'
export type TOccupiedPageInfo = {
  [key: number]: string
}

export type TPageWrapper = {
  page: Page
  isTemp: boolean
  occupiedIndex?: number
}
