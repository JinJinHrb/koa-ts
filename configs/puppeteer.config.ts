import path from 'path'

export const TMP_FOLDER = path.join(__dirname, '../tmp')

/** 项目中 Chromium 位置 */
export const localChromiumPath = 'chrome-mac/Chromium.app/Contents/MacOS/Chromium'

/** page 池上限 */
export const MAX_PAGE_POOL_SIZE = 4

export const chromeExtensions = [
  // path.join(__dirname, './chrome-extensions/google_ms_doc'),
  // path.join(__dirname, './chrome-extensions/XLS-Viewer--Editor'),
]
