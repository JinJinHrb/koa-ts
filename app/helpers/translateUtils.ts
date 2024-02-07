import axios from 'axios'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { join } from 'path'
import { print } from './fsUtils'
import _ from 'lodash'
import { LRUMap } from 'lru_map'
import { readColumns } from './excelUtils'

type BAIDU_TRANSLATE_RESPONSE_DATA = {
  error_code?: string
  error_msg?: string
}

// 避免重复翻译
const _translateMemory = new LRUMap(5000)

export async function cacheTranslation(filePaths: string[]) {
  const results = []
  for (const filePath of filePaths) {
    const { data, contents } = (await readColumns(filePath, 1, 3, 5)) as any
    if (data.length > 1 && data.length === contents.length) {
      const data2 = data.slice(1)
      const contents2 = contents.slice(1)
      for (let i = 0; i < data2.length; i++) {
        const text = data2[i]
        const translation = contents2[i]
        _translateMemory.set(`zh_en_${text}`, translation)
      }
    }
    results.push({ data, contents })
  }
  return _translateMemory.toJSON()
}

export async function translate(text: string, from: string, to: string): Promise<string> {
  if (_translateMemory.has(`${from}_${to}_${text}`)) {
    return _translateMemory.get(`${from}_${to}_${text}`) as string
  }
  const parsedEnvs = bootstrapBefore() as any
  // const apiKey = parsedEnvs.BAIDU_TRANSLATE_API_KEY // '你的百度翻译API Key'
  const appId = parsedEnvs.BAIDU_TRANSLATE_API_KEY // '你的百度翻译API Key' // '你的百度翻译App ID'
  const secretKey = parsedEnvs.BAIDU_TRANSLATE_SECRET // '你的百度翻译Secret Key'
  const salt = crypto.randomBytes(2).toString('hex').slice(0, 10) // '随机数'
  /* const sign = crypto
    .createHmac('sha1', `${appId}${text}${salt}${secretKey}`)
    .update(text)
    .digest('hex') */

  const sign = crypto
    .createHash('md5')
    .update(`${appId}${text}${salt}${secretKey}`)
    .digest('hex')
    .toLowerCase()

  const url = `https://fanyi-api.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(
    text,
  )}&from=${from}&to=${to}&appid=${appId}&salt=${salt}&sign=${sign}`

  try {
    const response = await axios.get(url)
    const responseData = response.data as BAIDU_TRANSLATE_RESPONSE_DATA
    if (
      _.isObject(response.data) &&
      (response.data as BAIDU_TRANSLATE_RESPONSE_DATA).error_code
    ) {
      throw new Error(responseData.error_msg)
    }
    // console.log('#43 response.data:', response.data)
    // #43 response.data: {
    //   from: 'zh',
    //   to: 'en',
    //   trans_result: [ { src: '取消', dst: 'cancel' } ]
    // }
    console.log('#49 text:', text, 'trans_result:', response.data.trans_result?.[0]?.dst)
    _translateMemory.set(`${from}_${to}_${text}`, response.data.trans_result?.[0]?.dst)
    return response.data.trans_result?.[0]?.dst
  } catch (error) {
    console.error(error, 'text:', text, 'from:', from, 'to:', to)
  }
  return `😢 FAIL TO TRANSLATE: "${text}"`
}

let _envParsed: any
// "before" will trigger before the app lift.
const bootstrapBefore = (): object => {
  if (_envParsed) {
    return _envParsed
  }
  // solve ncc path link.
  const result = dotenv.config({ path: join(__dirname, '../../.env') })
  if (result.error) {
    print.danger('Environment variable not loaded: not found ".env" file.')
    return {}
  }
  print.log('.env loaded.')
  if (!_.isEmpty(result?.parsed)) {
    _envParsed = result?.parsed
  }
  return result.parsed || {}
}
