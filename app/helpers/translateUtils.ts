import axios from 'axios'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { join } from 'path'
import { print } from './fsUtils'
import _ from 'lodash'

type BAIDU_TRANSLATE_RESPONSE_DATA = {
  error_code?: string
  error_msg?: string
}

export async function translate(text: string, from: string, to: string): Promise<string> {
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
    return response.data.trans_result?.[0]?.dst
  } catch (error) {
    console.error(error, 'text:', text, 'from:', from, 'to:', to)
  }
  return `😢 FAIL TO TRANSLATE: "${text}"`
}

// "before" will trigger before the app lift.
const bootstrapBefore = (): object => {
  // solve ncc path link.
  const result = dotenv.config({ path: join(__dirname, '../../.env') })
  if (result.error) {
    print.danger('Environment variable not loaded: not found ".env" file.')
    return {}
  }
  print.log('.env loaded.')
  return result.parsed || {}
}
