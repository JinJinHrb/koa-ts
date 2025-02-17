import { join } from 'path'
import { print } from 'app/helpers/fsUtils'
import dotenv from 'dotenv'
import { PuppeteerService } from 'app/services/puppeteer.service'
import { BOOTSTRAP_PUPPETEER } from './puppeteer.config'

// "before" will trigger before the app lift.
export const bootstrapBefore = (): object => {
  // solve ncc path link.
  const result = dotenv.config({ path: join(__dirname, '../.env') })
  if (result.error) {
    print.danger('Environment variable not loaded: not found ".env" file.')
    return {}
  }
  print.log('.env loaded.')
  return result.parsed || {}
}

// "after" will trigger after the "container" mounted..
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const bootstrapAfter = async () => {
  if (BOOTSTRAP_PUPPETEER) {
    const myPuppeteer = PuppeteerService.getInstance('myPuppeteer')
    try {
      await myPuppeteer.getBrowser()
    } catch (e) {
      print.danger(`myPuppeteer.getBrowser() error: ${(e as Error)?.message}`)
    }
  }
}
