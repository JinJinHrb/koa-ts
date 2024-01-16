import _ from 'lodash'

/**
 * 深度克隆；如果提供了转换方法，可以同时转换日期格式，并存入克隆对象
 * */
export default function fnDeepClone(
  obj: any,
  options?: {
    oidHandler: undefined | ((k: string) => unknown)
    dateHandler: undefined | ((d: Date) => unknown)
    bufferHandler: undefined | ((k: Buffer) => unknown)
  },
): any {
  if (!_.isObject(obj)) {
    return obj
  }
  if (!options) {
    options = {
      oidHandler: undefined,
      dateHandler: undefined,
      bufferHandler: undefined,
    }
  }
  const oidHandler = options.oidHandler
  const result = (typeof (obj as any)['splice'] === 'function' ? [] : {}) as any
  let key
  if (obj && typeof obj === 'object' && !(obj instanceof RegExp)) {
    for (key in obj) {
      if ((obj as any)[key] && (obj as any)[key] instanceof Date) {
        if (options.dateHandler && options.dateHandler instanceof Function) {
          result[key] = options.dateHandler((obj as any)[key])
        } else {
          result[key] = new Date((obj as any)[key])
        }
      } else if ((obj as any)[key] && (obj as any)[key] instanceof Buffer) {
        if (options.bufferHandler && options.bufferHandler instanceof Function) {
          result[key] = options.bufferHandler((obj as any)[key])
        } else {
          result[key] = (obj as any)[key]
        }
      } else if ((obj as any)[key] && typeof (obj as any)[key] === 'object') {
        result[key] = fnDeepClone((obj as any)[key], options) //如果对象的属性值为object的时候，递归调用deepClone，即再把某个值对象复制一份到新的对象的对应值中
      } else {
        if (key === '_id') {
          if (_.isFunction(oidHandler)) {
            result[key] = oidHandler((obj as any)[key])
            continue
          }
        }
        result[key] = (obj as any)[key] //如果对象的属性值不为object的时候，直接复制参数对象的每一个键/值到新对象对应的键/值中
      }
    }
    return result
  }
  return obj
}
