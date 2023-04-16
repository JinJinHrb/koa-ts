import path from 'path'

export const BOOTSTRAP_PUPPETEER = false

export const TMP_FOLDER = path.join(__dirname, '../tmp')

/** 项目中 Chromium 位置 */
export const localChromiumPath = 'chrome-mac/Chromium.app/Contents/MacOS/Chromium'

/** page 池上限 */
export const MAX_PAGE_POOL_SIZE = 4

export const HEADLESS = true

export const WINDOW_SIZE = {
  width: 1280,
  height: 1024,
}

/** 如果是插件，强制 headless: false 模式 */
export const chromeExtensions = [
  // path.join(__dirname, './chrome-extensions/google_ms_doc'),
  // path.join(__dirname, './chrome-extensions/XLS-Viewer--Editor'),
]
