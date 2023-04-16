;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define('formily.json-schema', ['exports'], factory)
    : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory(
        ((global.Formily = global.Formily || {}), (global.Formily.JSONSchema = {})),
      ))
})(this, function (exports) {
  'use strict'
  ;(function () {
    const env = { NODE_ENV: 'development' }
    try {
      if (process) {
        process.env = Object.assign({}, process.env)
        Object.assign(process.env, env)
        return
      }
    } catch (e) {} // avoid ReferenceError: process is not defined
    globalThis.process = { env: env }
  })()

  var toString$3 = Object.prototype.toString
  var isType$2 = function (type) {
    return function (obj) {
      return getType(obj) === '[object '.concat(type, ']')
    }
  }
  var getType = function (obj) {
    return toString$3.call(obj)
  }
  var isFn$2 = function (val) {
    return typeof val === 'function'
  }
  var isArr$2 = Array.isArray
  var isPlainObj$1 = isType$2('Object')
  var isStr$1 = isType$2('String')
  var isBool = isType$2('Boolean')
  var isNum$1 = isType$2('Number')
  var isNumberLike$1 = function (index) {
    return isNum$1(index) || /^\d+$/.test(index)
  }
  var isObj$1 = function (val) {
    return typeof val === 'object'
  }

  var toArr$1 = function (val) {
    return isArr$2(val) ? val : val ? [val] : []
  }
  function each(val, iterator, revert) {
    if (isArr$2(val) || isStr$1(val)) {
      if (revert) {
        for (var i = val.length - 1; i >= 0; i--) {
          if (iterator(val[i], i) === false) {
            return
          }
        }
      } else {
        for (var i = 0; i < val.length; i++) {
          if (iterator(val[i], i) === false) {
            return
          }
        }
      }
    } else if (isObj$1(val)) {
      var key = void 0
      for (key in val) {
        if (Object.hasOwnProperty.call(val, key)) {
          if (iterator(val[key], key) === false) {
            return
          }
        }
      }
    }
  }
  function map(val, iterator, revert) {
    var res = isArr$2(val) || isStr$1(val) ? [] : {}
    each(
      val,
      function (item, key) {
        var value = iterator(item, key)
        if (isArr$2(res)) {
          res.push(value)
        } else {
          res[key] = value
        }
      },
      revert,
    )
    return res
  }
  function reduce(val, iterator, accumulator, revert) {
    var result = accumulator
    each(
      val,
      function (item, key) {
        result = iterator(result, item, key)
      },
      revert,
    )
    return result
  }

  /* istanbul ignore next */
  function globalSelf() {
    try {
      if (typeof self !== 'undefined') {
        return self
      }
    } catch (e) {}
    try {
      if (typeof window !== 'undefined') {
        return window
      }
    } catch (e) {}
    try {
      if (typeof global !== 'undefined') {
        return global
      }
    } catch (e) {}
    return Function('return this')()
  }
  var globalThisPolyfill = globalSelf()

  var instOf = function (value, cls) {
    if (isFn$2(cls)) return value instanceof cls
    if (isStr$1(cls))
      return globalThisPolyfill[cls] ? value instanceof globalThisPolyfill[cls] : false
    return false
  }

  var isArray$1 = isArr$2
  var keyList$1 = Object.keys
  var hasProp$1 = Object.prototype.hasOwnProperty
  /* eslint-disable */
  function equal(a, b) {
    // fast-deep-equal index.js 2.0.1
    if (a === b) {
      return true
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      var arrA = isArray$1(a)
      var arrB = isArray$1(b)
      var i = void 0
      var length_1
      var key = void 0
      if (arrA && arrB) {
        length_1 = a.length
        if (length_1 !== b.length) {
          return false
        }
        for (i = length_1; i-- !== 0; ) {
          if (!equal(a[i], b[i])) {
            return false
          }
        }
        return true
      }
      if (arrA !== arrB) {
        return false
      }
      var momentA = a && a._isAMomentObject
      var momentB = b && b._isAMomentObject
      if (momentA !== momentB) return false
      if (momentA && momentB) return a.isSame(b)
      var immutableA = a && a.toJS
      var immutableB = b && b.toJS
      if (immutableA !== immutableB) return false
      if (immutableA) return a.is ? a.is(b) : a === b
      var dateA = instOf(a, 'Date')
      var dateB = instOf(b, 'Date')
      if (dateA !== dateB) {
        return false
      }
      if (dateA && dateB) {
        return a.getTime() === b.getTime()
      }
      var regexpA = instOf(a, 'RegExp')
      var regexpB = instOf(b, 'RegExp')
      if (regexpA !== regexpB) {
        return false
      }
      if (regexpA && regexpB) {
        return a.toString() === b.toString()
      }
      var urlA = instOf(a, 'URL')
      var urlB = instOf(b, 'URL')
      if (urlA !== urlB) {
        return false
      }
      if (urlA && urlB) {
        return a.href === b.href
      }
      var schemaA = a && a.toJSON
      var schemaB = b && b.toJSON
      if (schemaA !== schemaB) return false
      if (schemaA && schemaB) return equal(a.toJSON(), b.toJSON())
      var keys = keyList$1(a)
      length_1 = keys.length
      if (length_1 !== keyList$1(b).length) {
        return false
      }
      for (i = length_1; i-- !== 0; ) {
        if (!hasProp$1.call(b, keys[i])) {
          return false
        }
      }
      // end fast-deep-equal
      // Custom handling for React
      for (i = length_1; i-- !== 0; ) {
        key = keys[i]
        if (key === '_owner' && a.$$typeof) {
          // React-specific: avoid traversing React elements' _owner.
          //  _owner contains circular references
          // and is not needed when comparing the actual elements (and not their owners)
          // .$$typeof and ._store on just reasonable markers of a react element
          continue
        } else {
          // all other properties should be traversed as usual
          if (!equal(a[key], b[key])) {
            return false
          }
        }
      }
      // fast-deep-equal index.js 2.0.1
      return true
    }
    return a !== a && b !== b
  }
  // end fast-deep-equal
  var isEqual$1 = function exportedEqual(a, b) {
    try {
      return equal(a, b)
    } catch (error) {
      /* istanbul ignore next */
      if (
        (error.message && error.message.match(/stack|recursion/i)) ||
        error.number === -2146828260
      ) {
        // warn on circular references, don't crash
        // browsers give this different errors name and messages:
        // chrome/safari: "RangeError", "Maximum call stack size exceeded"
        // firefox: "InternalError", too much recursion"
        // edge: "Error", "Out of stack space"
        console.warn(
          'Warning: react-fast-compare does not handle circular references.',
          error.name,
          error.message,
        )
        return false
      }
      // some other error. we should definitely know about these
      /* istanbul ignore next */
      throw error
    }
  }

  var __assign$8 =
    (undefined && undefined.__assign) ||
    function () {
      __assign$8 =
        Object.assign ||
        function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
          }
          return t
        }
      return __assign$8.apply(this, arguments)
    }
  var clone = function (values) {
    if (Array.isArray(values)) {
      var res_1 = []
      values.forEach(function (item) {
        res_1.push(clone(item))
      })
      return res_1
    } else if (isPlainObj$1(values)) {
      if ('$$typeof' in values && '_owner' in values) {
        return values
      }
      if (values['_isAMomentObject']) {
        return values
      }
      if (values['_isJSONSchemaObject']) {
        return values
      }
      if (isFn$2(values['toJS'])) {
        return values['toJS']()
      }
      if (isFn$2(values['toJSON'])) {
        return values['toJSON']()
      }
      var res = {}
      for (var key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          res[key] = clone(values[key])
        }
      }
      return res
    } else {
      return values
    }
  }

  var has = Object.prototype.hasOwnProperty
  var toString$2 = Object.prototype.toString
  var isUndef = function (val) {
    return val === undefined
  }
  var isValid$3 = function (val) {
    return val !== undefined && val !== null
  }
  function isEmpty(val, strict) {
    if (strict === void 0) {
      strict = false
    }
    // Null and Undefined...
    if (val == null) {
      return true
    }
    // Booleans...
    if (typeof val === 'boolean') {
      return false
    }
    // Numbers...
    if (typeof val === 'number') {
      return false
    }
    // Strings...
    if (typeof val === 'string') {
      return val.length === 0
    }
    // Functions...
    if (typeof val === 'function') {
      return val.length === 0
    }
    // Arrays...
    if (Array.isArray(val)) {
      if (val.length === 0) {
        return true
      }
      for (var i = 0; i < val.length; i++) {
        if (strict) {
          if (val[i] !== undefined && val[i] !== null) {
            return false
          }
        } else {
          if (val[i] !== undefined && val[i] !== null && val[i] !== '' && val[i] !== 0) {
            return false
          }
        }
      }
      return true
    }
    // Errors...
    if (instOf(val, 'Error')) {
      return val.message === ''
    }
    // Objects...
    if (val.toString === toString$2) {
      switch (val.toString()) {
        // Maps, Sets, Files and Errors...
        case '[object File]':
        case '[object Map]':
        case '[object Set]': {
          return val.size === 0
        }
        // Plain objects...
        case '[object Object]': {
          for (var key in val) {
            if (has.call(val, key)) {
              return false
            }
          }
          return true
        }
      }
    }
    // Anything else...
    return false
  }

  /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

  var __assign$7 = function () {
    __assign$7 =
      Object.assign ||
      function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign$7.apply(this, arguments)
  }

  function __read$5(o, n) {
    var m = typeof Symbol === 'function' && o[Symbol.iterator]
    if (!m) return o
    var i = m.call(o),
      r,
      ar = [],
      e
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
    } catch (error) {
      e = { error: error }
    } finally {
      try {
        if (r && !r.done && (m = i['return'])) m.call(i)
      } finally {
        if (e) throw e.error
      }
    }
    return ar
  }

  function __spreadArray$5(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i]
    return to
  }

  /**
   * Lower case as a function.
   */
  function lowerCase(str) {
    return str.toLowerCase()
  }

  // Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
  var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g]
  // Remove all non-word characters.
  var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi
  /**
   * Normalize the string into something other libraries can manipulate easier.
   */
  function noCase(input, options) {
    if (options === void 0) {
      options = {}
    }
    var _a = options.splitRegexp,
      splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a,
      _b = options.stripRegexp,
      stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b,
      _c = options.transform,
      transform = _c === void 0 ? lowerCase : _c,
      _d = options.delimiter,
      delimiter = _d === void 0 ? ' ' : _d
    var result = replace(replace(input, splitRegexp, '$1\0$2'), stripRegexp, '\0')
    var start = 0
    var end = result.length
    // Trim the delimiter from around the output string.
    while (result.charAt(start) === '\0') start++
    while (result.charAt(end - 1) === '\0') end--
    // Transform each token independently.
    return result.slice(start, end).split('\0').map(transform).join(delimiter)
  }
  /**
   * Replace `re` in the input string with the replacement value.
   */
  function replace(input, re, value) {
    if (re instanceof RegExp) return input.replace(re, value)
    return re.reduce(function (input, re) {
      return input.replace(re, value)
    }, input)
  }

  function pascalCaseTransform(input, index) {
    var firstChar = input.charAt(0)
    var lowerChars = input.substr(1).toLowerCase()
    if (index > 0 && firstChar >= '0' && firstChar <= '9') {
      return '_' + firstChar + lowerChars
    }
    return '' + firstChar.toUpperCase() + lowerChars
  }
  function pascalCase(input, options) {
    if (options === void 0) {
      options = {}
    }
    return noCase(
      input,
      __assign$7({ delimiter: '', transform: pascalCaseTransform }, options),
    )
  }

  // ansiRegex
  var ansiRegex = function () {
    var pattern = [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))',
    ].join('|')
    return new RegExp(pattern, 'g')
  }
  // astralRegex
  var regex = '[\uD800-\uDBFF][\uDC00-\uDFFF]'
  var astralRegex = function (opts) {
    return opts && opts.exact
      ? new RegExp('^'.concat(regex, '$'))
      : new RegExp(regex, 'g')
  }
  // stripAnsi
  var stripAnsi = function (input) {
    return typeof input === 'string' ? input.replace(ansiRegex(), '') : input
  }
  var stringLength = function (input) {
    return stripAnsi(input).replace(astralRegex(), ' ').length
  }

  var __assign$6 =
    (undefined && undefined.__assign) ||
    function () {
      __assign$6 =
        Object.assign ||
        function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
          }
          return t
        }
      return __assign$6.apply(this, arguments)
    }
  var ContextType = function (flag, props) {
    return __assign$6({ flag: flag }, props)
  }
  var bracketContext = ContextType('[]')
  var bracketArrayContext = ContextType('[\\d]')
  var bracketDContext = ContextType('[[]]')
  var parenContext = ContextType('()')
  var braceContext = ContextType('{}')
  var destructorContext = ContextType('{x}')

  var __assign$5 =
    (undefined && undefined.__assign) ||
    function () {
      __assign$5 =
        Object.assign ||
        function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
          }
          return t
        }
      return __assign$5.apply(this, arguments)
    }
  var TokenType = function (flag, props) {
    return __assign$5({ flag: flag }, props)
  }
  var nameTok = TokenType('name', {
    expectNext: function (next) {
      if (this.includesContext(destructorContext)) {
        return (
          next === nameTok ||
          next === commaTok ||
          next === bracketRTok ||
          next === braceRTok ||
          next === colonTok
        )
      }
      return (
        next === dotTok ||
        next === commaTok ||
        next === eofTok ||
        next === bracketRTok ||
        next === parenRTok ||
        next === colonTok ||
        next === expandTok ||
        next === bracketLTok
      )
    },
  })
  var starTok = TokenType('*', {
    expectNext: function (next) {
      return (
        next === dotTok ||
        next === parenLTok ||
        next === bracketLTok ||
        next === eofTok ||
        next === commaTok ||
        next === parenRTok
      )
    },
  })
  var dbStarTok = TokenType('**', {
    expectNext: function (next) {
      return (
        next === dotTok ||
        next === parenLTok ||
        next === bracketLTok ||
        next === eofTok ||
        next === commaTok ||
        next === parenRTok
      )
    },
  })
  var dotTok = TokenType('.', {
    expectNext: function (next) {
      return (
        next === dotTok ||
        next === nameTok ||
        next === bracketDLTok ||
        next === starTok ||
        next === dbStarTok ||
        next === bracketLTok ||
        next === braceLTok ||
        next === eofTok
      )
    },
    expectPrev: function (prev) {
      return (
        prev === dotTok ||
        prev === nameTok ||
        prev === bracketDRTok ||
        prev === starTok ||
        prev === parenRTok ||
        prev === bracketRTok ||
        prev === expandTok ||
        prev === braceRTok
      )
    },
  })
  var bangTok = TokenType('!', {
    expectNext: function (next) {
      return next === nameTok || next === bracketDLTok
    },
  })
  var colonTok = TokenType(':', {
    expectNext: function (next) {
      if (this.includesContext(destructorContext)) {
        return next === nameTok || next === braceLTok || next === bracketLTok
      }
      return next === nameTok || next === bracketDLTok || next === bracketRTok
    },
  })
  var braceLTok = TokenType('{', {
    expectNext: function (next) {
      return next === nameTok
    },
    expectPrev: function (prev) {
      if (this.includesContext(destructorContext)) {
        return prev === colonTok || prev === commaTok || prev === bracketLTok
      }
      return prev === dotTok || prev === colonTok || prev === parenLTok
    },
    updateContext: function () {
      this.state.context.push(braceContext)
    },
  })
  var braceRTok = TokenType('}', {
    expectNext: function (next) {
      if (this.includesContext(destructorContext)) {
        return (
          next === commaTok ||
          next === braceRTok ||
          next === eofTok ||
          next === bracketRTok
        )
      }
      return next === dotTok || next === eofTok || next === commaTok
    },
    expectPrev: function (prev) {
      return prev === nameTok || prev === braceRTok || prev === bracketRTok
    },
    updateContext: function () {
      this.state.context.pop(braceContext)
    },
  })
  var bracketLTok = TokenType('[', {
    expectNext: function (next) {
      if (this.includesContext(destructorContext)) {
        return (
          next === nameTok ||
          next === bracketLTok ||
          next === braceLTok ||
          next === bracketRTok
        )
      }
      return (
        next === nameTok ||
        next === bracketDLTok ||
        next === colonTok ||
        next === bracketLTok ||
        next === ignoreTok ||
        next === bracketRTok
      )
    },
    expectPrev: function (prev) {
      if (this.includesContext(destructorContext)) {
        return prev === colonTok || prev === commaTok || prev === bracketLTok
      }
      return (
        prev === starTok ||
        prev === bracketLTok ||
        prev === dotTok ||
        prev === nameTok ||
        prev === parenLTok ||
        prev == commaTok
      )
    },
    updateContext: function () {
      this.state.context.push(bracketContext)
    },
  })
  var bracketRTok = TokenType(']', {
    expectNext: function (next) {
      if (this.includesContext(destructorContext)) {
        return (
          next === commaTok ||
          next === braceRTok ||
          next === bracketRTok ||
          next === eofTok
        )
      }
      return (
        next === dotTok ||
        next === eofTok ||
        next === commaTok ||
        next === parenRTok ||
        next === bracketRTok
      )
    },
    updateContext: function () {
      if (this.includesContext(bracketArrayContext)) return
      if (!this.includesContext(bracketContext)) throw this.unexpect()
      this.state.context.pop()
    },
  })
  var bracketDLTok = TokenType('[[', {
    updateContext: function () {
      this.state.context.push(bracketDContext)
    },
  })
  var bracketDRTok = TokenType(']]', {
    updateContext: function () {
      if (this.curContext() !== bracketDContext) throw this.unexpect()
      this.state.context.pop()
    },
  })
  var parenLTok = TokenType('(', {
    expectNext: function (next) {
      return (
        next === nameTok ||
        next === bracketDLTok ||
        next === braceLTok ||
        next === bangTok ||
        next === bracketLTok
      )
    },
    expectPrev: function (prev) {
      return prev === starTok
    },
    updateContext: function () {
      this.state.context.push(parenContext)
    },
  })
  var parenRTok = TokenType(')', {
    expectNext: function (next) {
      return next === dotTok || next === eofTok || next === commaTok || next === parenRTok
    },
    updateContext: function () {
      if (this.curContext() !== parenContext) throw this.unexpect()
      this.state.context.pop()
    },
  })
  var commaTok = TokenType(',', {
    expectNext: function (next) {
      return (
        next === nameTok ||
        next === bracketDLTok ||
        next === bracketLTok ||
        next === braceLTok
      )
    },
  })
  var ignoreTok = TokenType('ignore', {
    expectNext: function (next) {
      return next === bracketDRTok
    },
    expectPrev: function (prev) {
      return prev == bracketDLTok
    },
  })
  var expandTok = TokenType('expandTok', {
    expectNext: function (next) {
      return next === dotTok || next === eofTok || next === commaTok || next === parenRTok
    },
  })
  var eofTok = TokenType('eof')

  var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/
  var fullCharCodeAtPos = function (input, pos) {
    if (String.fromCharCode) return input.codePointAt(pos)
    var code = input.charCodeAt(pos)
    if (code <= 0xd7ff || code >= 0xe000) return code
    var next = input.charCodeAt(pos + 1)
    return (code << 10) + next - 0x35fdc00
  }
  var isRewordCode = function (code) {
    return (
      code === 42 ||
      code === 46 ||
      code === 33 ||
      code === 91 ||
      code === 93 ||
      code === 40 ||
      code === 41 ||
      code === 44 ||
      code === 58 ||
      code === 126 ||
      code === 123 ||
      code === 125
    )
  }
  var getError = function (message, props) {
    var err = new Error(message)
    Object.assign(err, props)
    return err
  }
  var slice = function (string, start, end) {
    var str = ''
    for (var i = start; i < end; i++) {
      var ch = string.charAt(i)
      if (ch !== '\\') {
        str += ch
      }
    }
    return str
  }
  var Tokenizer = /** @class */ (function () {
    function Tokenizer(input) {
      this.input = input
      this.state = {
        context: [],
        type: null,
        pos: 0,
      }
      this.type_ = null
    }
    Tokenizer.prototype.curContext = function () {
      return this.state.context[this.state.context.length - 1]
    }
    Tokenizer.prototype.includesContext = function (context) {
      for (var len = this.state.context.length - 1; len >= 0; len--) {
        if (this.state.context[len] === context) {
          return true
        }
      }
      return false
    }
    Tokenizer.prototype.unexpect = function (type) {
      type = type || this.state.type
      return getError(
        'Unexpect token "'.concat(type.flag, '" in ').concat(this.state.pos, ' char.'),
        {
          pos: this.state.pos,
        },
      )
    }
    Tokenizer.prototype.expectNext = function (type, next) {
      if (type && type.expectNext) {
        if (next && !type.expectNext.call(this, next)) {
          throw getError(
            'Unexpect token "'
              .concat(next.flag, '" token should not be behind "')
              .concat(type.flag, '" token.(')
              .concat(this.state.pos, 'th char)'),
            {
              pos: this.state.pos,
            },
          )
        }
      }
    }
    Tokenizer.prototype.expectPrev = function (type, prev) {
      if (type && type.expectPrev) {
        if (prev && !type.expectPrev.call(this, prev)) {
          throw getError(
            'Unexpect token "'
              .concat(type.flag, '" should not be behind "')
              .concat(prev.flag, '"(')
              .concat(this.state.pos, 'th char).'),
            {
              pos: this.state.pos,
            },
          )
        }
      }
    }
    Tokenizer.prototype.match = function (type) {
      return this.state.type === type
    }
    Tokenizer.prototype.skipSpace = function () {
      if (this.curContext() === bracketDContext) return
      loop: while (this.state.pos < this.input.length) {
        var ch = this.input.charCodeAt(this.state.pos)
        switch (ch) {
          case 32:
          case 160:
            ++this.state.pos
            break
          case 13:
            if (this.input.charCodeAt(this.state.pos + 1) === 10) {
              ++this.state.pos
            }
          case 10:
          case 8232:
          case 8233:
            ++this.state.pos
            break
          default:
            if (
              (ch > 8 && ch < 14) ||
              (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch)))
            ) {
              ++this.state.pos
            } else {
              break loop
            }
        }
      }
    }
    Tokenizer.prototype.next = function () {
      this.type_ = this.state.type
      if (this.input.length <= this.state.pos) {
        return this.finishToken(eofTok)
      }
      this.skipSpace()
      this.readToken(
        this.getCode(),
        this.state.pos > 0 ? this.getCode(this.state.pos - 1) : -Infinity,
      )
    }
    Tokenizer.prototype.getCode = function (pos) {
      if (pos === void 0) {
        pos = this.state.pos
      }
      return fullCharCodeAtPos(this.input, pos)
    }
    Tokenizer.prototype.eat = function (type) {
      if (this.match(type)) {
        this.next()
        return true
      } else {
        return false
      }
    }
    Tokenizer.prototype.readKeyWord = function () {
      var startPos = this.state.pos,
        string = ''
      while (true) {
        var code = this.getCode()
        var prevCode = this.getCode(this.state.pos - 1)
        if (this.input.length === this.state.pos) {
          string = slice(this.input, startPos, this.state.pos + 1)
          break
        }
        if (!isRewordCode(code) || prevCode === 92) {
          if (
            code === 32 ||
            code === 160 ||
            code === 10 ||
            code === 8232 ||
            code === 8233
          ) {
            string = slice(this.input, startPos, this.state.pos)
            break
          }
          if (code === 13 && this.input.charCodeAt(this.state.pos + 1) === 10) {
            string = slice(this.input, startPos, this.state.pos)
            break
          }
          if (
            (code > 8 && code < 14) ||
            (code >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(code)))
          ) {
            string = slice(this.input, startPos, this.state.pos)
            break
          }
          this.state.pos++
        } else {
          string = slice(this.input, startPos, this.state.pos)
          break
        }
      }
      this.finishToken(nameTok, string)
    }
    Tokenizer.prototype.readIngoreString = function () {
      var startPos = this.state.pos,
        prevCode,
        string = ''
      while (true) {
        var code = this.getCode()
        if (this.state.pos >= this.input.length) break
        if ((code === 91 || code === 93) && prevCode === 92) {
          this.state.pos++
          prevCode = ''
        } else if (code == 93 && prevCode === 93) {
          string = this.input
            .slice(startPos, this.state.pos - 1)
            .replace(/\\([\[\]])/g, '$1')
          this.state.pos++
          break
        } else {
          this.state.pos++
          prevCode = code
        }
      }
      this.finishToken(ignoreTok, string)
      this.finishToken(bracketDRTok)
    }
    Tokenizer.prototype.finishToken = function (type, value) {
      var preType = this.state.type
      this.state.type = type
      if (value !== undefined) this.state.value = value
      this.expectNext(preType, type)
      this.expectPrev(type, preType)
      if (type.updateContext) {
        type.updateContext.call(this, preType)
      }
    }
    Tokenizer.prototype.readToken = function (code, prevCode) {
      if (prevCode === 92) {
        return this.readKeyWord()
      }
      if (this.input.length <= this.state.pos) {
        this.finishToken(eofTok)
      } else if (this.curContext() === bracketDContext) {
        this.readIngoreString()
      } else if (code === 123) {
        this.state.pos++
        this.finishToken(braceLTok)
      } else if (code === 125) {
        this.state.pos++
        this.finishToken(braceRTok)
      } else if (code === 42) {
        this.state.pos++
        if (this.getCode() === 42) {
          this.state.pos++
          return this.finishToken(dbStarTok)
        }
        this.finishToken(starTok)
      } else if (code === 33) {
        this.state.pos++
        this.finishToken(bangTok)
      } else if (code === 46) {
        this.state.pos++
        this.finishToken(dotTok)
      } else if (code === 91) {
        this.state.pos++
        if (this.getCode() === 91) {
          this.state.pos++
          return this.finishToken(bracketDLTok)
        }
        this.finishToken(bracketLTok)
      } else if (code === 126) {
        this.state.pos++
        this.finishToken(expandTok)
      } else if (code === 93) {
        this.state.pos++
        this.finishToken(bracketRTok)
      } else if (code === 40) {
        this.state.pos++
        this.finishToken(parenLTok)
      } else if (code === 41) {
        this.state.pos++
        this.finishToken(parenRTok)
      } else if (code === 44) {
        this.state.pos++
        this.finishToken(commaTok)
      } else if (code === 58) {
        this.state.pos++
        this.finishToken(colonTok)
      } else {
        this.readKeyWord()
      }
    }
    return Tokenizer
  })()

  var isType$1 = function (type) {
    return function (obj) {
      return obj && obj.type === type
    }
  }
  var isIdentifier = isType$1('Identifier')
  var isIgnoreExpression = isType$1('IgnoreExpression')
  var isDotOperator = isType$1('DotOperator')
  var isWildcardOperator = isType$1('WildcardOperator')
  var isExpandOperator = isType$1('ExpandOperator')
  var isGroupExpression = isType$1('GroupExpression')
  var isRangeExpression = isType$1('RangeExpression')
  var isDestructorExpression = isType$1('DestructorExpression')
  var isObjectPattern = isType$1('ObjectPattern')
  var isArrayPattern = isType$1('ArrayPattern')

  var toString$1 = Object.prototype.toString
  var isType = function (type) {
    return function (obj) {
      return toString$1.call(obj) === '[object '.concat(type, ']')
    }
  }
  var isFn$1 = isType('Function')
  var isArr$1 = Array.isArray || isType('Array')
  var isStr = isType('String')
  var isNum = isType('Number')
  var isObj = function (val) {
    return typeof val === 'object'
  }
  var isRegExp = isType('RegExp')
  var isNumberLike = function (t) {
    return isNum(t) || /^(\d+)(\.\d+)?$/.test(t)
  }
  var isArray = isArr$1
  var keyList = Object.keys
  var hasProp = Object.prototype.hasOwnProperty
  var toArr = function (val) {
    return Array.isArray(val) ? val : val !== undefined ? [val] : []
  }
  var isEqual = function (a, b) {
    if (a === b) {
      return true
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      var arrA = isArray(a)
      var arrB = isArray(b)
      var i = void 0
      var length = void 0
      var key = void 0
      if (arrA && arrB) {
        length = a.length
        if (length !== b.length) {
          return false
        }
        for (i = length; i-- !== 0; ) {
          if (!isEqual(a[i], b[i])) {
            return false
          }
        }
        return true
      }
      if (arrA !== arrB) {
        return false
      }
      var keys = keyList(a)
      length = keys.length
      if (length !== keyList(b).length) {
        return false
      }
      for (i = length; i-- !== 0; ) {
        if (!hasProp.call(b, keys[i])) {
          return false
        }
      }
      for (i = length; i-- !== 0; ) {
        key = keys[i]
        if (!isEqual(a[key], b[key])) {
          return false
        }
      }
      return true
    }
    return a !== a && b !== b
  }
  var isSegmentEqual = function (a, b) {
    a = typeof a === 'symbol' ? a : ''.concat(a)
    b = typeof b === 'symbol' ? b : ''.concat(b)
    return a === b
  }

  var DestructorCache = new Map()
  var isValid$2 = function (val) {
    return val !== undefined && val !== null
  }
  var getDestructor = function (source) {
    return DestructorCache.get(source)
  }
  var setDestructor = function (source, rules) {
    DestructorCache.set(source, rules)
  }
  var parseDestructorRules = function (node) {
    var rules = []
    if (isObjectPattern(node)) {
      var index_1 = 0
      node.properties.forEach(function (child) {
        rules[index_1] = {
          path: [],
        }
        rules[index_1].key = child.key.value
        rules[index_1].path.push(child.key.value)
        if (isIdentifier(child.value)) {
          rules[index_1].key = child.value.value
        }
        var basePath = rules[index_1].path
        var childRules = parseDestructorRules(child.value)
        var k = index_1
        childRules.forEach(function (rule) {
          if (rules[k]) {
            rules[k].key = rule.key
            rules[k].path = basePath.concat(rule.path)
          } else {
            rules[k] = {
              key: rule.key,
              path: basePath.concat(rule.path),
            }
          }
          k++
        })
        if (k > index_1) {
          index_1 = k
        } else {
          index_1++
        }
      })
      return rules
    } else if (isArrayPattern(node)) {
      var index_2 = 0
      node.elements.forEach(function (child, key) {
        rules[index_2] = {
          path: [],
        }
        rules[index_2].key = key
        rules[index_2].path.push(key)
        if (isIdentifier(child)) {
          rules[index_2].key = child.value
        }
        var basePath = rules[index_2].path
        var childRules = parseDestructorRules(child)
        var k = index_2
        childRules.forEach(function (rule) {
          if (rules[k]) {
            rules[k].key = rule.key
            rules[k].path = basePath.concat(rule.path)
          } else {
            rules[k] = {
              key: rule.key,
              path: basePath.concat(rule.path),
            }
          }
          k++
        })
        if (k > index_2) {
          index_2 = k
        } else {
          index_2++
        }
      })
      return rules
    }
    if (isDestructorExpression(node)) {
      return parseDestructorRules(node.value)
    }
    return rules
  }
  var setInByDestructor = function (source, rules, value, mutators) {
    rules.forEach(function (_a) {
      var key = _a.key,
        path = _a.path
      mutators.setIn([key], source, mutators.getIn(path, value))
    })
  }
  var getInByDestructor = function (source, rules, mutators) {
    var response = {}
    if (rules.length) {
      if (isNum(rules[0].path[0])) {
        response = []
      }
    }
    source = isValid$2(source) ? source : {}
    rules.forEach(function (_a) {
      var key = _a.key,
        path = _a.path
      mutators.setIn(path, response, source[key])
    })
    return response
  }
  var deleteInByDestructor = function (source, rules, mutators) {
    rules.forEach(function (_a) {
      var key = _a.key
      mutators.deleteIn([key], source)
    })
  }
  var existInByDestructor = function (source, rules, start, mutators) {
    return rules.every(function (_a) {
      var key = _a.key
      return mutators.existIn([key], source, start)
    })
  }

  var __extends$5 =
    (undefined && undefined.__extends) ||
    (function () {
      var extendStatics = function (d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (d, b) {
              d.__proto__ = b
            }) ||
          function (d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
          }
        return extendStatics(d, b)
      }
      return function (d, b) {
        if (typeof b !== 'function' && b !== null)
          throw new TypeError(
            'Class extends value ' + String(b) + ' is not a constructor or null',
          )
        extendStatics(d, b)
        function __() {
          this.constructor = d
        }
        d.prototype =
          b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
      }
    })()
  var createTreeBySegments = function (segments, afterNode) {
    if (segments === void 0) {
      segments = []
    }
    var segLen = segments.length
    var build = function (start) {
      if (start === void 0) {
        start = 0
      }
      var after = start < segLen - 1 ? build(start + 1) : afterNode
      var dot = after && {
        type: 'DotOperator',
        after: after,
      }
      return {
        type: 'Identifier',
        value: segments[start],
        after: dot,
      }
    }
    return build()
  }
  var calculate = function (a, b, operator) {
    if (isNumberLike(a) && isNumberLike(b)) {
      if (operator === '+') return String(Number(a) + Number(b))
      if (operator === '-') return String(Number(a) - Number(b))
      if (operator === '*') return String(Number(a) * Number(b))
      if (operator === '/') return String(Number(a) / Number(b))
    } else {
      if (operator === '+') return String(a) + String(b)
      if (operator === '-') return 'NaN'
      if (operator === '*') return 'NaN'
      if (operator === '/') return 'NaN'
    }
    return String(Number(b))
  }
  var Parser = /** @class */ (function (_super) {
    __extends$5(Parser, _super)
    function Parser(input, base) {
      var _this = _super.call(this, input) || this
      _this.isMatchPattern = false
      _this.isWildMatchPattern = false
      _this.haveExcludePattern = false
      _this.haveRelativePattern = false
      _this.base = base
      return _this
    }
    Parser.prototype.parse = function () {
      var node
      this.data = {
        segments: [],
      }
      if (!this.eat(eofTok)) {
        this.next()
        node = this.parseAtom(this.state.type)
      }
      this.data.tree = node
      return node
    }
    Parser.prototype.append = function (parent, node) {
      if (parent && node) {
        parent.after = node
      }
    }
    Parser.prototype.parseAtom = function (type) {
      switch (type) {
        case braceLTok:
        case bracketLTok:
          if (this.includesContext(destructorContext)) {
            if (type === braceLTok) {
              return this.parseObjectPattern()
            } else {
              return this.parseArrayPattern()
            }
          }
          return this.parseDestructorExpression()
        case nameTok:
          return this.parseIdentifier()
        case expandTok:
          return this.parseExpandOperator()
        case dbStarTok:
        case starTok:
          return this.parseWildcardOperator()
        case bracketDLTok:
          return this.parseIgnoreExpression()
        case dotTok:
          return this.parseDotOperator()
      }
    }
    Parser.prototype.pushSegments = function (key) {
      this.data.segments.push(key)
    }
    Parser.prototype.parseIdentifier = function () {
      var node = {
        type: 'Identifier',
        value: this.state.value,
      }
      var hasNotInDestructor =
        !this.includesContext(destructorContext) &&
        !this.isMatchPattern &&
        !this.isWildMatchPattern
      this.next()
      if (this.includesContext(bracketArrayContext)) {
        if (this.state.type !== bracketRTok) {
          throw this.unexpect()
        } else {
          this.state.context.pop()
          this.next()
        }
      } else if (hasNotInDestructor) {
        this.pushSegments(node.value)
      }
      if (this.state.type === bracketLTok) {
        this.next()
        if (this.state.type !== nameTok) {
          throw this.unexpect()
        }
        this.state.context.push(bracketArrayContext)
        var isNumberKey = false
        if (/^\d+$/.test(this.state.value)) {
          isNumberKey = true
        }
        var value = this.state.value
        this.pushSegments(isNumberKey ? Number(value) : value)
        var after = this.parseAtom(this.state.type)
        if (isNumberKey) {
          after.arrayIndex = true
        }
        this.append(node, after)
      } else {
        this.append(node, this.parseAtom(this.state.type))
      }
      return node
    }
    Parser.prototype.parseExpandOperator = function () {
      var node = {
        type: 'ExpandOperator',
      }
      this.isMatchPattern = true
      this.isWildMatchPattern = true
      this.data.segments = []
      this.next()
      this.append(node, this.parseAtom(this.state.type))
      return node
    }
    Parser.prototype.parseWildcardOperator = function () {
      var node = {
        type: 'WildcardOperator',
      }
      if (this.state.type === dbStarTok) {
        node.optional = true
      }
      this.isMatchPattern = true
      this.isWildMatchPattern = true
      this.data.segments = []
      this.next()
      if (this.state.type === parenLTok) {
        node.filter = this.parseGroupExpression(node)
      } else if (this.state.type === bracketLTok) {
        node.filter = this.parseRangeExpression(node)
      }
      this.append(node, this.parseAtom(this.state.type))
      return node
    }
    Parser.prototype.parseDestructorExpression = function () {
      var _this = this
      var node = {
        type: 'DestructorExpression',
      }
      this.state.context.push(destructorContext)
      var startPos = this.state.pos - 1
      node.value =
        this.state.type === braceLTok
          ? this.parseObjectPattern()
          : this.parseArrayPattern()
      var endPos = this.state.pos
      this.state.context.pop()
      node.source = this.input
        .substring(startPos, endPos)
        .replace(
          /\[\s*([\+\-\*\/])?\s*([^,\]\s]*)\s*\]/,
          function (match, operator, target) {
            if (_this.relative !== undefined) {
              if (operator) {
                if (target) {
                  return calculate(_this.relative, target, operator)
                } else {
                  return calculate(_this.relative, 1, operator)
                }
              } else {
                if (target) {
                  return calculate(_this.relative, target, '+')
                } else {
                  return String(_this.relative)
                }
              }
            }
            return match
          },
        )
        .replace(/\s*\.\s*/g, '')
        .replace(/\s*/g, '')
      if (this.relative === undefined) {
        setDestructor(node.source, parseDestructorRules(node))
      }
      this.relative = undefined
      this.pushSegments(node.source)
      this.next()
      this.append(node, this.parseAtom(this.state.type))
      return node
    }
    Parser.prototype.parseArrayPattern = function () {
      var node = {
        type: 'ArrayPattern',
        elements: [],
      }
      this.next()
      node.elements = this.parseArrayPatternElements()
      return node
    }
    Parser.prototype.parseArrayPatternElements = function () {
      var nodes = []
      while (this.state.type !== bracketRTok && this.state.type !== eofTok) {
        nodes.push(this.parseAtom(this.state.type))
        if (this.state.type === bracketRTok) {
          if (this.includesContext(destructorContext)) {
            this.next()
          }
          return nodes
        }
        this.next()
      }
      return nodes
    }
    Parser.prototype.parseObjectPattern = function () {
      var node = {
        type: 'ObjectPattern',
        properties: [],
      }
      this.next()
      node.properties = this.parseObjectProperties()
      return node
    }
    Parser.prototype.parseObjectProperties = function () {
      var nodes = []
      while (this.state.type !== braceRTok && this.state.type !== eofTok) {
        var node = {
          type: 'ObjectPatternProperty',
          key: this.parseAtom(this.state.type),
        }
        nodes.push(node)
        if (this.state.type === colonTok) {
          this.next()
          node.value = this.parseAtom(this.state.type)
        }
        if (this.state.type === braceRTok) {
          if (this.includesContext(destructorContext)) {
            this.next()
          }
          return nodes
        }
        this.next()
      }
      return nodes
    }
    Parser.prototype.parseDotOperator = function () {
      var node = {
        type: 'DotOperator',
      }
      var prevToken = this.type_
      if (!prevToken && this.base) {
        if (this.base.isMatchPattern) {
          throw new Error('Base path must be an absolute path.')
        }
        this.data.segments = this.base.toArr()
        while (this.state.type === dotTok) {
          this.relative = this.data.segments.pop()
          this.haveRelativePattern = true
          this.next()
        }
        return createTreeBySegments(
          this.data.segments.slice(),
          this.parseAtom(this.state.type),
        )
      } else {
        this.next()
      }
      this.append(node, this.parseAtom(this.state.type))
      return node
    }
    Parser.prototype.parseIgnoreExpression = function () {
      this.next()
      var value = String(this.state.value).replace(/\s*/g, '')
      var node = {
        type: 'IgnoreExpression',
        value: value,
      }
      this.pushSegments(value)
      this.next()
      this.append(node, this.parseAtom(this.state.type))
      this.next()
      return node
    }
    Parser.prototype.parseGroupExpression = function (parent) {
      var node = {
        type: 'GroupExpression',
        value: [],
      }
      this.isMatchPattern = true
      this.data.segments = []
      this.next()
      loop: while (true) {
        switch (this.state.type) {
          case commaTok:
            this.next()
            break
          case bangTok:
            node.isExclude = true
            this.haveExcludePattern = true
            this.next()
            break
          case eofTok:
            break loop
          case parenRTok:
            break loop
          default:
            node.value.push(this.parseAtom(this.state.type))
        }
      }
      this.next()
      this.append(parent, this.parseAtom(this.state.type))
      return node
    }
    Parser.prototype.parseRangeExpression = function (parent) {
      var node = {
        type: 'RangeExpression',
      }
      this.next()
      this.isMatchPattern = true
      this.data.segments = []
      var start = false,
        hasColon = false
      loop: while (true) {
        switch (this.state.type) {
          case colonTok:
            hasColon = true
            start = true
            this.next()
            break
          case bracketRTok:
            if (!hasColon && !node.end) {
              node.end = node.start
            }
            break loop
          case commaTok:
            throw this.unexpect()
          case eofTok:
            break loop
          default:
            if (!start) {
              node.start = this.parseAtom(this.state.type)
            } else {
              node.end = this.parseAtom(this.state.type)
            }
        }
      }
      this.next()
      this.append(parent, this.parseAtom(this.state.type))
      return node
    }
    return Parser
  })(Tokenizer)

  var Matcher = /** @class */ (function () {
    function Matcher(tree, record) {
      this.tree = tree
      this.stack = []
      this.excluding = false
      this.wildcards = []
      this.record = record
    }
    Matcher.prototype.next = function (node, pos) {
      var isLastToken = pos === this.path.length - 1
      //  const isOverToken = pos > this.path.length
      if (node.after) {
        // if (isOverToken) {
        //   return false
        // }
        return this.matchNode(node.after, pos)
      }
      if (isWildcardOperator(node) && !node.filter) {
        if (this.excluding) {
          return false
        } else {
          if (pos === 0 || node.optional) return true
          return !!this.take(pos)
        }
      }
      if (isLastToken) {
        return !!this.take(pos)
      } else {
        var wildcard = this.wildcards.pop()
        if (wildcard && wildcard.after) {
          return this.next(wildcard, pos)
        }
      }
      return false
    }
    Matcher.prototype.shot = function () {
      var _a
      if (((_a = this.record) === null || _a === void 0 ? void 0 : _a.score) >= 0) {
        this.record.score++
      }
    }
    Matcher.prototype.take = function (pos) {
      var _a
      return String((_a = this.path[pos]) !== null && _a !== void 0 ? _a : '')
    }
    Matcher.prototype.matchExcludeIdentifier = function (matched, node, pos) {
      var isLastToken = pos === this.path.length - 1
      var isContainToken = pos < this.path.length
      if (!node.after) {
        this.excluding = false
      }
      if (matched) {
        if (node.after) {
          return this.next(node, pos)
        }
        if (isLastToken) {
          return false
        }
      }
      if (isLastToken) {
        return true
      }
      return isContainToken
    }
    Matcher.prototype.matchIdentifier = function (node, pos) {
      var current = this.take(pos)
      var matched = false
      if (isExpandOperator(node.after)) {
        if (current.indexOf(node.value) === 0) {
          this.shot()
          matched = true
        }
        if (this.excluding) {
          return this.matchExcludeIdentifier(matched, node.after, pos)
        } else {
          return matched && this.next(node.after, pos)
        }
      } else if (current === node.value) {
        this.shot()
        matched = true
      }
      if (this.excluding) {
        return this.matchExcludeIdentifier(matched, node, pos)
      } else {
        return matched && this.next(node, pos)
      }
    }
    Matcher.prototype.matchIgnoreExpression = function (node, pos) {
      return isEqual(node.value, this.take(pos)) && this.next(node, pos)
    }
    Matcher.prototype.matchDestructorExpression = function (node, pos) {
      return isEqual(node.source, this.take(pos)) && this.next(node, pos)
    }
    Matcher.prototype.matchExpandOperator = function (node, pos) {
      return this.next(node, pos)
    }
    Matcher.prototype.matchWildcardOperator = function (node, pos) {
      var matched = false
      if (node.filter) {
        this.stack.push(node)
        matched = this.matchNode(node.filter, pos)
        this.stack.pop()
      } else {
        matched = this.next(node, pos)
      }
      return matched
    }
    Matcher.prototype.matchGroupExpression = function (node, pos) {
      var _this = this
      var excluding = false
      if (node.isExclude) {
        excluding = !this.excluding
      }
      return toArr(node.value)[excluding ? 'every' : 'some'](function (item) {
        _this.wildcards = _this.stack.slice()
        _this.excluding = excluding
        return _this.matchNode(item, pos)
      })
    }
    Matcher.prototype.matchRangeExpression = function (node, pos) {
      var current = Number(this.take(pos))
      if (node.start) {
        if (node.end) {
          return current >= Number(node.start.value) && current <= Number(node.end.value)
        } else {
          return current >= Number(node.start.value)
        }
      } else {
        if (node.end) {
          return current <= Number(node.end.value)
        } else {
          this.wildcards = this.stack.slice()
          return this.next(node, pos)
        }
      }
    }
    Matcher.prototype.matchNode = function (node, pos) {
      if (pos === void 0) {
        pos = 0
      }
      if (isDotOperator(node)) {
        return this.next(node, pos + 1)
      } else if (isIdentifier(node)) {
        return this.matchIdentifier(node, pos)
      } else if (isIgnoreExpression(node)) {
        return this.matchIgnoreExpression(node, pos)
      } else if (isDestructorExpression(node)) {
        return this.matchDestructorExpression(node, pos)
      } else if (isExpandOperator(node)) {
        return this.matchExpandOperator(node, pos)
      } else if (isWildcardOperator(node)) {
        return this.matchWildcardOperator(node, pos)
      } else if (isGroupExpression(node)) {
        return this.matchGroupExpression(node, pos)
      } else if (isRangeExpression(node)) {
        return this.matchRangeExpression(node, pos)
      }
      return false
    }
    Matcher.prototype.match = function (path) {
      this.path = path
      return { matched: this.matchNode(this.tree), record: this.record }
    }
    Matcher.matchSegments = function (source, target, record) {
      if (source.length !== target.length) return { matched: false, record: record }
      var match = function (pos) {
        if (pos === void 0) {
          pos = 0
        }
        var current = isSegmentEqual(source[pos], target[pos])
        if ((record === null || record === void 0 ? void 0 : record.score) >= 0) {
          record.score++
        }
        return current && (pos < source.length - 1 ? match(pos + 1) : true)
      }
      return { matched: match(), record: record }
    }
    return Matcher
  })()

  var __read$4 =
    (undefined && undefined.__read) ||
    function (o, n) {
      var m = typeof Symbol === 'function' && o[Symbol.iterator]
      if (!m) return o
      var i = m.call(o),
        r,
        ar = [],
        e
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
      } catch (error) {
        e = { error: error }
      } finally {
        try {
          if (r && !r.done && (m = i['return'])) m.call(i)
        } finally {
          if (e) throw e.error
        }
      }
      return ar
    }
  var __spreadArray$4 =
    (undefined && undefined.__spreadArray) ||
    function (to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i)
            ar[i] = from[i]
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from))
    }
  var pathCache = new Map()
  var isMatcher = Symbol('PATH_MATCHER')
  var isValid$1 = function (val) {
    return val !== undefined && val !== null
  }
  var isSimplePath = function (val) {
    return (
      val.indexOf('*') === -1 &&
      val.indexOf('~') === -1 &&
      val.indexOf('[') === -1 &&
      val.indexOf(']') === -1 &&
      val.indexOf(',') === -1 &&
      val.indexOf(':') === -1 &&
      val.indexOf(' ') === -1 &&
      val[0] !== '.'
    )
  }
  var isAssignable = function (val) {
    return typeof val === 'object' || typeof val === 'function'
  }
  var isNumberIndex = function (val) {
    return isStr(val) ? /^\d+$/.test(val) : isNum(val)
  }
  var getIn$1 = function (segments, source) {
    for (var i = 0; i < segments.length; i++) {
      var index = segments[i]
      var rules = getDestructor(index)
      if (!rules) {
        if (!isValid$1(source)) {
          if (i !== segments.length - 1) {
            return source
          }
          break
        }
        source = source[index]
      } else {
        source = getInByDestructor(source, rules, { setIn: setIn, getIn: getIn$1 })
        break
      }
    }
    return source
  }
  var setIn = function (segments, source, value) {
    for (var i = 0; i < segments.length; i++) {
      var index = segments[i]
      var rules = getDestructor(index)
      if (!rules) {
        if (!isValid$1(source) || !isAssignable(source)) return
        if (isArr$1(source) && !isNumberIndex(index)) {
          return
        }
        if (!isValid$1(source[index])) {
          if (value === undefined) {
            if (source[index] === null) source[index] = value
            return
          }
          if (i < segments.length - 1) {
            source[index] = isNum(segments[i + 1]) ? [] : {}
          }
        }
        if (i === segments.length - 1) {
          source[index] = value
        }
        source = source[index]
      } else {
        setInByDestructor(source, rules, value, { setIn: setIn, getIn: getIn$1 })
        break
      }
    }
  }
  var deleteIn = function (segments, source) {
    for (var i = 0; i < segments.length; i++) {
      var index = segments[i]
      var rules = getDestructor(index)
      if (!rules) {
        if (i === segments.length - 1 && isValid$1(source)) {
          delete source[index]
          return
        }
        if (!isValid$1(source) || !isAssignable(source)) return
        source = source[index]
        if (!isObj(source)) {
          return
        }
      } else {
        deleteInByDestructor(source, rules, {
          setIn: setIn,
          getIn: getIn$1,
          deleteIn: deleteIn,
        })
        break
      }
    }
  }
  var hasOwnProperty$4 = Object.prototype.hasOwnProperty
  var existIn = function (segments, source, start) {
    if (start instanceof Path) {
      start = start.length
    }
    for (var i = start; i < segments.length; i++) {
      var index = segments[i]
      var rules = getDestructor(index)
      if (!rules) {
        if (i === segments.length - 1) {
          return hasOwnProperty$4.call(source, index)
        }
        if (!isValid$1(source) || !isAssignable(source)) return false
        source = source[index]
        if (!isObj(source)) {
          return false
        }
      } else {
        return existInByDestructor(source, rules, start, {
          setIn: setIn,
          getIn: getIn$1,
          deleteIn: deleteIn,
          existIn: existIn,
        })
      }
    }
  }
  var parse = function (pattern, base) {
    if (pattern instanceof Path) {
      return {
        entire: pattern.entire,
        segments: pattern.segments.slice(),
        isRegExp: false,
        haveRelativePattern: pattern.haveRelativePattern,
        isWildMatchPattern: pattern.isWildMatchPattern,
        isMatchPattern: pattern.isMatchPattern,
        haveExcludePattern: pattern.haveExcludePattern,
        tree: pattern.tree,
      }
    } else if (isStr(pattern)) {
      if (!pattern) {
        return {
          entire: '',
          segments: [],
          isRegExp: false,
          isWildMatchPattern: false,
          haveExcludePattern: false,
          isMatchPattern: false,
        }
      }
      if (isSimplePath(pattern)) {
        return {
          entire: pattern,
          segments: pattern.split('.'),
          isRegExp: false,
          isWildMatchPattern: false,
          haveExcludePattern: false,
          isMatchPattern: false,
        }
      }
      var parser = new Parser(pattern, Path.parse(base))
      var tree = parser.parse()
      if (!parser.isMatchPattern) {
        var segments = parser.data.segments
        return {
          entire: segments.join('.'),
          segments: segments,
          tree: tree,
          isRegExp: false,
          haveRelativePattern: parser.haveRelativePattern,
          isWildMatchPattern: false,
          haveExcludePattern: false,
          isMatchPattern: false,
        }
      } else {
        return {
          entire: pattern,
          segments: [],
          isRegExp: false,
          haveRelativePattern: false,
          isWildMatchPattern: parser.isWildMatchPattern,
          haveExcludePattern: parser.haveExcludePattern,
          isMatchPattern: true,
          tree: tree,
        }
      }
    } else if (isFn$1(pattern) && pattern[isMatcher]) {
      return parse(pattern['path'])
    } else if (isArr$1(pattern)) {
      return {
        entire: pattern.join('.'),
        segments: pattern.reduce(function (buf, key) {
          return buf.concat(parseString(key))
        }, []),
        isRegExp: false,
        haveRelativePattern: false,
        isWildMatchPattern: false,
        haveExcludePattern: false,
        isMatchPattern: false,
      }
    } else if (isRegExp(pattern)) {
      return {
        entire: pattern,
        segments: [],
        isRegExp: true,
        haveRelativePattern: false,
        isWildMatchPattern: false,
        haveExcludePattern: false,
        isMatchPattern: true,
      }
    } else {
      return {
        entire: '',
        isRegExp: false,
        segments: pattern !== undefined ? [pattern] : [],
        haveRelativePattern: false,
        isWildMatchPattern: false,
        haveExcludePattern: false,
        isMatchPattern: false,
      }
    }
  }
  var parseString = function (source) {
    if (isStr(source)) {
      source = source.replace(/\s*/g, '')
      try {
        var _a = parse(source),
          segments = _a.segments,
          isMatchPattern = _a.isMatchPattern
        return !isMatchPattern ? segments : source
      } catch (e) {
        return source
      }
    } else if (source instanceof Path) {
      return source.segments
    }
    return source
  }
  var Path = /** @class */ (function () {
    function Path(input, base) {
      var _this = this
      this.concat = function () {
        var _a
        var args = []
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i]
        }
        if (_this.isMatchPattern || _this.isRegExp) {
          throw new Error(''.concat(_this.entire, ' cannot be concat'))
        }
        var path = new Path('')
        path.segments = (_a = _this.segments).concat.apply(
          _a,
          __spreadArray$4(
            [],
            __read$4(
              args.map(function (s) {
                return parseString(s)
              }),
            ),
            false,
          ),
        )
        path.entire = path.segments.join('.')
        return path
      }
      this.slice = function (start, end) {
        if (_this.isMatchPattern || _this.isRegExp) {
          throw new Error(''.concat(_this.entire, ' cannot be slice'))
        }
        var path = new Path('')
        path.segments = _this.segments.slice(start, end)
        path.entire = path.segments.join('.')
        return path
      }
      this.push = function () {
        var items = []
        for (var _i = 0; _i < arguments.length; _i++) {
          items[_i] = arguments[_i]
        }
        return _this.concat.apply(_this, __spreadArray$4([], __read$4(items), false))
      }
      this.pop = function () {
        if (_this.isMatchPattern || _this.isRegExp) {
          throw new Error(''.concat(_this.entire, ' cannot be pop'))
        }
        return new Path(_this.segments.slice(0, _this.segments.length - 1))
      }
      this.splice = function (start, deleteCount) {
        var items = []
        for (var _i = 2; _i < arguments.length; _i++) {
          items[_i - 2] = arguments[_i]
        }
        if (_this.isMatchPattern || _this.isRegExp) {
          throw new Error(''.concat(_this.entire, ' cannot be splice'))
        }
        items = items.reduce(function (buf, item) {
          return buf.concat(parseString(item))
        }, [])
        var segments_ = _this.segments.slice()
        segments_.splice.apply(
          segments_,
          __spreadArray$4([start, deleteCount], __read$4(items), false),
        )
        return new Path(segments_)
      }
      this.forEach = function (callback) {
        if (_this.isMatchPattern || _this.isRegExp) {
          throw new Error(''.concat(_this.entire, ' cannot be each'))
        }
        _this.segments.forEach(callback)
      }
      this.map = function (callback) {
        if (_this.isMatchPattern || _this.isRegExp) {
          throw new Error(''.concat(_this.entire, ' cannot be map'))
        }
        return _this.segments.map(callback)
      }
      this.reduce = function (callback, initial) {
        if (_this.isMatchPattern || _this.isRegExp) {
          throw new Error(''.concat(_this.entire, ' cannot be reduce'))
        }
        return _this.segments.reduce(callback, initial)
      }
      this.parent = function () {
        return _this.slice(0, _this.length - 1)
      }
      this.includes = function (pattern) {
        var _a = Path.parse(pattern),
          entire = _a.entire,
          segments = _a.segments,
          isMatchPattern = _a.isMatchPattern
        var cache = _this.includesCache.get(entire)
        if (cache !== undefined) return cache
        var cacheWith = function (value) {
          _this.includesCache.set(entire, value)
          return value
        }
        if (_this.isMatchPattern) {
          if (!isMatchPattern) {
            return cacheWith(_this.match(segments))
          } else {
            throw new Error(
              ''.concat(_this.entire, ' cannot be used to match ').concat(entire),
            )
          }
        }
        if (isMatchPattern) {
          throw new Error(
            ''.concat(_this.entire, ' cannot be used to match ').concat(entire),
          )
        }
        if (segments.length > _this.segments.length) return cacheWith(false)
        for (var i = 0; i < segments.length; i++) {
          if (!isEqual(String(segments[i]), String(_this.segments[i]))) {
            return cacheWith(false)
          }
        }
        return cacheWith(true)
      }
      this.transform = function (regexp, callback) {
        if (!isFn$1(callback)) return ''
        if (_this.isMatchPattern) {
          throw new Error(''.concat(_this.entire, ' cannot be transformed'))
        }
        var args = _this.segments.reduce(function (buf, key) {
          return new RegExp(regexp).test(key) ? buf.concat(key) : buf
        }, [])
        return callback.apply(void 0, __spreadArray$4([], __read$4(args), false))
      }
      this.match = function (pattern) {
        var _a, _b
        var path = Path.parse(pattern)
        var cache = _this.matchCache.get(path.entire)
        if (cache !== undefined) {
          if (cache.record && cache.record.score !== undefined) {
            _this.matchScore = cache.record.score
          }
          return cache.matched
        }
        var cacheWith = function (value) {
          _this.matchCache.set(path.entire, value)
          return value
        }
        if (path.isMatchPattern) {
          if (_this.isMatchPattern) {
            throw new Error(''.concat(path.entire, ' cannot match ').concat(_this.entire))
          } else {
            _this.matchScore = 0
            return cacheWith(path.match(_this.segments))
          }
        } else {
          if (_this.isMatchPattern) {
            if (_this.isRegExp) {
              try {
                return (_b =
                  (_a = _this['entire']) === null || _a === void 0
                    ? void 0
                    : _a['test']) === null || _b === void 0
                  ? void 0
                  : _b.call(_a, path.entire)
              } finally {
                _this.entire.lastIndex = 0
              }
            }
            var record = {
              score: 0,
            }
            var result = cacheWith(new Matcher(_this.tree, record).match(path.segments))
            _this.matchScore = record.score
            return result.matched
          } else {
            var record = {
              score: 0,
            }
            var result = cacheWith(
              Matcher.matchSegments(_this.segments, path.segments, record),
            )
            _this.matchScore = record.score
            return result.matched
          }
        }
      }
      //别名组匹配
      this.matchAliasGroup = function (name, alias) {
        var namePath = Path.parse(name)
        var aliasPath = Path.parse(alias)
        var nameMatched = _this.match(namePath)
        var nameMatchedScore = _this.matchScore
        var aliasMatched = _this.match(aliasPath)
        var aliasMatchedScore = _this.matchScore
        if (_this.haveExcludePattern) {
          if (nameMatchedScore >= aliasMatchedScore) {
            return nameMatched
          } else {
            return aliasMatched
          }
        } else {
          return nameMatched || aliasMatched
        }
      }
      this.existIn = function (source, start) {
        if (start === void 0) {
          start = 0
        }
        return existIn(_this.segments, source, start)
      }
      this.getIn = function (source) {
        return getIn$1(_this.segments, source)
      }
      this.setIn = function (source, value) {
        setIn(_this.segments, source, value)
        return source
      }
      this.deleteIn = function (source) {
        deleteIn(_this.segments, source)
        return source
      }
      this.ensureIn = function (source, defaults) {
        var results = _this.getIn(source)
        if (results === undefined) {
          _this.setIn(source, defaults)
          return _this.getIn(source)
        }
        return results
      }
      var _a = parse(input, base),
        tree = _a.tree,
        segments = _a.segments,
        entire = _a.entire,
        isRegExp = _a.isRegExp,
        isMatchPattern = _a.isMatchPattern,
        isWildMatchPattern = _a.isWildMatchPattern,
        haveRelativePattern = _a.haveRelativePattern,
        haveExcludePattern = _a.haveExcludePattern
      this.entire = entire
      this.segments = segments
      this.isMatchPattern = isMatchPattern
      this.isWildMatchPattern = isWildMatchPattern
      this.haveRelativePattern = haveRelativePattern
      this.isRegExp = isRegExp
      this.haveExcludePattern = haveExcludePattern
      this.tree = tree
      this.matchCache = new Map()
      this.includesCache = new Map()
    }
    Path.prototype.toString = function () {
      var _a
      return (_a = this.entire) === null || _a === void 0 ? void 0 : _a.toString()
    }
    Path.prototype.toArr = function () {
      var _a
      return (_a = this.segments) === null || _a === void 0 ? void 0 : _a.slice()
    }
    Object.defineProperty(Path.prototype, 'length', {
      get: function () {
        return this.segments.length
      },
      enumerable: false,
      configurable: true,
    })
    Path.match = function (pattern) {
      var path = Path.parse(pattern)
      var matcher = function (target) {
        return path.match(target)
      }
      matcher[isMatcher] = true
      matcher.path = path
      return matcher
    }
    Path.isPathPattern = function (target) {
      if (
        isStr(target) ||
        isArr$1(target) ||
        isRegExp(target) ||
        (isFn$1(target) && target[isMatcher])
      ) {
        return true
      }
      return false
    }
    Path.transform = function (pattern, regexp, callback) {
      return Path.parse(pattern).transform(regexp, callback)
    }
    Path.parse = function (path, base) {
      if (path === void 0) {
        path = ''
      }
      if (path instanceof Path) {
        var found = pathCache.get(path.entire)
        if (found) {
          return found
        } else {
          pathCache.set(path.entire, path)
          return path
        }
      } else if (path && path[isMatcher]) {
        return Path.parse(path['path'])
      } else {
        var key_ = base ? Path.parse(base) : ''
        var key = ''.concat(path, ':').concat(key_)
        var found = pathCache.get(key)
        if (found) {
          return found
        } else {
          path = new Path(path, base)
          pathCache.set(key, path)
          return path
        }
      }
    }
    Path.getIn = function (source, pattern) {
      var path = Path.parse(pattern)
      return path.getIn(source)
    }
    Path.setIn = function (source, pattern, value) {
      var path = Path.parse(pattern)
      return path.setIn(source, value)
    }
    Path.deleteIn = function (source, pattern) {
      var path = Path.parse(pattern)
      return path.deleteIn(source)
    }
    Path.existIn = function (source, pattern, start) {
      var path = Path.parse(pattern)
      return path.existIn(source, start)
    }
    Path.ensureIn = function (source, pattern, defaultValue) {
      var path = Path.parse(pattern)
      return path.ensureIn(source, defaultValue)
    }
    return Path
  })()

  var Subscribable = /** @class */ (function () {
    function Subscribable() {
      var _this = this
      this.subscribers = {
        index: 0,
      }
      this.subscribe = function (callback) {
        if (isFn$2(callback)) {
          var index = _this.subscribers.index + 1
          _this.subscribers[index] = callback
          _this.subscribers.index++
          return index
        }
      }
      this.unsubscribe = function (index) {
        if (_this.subscribers[index]) {
          delete _this.subscribers[index]
        } else if (!index) {
          _this.subscribers = {
            index: 0,
          }
        }
      }
      this.notify = function (payload, silent) {
        if (_this.subscription) {
          if (_this.subscription && isFn$2(_this.subscription.notify)) {
            if (_this.subscription.notify.call(_this, payload) === false) {
              return
            }
          }
        }
        if (silent) return
        var filter = function (payload) {
          if (_this.subscription && isFn$2(_this.subscription.filter)) {
            return _this.subscription.filter.call(_this, payload)
          }
          return payload
        }
        each(_this.subscribers, function (callback) {
          if (isFn$2(callback)) callback(filter(payload))
        })
      }
    }
    return Subscribable
  })()

  function defaultIsMergeableObject(value) {
    return isNonNullObject(value) && !isSpecial(value)
  }
  function isNonNullObject(value) {
    return !!value && typeof value === 'object'
  }
  function isSpecial(value) {
    if ('$$typeof' in value && '_owner' in value) {
      return true
    }
    if (value['_isAMomentObject']) {
      return true
    }
    if (value['_isJSONSchemaObject']) {
      return true
    }
    if (isFn$2(value['toJS'])) {
      return true
    }
    if (isFn$2(value['toJSON'])) {
      return true
    }
    return !isPlainObj$1(value)
  }
  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
  }
  function cloneUnlessOtherwiseSpecified(value, options) {
    if (options.clone !== false && options.isMergeableObject(value)) {
      return deepmerge(emptyTarget(value), value, options)
    }
    return value
  }
  function defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function (element) {
      return cloneUnlessOtherwiseSpecified(element, options)
    })
  }
  function getMergeFunction(key, options) {
    if (!options.customMerge) {
      return deepmerge
    }
    var customMerge = options.customMerge(key)
    return typeof customMerge === 'function' ? customMerge : deepmerge
  }
  function getEnumerableOwnPropertySymbols(target) {
    return Object.getOwnPropertySymbols
      ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
          return target.propertyIsEnumerable(symbol)
        })
      : []
  }
  function getKeys(target) {
    if (!isValid$3(target)) return []
    return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
  }
  function propertyIsOnObject(object, property) {
    /* istanbul ignore next */
    try {
      return property in object
    } catch (_) {
      return false
    }
  }
  // Protects from prototype poisoning and unexpected merging up the prototype chain.
  function propertyIsUnsafe(target, key) {
    return (
      propertyIsOnObject(target, key) && // Properties are safe to merge if they don't exist in the target yet,
      !(
        Object.hasOwnProperty.call(target, key) && // unsafe if they exist up the prototype chain,
        Object.propertyIsEnumerable.call(target, key)
      )
    ) // and also unsafe if they're nonenumerable.
  }
  function mergeObject(target, source, options) {
    var destination = options.assign ? target || {} : {}
    if (!options.isMergeableObject(target)) return target
    if (!options.assign) {
      getKeys(target).forEach(function (key) {
        destination[key] = cloneUnlessOtherwiseSpecified(target[key], options)
      })
    }
    getKeys(source).forEach(function (key) {
      /* istanbul ignore next */
      if (propertyIsUnsafe(target, key)) {
        return
      }
      if (isEmpty(target[key])) {
        destination[key] = source[key]
      } else if (
        propertyIsOnObject(target, key) &&
        options.isMergeableObject(source[key])
      ) {
        destination[key] = getMergeFunction(key, options)(
          target[key],
          source[key],
          options,
        )
      } else {
        destination[key] = cloneUnlessOtherwiseSpecified(source[key], options)
      }
    })
    return destination
  }
  function deepmerge(target, source, options) {
    options = options || {}
    options.arrayMerge = options.arrayMerge || defaultArrayMerge
    options.isMergeableObject = options.isMergeableObject || defaultIsMergeableObject
    // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
    // implementations can use it. The caller may not replace it.
    options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified
    var sourceIsArray = Array.isArray(source)
    var targetIsArray = Array.isArray(target)
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray
    if (!sourceAndTargetTypesMatch) {
      return cloneUnlessOtherwiseSpecified(source, options)
    } else if (sourceIsArray) {
      return options.arrayMerge(target, source, options)
    } else {
      return mergeObject(target, source, options)
    }
  }
  var lazyMerge = function (target, source) {
    if (!isValid$3(source)) return target
    if (!isValid$3(target)) return source
    if (typeof target !== 'object') return source
    if (typeof source !== 'object') return target
    return new Proxy(
      {},
      {
        get: function (_, key) {
          if (key in source) return source[key]
          return target[key]
        },
        ownKeys: function () {
          var keys = Object.keys(target)
          for (var key in source) {
            if (!(key in target)) {
              keys.push(key)
            }
          }
          return keys
        },
        getOwnPropertyDescriptor: function () {
          return {
            enumerable: true,
            configurable: true,
            writable: false,
          }
        },
        has: function (_, key) {
          if (key in source || key in target) return true
          return false
        },
      },
    )
  }
  var merge = deepmerge

  var IDX = 36,
    HEX = ''
  while (IDX--) HEX += IDX.toString(36)
  function uid(len) {
    var str = '',
      num = len || 11
    while (num--) str += HEX[(Math.random() * 36) | 0]
    return str
  }

  var toString = Object.prototype.toString
  var isMap = function (val) {
    return val && val instanceof Map
  }
  var isSet = function (val) {
    return val && val instanceof Set
  }
  var isWeakMap = function (val) {
    return val && val instanceof WeakMap
  }
  var isWeakSet = function (val) {
    return val && val instanceof WeakSet
  }
  var isFn = function (val) {
    return typeof val === 'function'
  }
  var isArr = Array.isArray
  var isPlainObj = function (val) {
    return toString.call(val) === '[object Object]'
  }
  var isValid = function (val) {
    return val !== null && val !== undefined
  }
  var isCollectionType = function (target) {
    return isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target)
  }
  var isNormalType = function (target) {
    return isPlainObj(target) || isArr(target)
  }

  var toArray = function (value) {
    return Array.isArray(value)
      ? value
      : value !== undefined && value !== null
      ? [value]
      : []
  }
  var ArraySet = /** @class */ (function () {
    function ArraySet(value) {
      if (value === void 0) {
        value = []
      }
      this.batchDeleting = false
      this.value = value
    }
    ArraySet.prototype.add = function (item) {
      if (!this.has(item)) {
        this.value.push(item)
      }
    }
    ArraySet.prototype.has = function (item) {
      return this.value.indexOf(item) > -1
    }
    ArraySet.prototype.delete = function (item) {
      if (this.batchDeleting) return //批量删除时禁止单独删除，会影响计数执行器
      var index = this.value.indexOf(item)
      if (index > -1) {
        this.value.splice(index, 1)
      }
    }
    ArraySet.prototype.forEach = function (callback) {
      if (this.value.length === 0) return
      for (var index = 0, len = this.value.length; index < len; index++) {
        callback(this.value[index])
      }
    }
    ArraySet.prototype.forEachDelete = function (callback) {
      if (this.value.length === 0) return
      this.batchDeleting = true
      for (var index = 0; index < this.value.length; index++) {
        var item = this.value[index]
        this.value.splice(index, 1)
        callback(item)
        index--
      }
      this.batchDeleting = false
    }
    ArraySet.prototype.clear = function () {
      this.value.length = 0
    }
    return ArraySet
  })()

  var ProxyRaw = new WeakMap()
  var RawProxy = new WeakMap()
  var RawShallowProxy = new WeakMap()
  var RawNode = new WeakMap()
  var RawReactionsMap = new WeakMap()
  var ReactionStack = []
  var BatchCount = { value: 0 }
  var UntrackCount = { value: 0 }
  var BatchScope = { value: false }
  var DependencyCollected = { value: false }
  var PendingReactions = new ArraySet()
  var PendingScopeReactions = new ArraySet()
  var BatchEndpoints = new ArraySet()
  var MakeObservableSymbol = Symbol('MakeObservableSymbol')
  var ObserverListeners = new ArraySet()

  var ITERATION_KEY = Symbol('iteration key')
  var addRawReactionsMap = function (target, key, reaction) {
    var reactionsMap = RawReactionsMap.get(target)
    if (reactionsMap) {
      var reactions = reactionsMap.get(key)
      if (reactions) {
        reactions.add(reaction)
      } else {
        reactionsMap.set(key, new ArraySet([reaction]))
      }
      return reactionsMap
    } else {
      var reactionsMap_1 = new Map([[key, new ArraySet([reaction])]])
      RawReactionsMap.set(target, reactionsMap_1)
      return reactionsMap_1
    }
  }
  var addReactionsMapToReaction = function (reaction, reactionsMap) {
    var bindSet = reaction._reactionsSet
    if (bindSet) {
      bindSet.add(reactionsMap)
    } else {
      reaction._reactionsSet = new ArraySet([reactionsMap])
    }
    return bindSet
  }
  var getReactionsFromTargetKey = function (target, key) {
    var reactionsMap = RawReactionsMap.get(target)
    var reactions = []
    if (reactionsMap) {
      var map = reactionsMap.get(key)
      if (map) {
        map.forEach(function (reaction) {
          if (reactions.indexOf(reaction) === -1) {
            reactions.push(reaction)
          }
        })
      }
    }
    return reactions
  }
  var runReactions = function (target, key) {
    var reactions = getReactionsFromTargetKey(target, key)
    var prevUntrackCount = UntrackCount.value
    UntrackCount.value = 0
    for (var i = 0, len = reactions.length; i < len; i++) {
      var reaction = reactions[i]
      if (reaction._isComputed) {
        reaction._scheduler(reaction)
      } else if (isScopeBatching()) {
        PendingScopeReactions.add(reaction)
      } else if (isBatching()) {
        PendingReactions.add(reaction)
      } else {
        if (isFn(reaction._scheduler)) {
          reaction._scheduler(reaction)
        } else {
          reaction()
        }
      }
    }
    UntrackCount.value = prevUntrackCount
  }
  var notifyObservers = function (operation) {
    ObserverListeners.forEach(function (fn) {
      return fn(operation)
    })
  }
  var bindTargetKeyWithCurrentReaction = function (operation) {
    var key = operation.key,
      type = operation.type,
      target = operation.target
    if (type === 'iterate') {
      key = ITERATION_KEY
    }
    var current = ReactionStack[ReactionStack.length - 1]
    if (isUntracking()) return
    if (current) {
      DependencyCollected.value = true
      addReactionsMapToReaction(current, addRawReactionsMap(target, key, current))
    }
  }
  var bindComputedReactions = function (reaction) {
    if (isFn(reaction)) {
      var current = ReactionStack[ReactionStack.length - 1]
      if (current) {
        var computes = current._computesSet
        if (computes) {
          computes.add(reaction)
        } else {
          current._computesSet = new ArraySet([reaction])
        }
      }
    }
  }
  var runReactionsFromTargetKey = function (operation) {
    var key = operation.key,
      type = operation.type,
      target = operation.target,
      oldTarget = operation.oldTarget
    batchStart()
    notifyObservers(operation)
    if (type === 'clear') {
      oldTarget.forEach(function (_, key) {
        runReactions(target, key)
      })
    } else {
      runReactions(target, key)
    }
    if (type === 'add' || type === 'delete' || type === 'clear') {
      var newKey = Array.isArray(target) ? 'length' : ITERATION_KEY
      runReactions(target, newKey)
    }
    batchEnd()
  }
  var hasRunningReaction = function () {
    return ReactionStack.length > 0
  }
  var releaseBindingReactions = function (reaction) {
    var _a
    ;(_a = reaction._reactionsSet) === null || _a === void 0
      ? void 0
      : _a.forEach(function (reactionsMap) {
          reactionsMap.forEach(function (reactions) {
            reactions.delete(reaction)
          })
        })
    PendingReactions.delete(reaction)
    PendingScopeReactions.delete(reaction)
    delete reaction._reactionsSet
  }
  var suspendComputedReactions = function (current) {
    var _a
    ;(_a = current._computesSet) === null || _a === void 0
      ? void 0
      : _a.forEach(function (reaction) {
          var reactions = getReactionsFromTargetKey(reaction._context, reaction._property)
          if (reactions.length === 0) {
            disposeBindingReactions(reaction)
            reaction._dirty = true
          }
        })
  }
  var disposeBindingReactions = function (reaction) {
    reaction._disposed = true
    releaseBindingReactions(reaction)
    suspendComputedReactions(reaction)
  }
  var batchStart = function () {
    BatchCount.value++
  }
  var batchEnd = function () {
    BatchCount.value--
    if (BatchCount.value === 0) {
      var prevUntrackCount = UntrackCount.value
      UntrackCount.value = 0
      executePendingReactions()
      executeBatchEndpoints()
      UntrackCount.value = prevUntrackCount
    }
  }
  var batchScopeStart = function () {
    BatchScope.value = true
  }
  var batchScopeEnd = function () {
    var prevUntrackCount = UntrackCount.value
    BatchScope.value = false
    UntrackCount.value = 0
    PendingScopeReactions.forEachDelete(function (reaction) {
      if (isFn(reaction._scheduler)) {
        reaction._scheduler(reaction)
      } else {
        reaction()
      }
    })
    UntrackCount.value = prevUntrackCount
  }
  var untrackStart = function () {
    UntrackCount.value++
  }
  var untrackEnd = function () {
    UntrackCount.value--
  }
  var isBatching = function () {
    return BatchCount.value > 0
  }
  var isScopeBatching = function () {
    return BatchScope.value
  }
  var isUntracking = function () {
    return UntrackCount.value > 0
  }
  var executePendingReactions = function () {
    PendingReactions.forEachDelete(function (reaction) {
      if (isFn(reaction._scheduler)) {
        reaction._scheduler(reaction)
      } else {
        reaction()
      }
    })
  }
  var executeBatchEndpoints = function () {
    BatchEndpoints.forEachDelete(function (callback) {
      callback()
    })
  }
  var hasDepsChange = function (newDeps, oldDeps) {
    if (newDeps === oldDeps) return false
    if (newDeps.length !== oldDeps.length) return true
    if (
      newDeps.some(function (value, index) {
        return value !== oldDeps[index]
      })
    )
      return true
    return false
  }
  var disposeEffects = function (reaction) {
    if (reaction._effects) {
      try {
        batchStart()
        reaction._effects.queue.forEach(function (item) {
          if (!item || !item.dispose) return
          item.dispose()
        })
      } finally {
        batchEnd()
      }
    }
  }

  var DataChange = /** @class */ (function () {
    function DataChange(operation, node) {
      this.key = operation.key
      this.type = operation.type
      this.object = operation.target
      this.value = operation.value
      this.oldValue = operation.oldValue
      this.path = node.path.concat(operation.key)
    }
    return DataChange
  })()
  var DataNode = /** @class */ (function () {
    function DataNode(target, key, value) {
      this.target = target
      this.key = key
      this.value = value
    }
    Object.defineProperty(DataNode.prototype, 'path', {
      get: function () {
        if (!this.parent) return this.key ? [this.key] : []
        return this.parent.path.concat(this.key)
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(DataNode.prototype, 'targetRaw', {
      get: function () {
        return ProxyRaw.get(this.target) || this.target
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(DataNode.prototype, 'parent', {
      get: function () {
        if (!this.target) return
        return getDataNode(this.targetRaw)
      },
      enumerable: false,
      configurable: true,
    })
    DataNode.prototype.isEqual = function (node) {
      if (this.key) {
        return node.targetRaw === this.targetRaw && node.key === this.key
      }
      return node.value === this.value
    }
    DataNode.prototype.contains = function (node) {
      if (node === this) return true
      var parent = node.parent
      while (!!parent) {
        if (this.isEqual(parent)) return true
        parent = parent.parent
      }
      return false
    }
    return DataNode
  })()
  var getDataNode = function (raw) {
    return RawNode.get(raw)
  }
  var setDataNode = function (raw, node) {
    RawNode.set(raw, node)
  }
  var buildDataTree = function (target, key, value) {
    var raw = ProxyRaw.get(value) || value
    var currentNode = getDataNode(raw)
    if (currentNode) return currentNode
    setDataNode(raw, new DataNode(target, key, value))
  }

  var RAW_TYPE = Symbol('RAW_TYPE')
  var OBSERVABLE_TYPE = Symbol('OBSERVABLE_TYPE')
  var hasOwnProperty$3 = Object.prototype.hasOwnProperty
  var isObservable = function (target) {
    return ProxyRaw.has(target)
  }
  var isAnnotation = function (target) {
    return target && !!target[MakeObservableSymbol]
  }
  var isSupportObservable = function (target) {
    if (!isValid(target)) return false
    if (isArr(target)) return true
    if (isPlainObj(target)) {
      if (target[RAW_TYPE]) {
        return false
      }
      if (target[OBSERVABLE_TYPE]) {
        return true
      }
      if ('$$typeof' in target && '_owner' in target) {
        return false
      }
      if (target['_isAMomentObject']) {
        return false
      }
      if (target['_isJSONSchemaObject']) {
        return false
      }
      if (isFn(target['toJS'])) {
        return false
      }
      if (isFn(target['toJSON'])) {
        return false
      }
      return true
    }
    if (isMap(target) || isWeakMap(target) || isSet(target) || isWeakSet(target))
      return true
    return false
  }
  var toJS = function (values) {
    var visited = new WeakSet()
    var _toJS = function (values) {
      if (visited.has(values)) {
        return values
      }
      if (values && values[RAW_TYPE]) return values
      if (isArr(values)) {
        if (isObservable(values)) {
          visited.add(values)
          var res_1 = []
          values.forEach(function (item) {
            res_1.push(_toJS(item))
          })
          visited.delete(values)
          return res_1
        }
      } else if (isPlainObj(values)) {
        if (isObservable(values)) {
          visited.add(values)
          var res = {}
          for (var key in values) {
            if (hasOwnProperty$3.call(values, key)) {
              res[key] = _toJS(values[key])
            }
          }
          visited.delete(values)
          return res
        }
      }
      return values
    }
    return _toJS(values)
  }
  var contains = function (target, property) {
    var targetRaw = ProxyRaw.get(target) || target
    var propertyRaw = ProxyRaw.get(property) || property
    if (targetRaw === propertyRaw) return true
    var targetNode = getDataNode(targetRaw)
    var propertyNode = getDataNode(propertyRaw)
    if (!targetNode) return false
    if (!propertyNode) return false
    return targetNode.contains(propertyNode)
  }
  var hasCollected = function (callback) {
    DependencyCollected.value = false
    callback === null || callback === void 0 ? void 0 : callback()
    return DependencyCollected.value
  }

  var __read$3 =
    (undefined && undefined.__read) ||
    function (o, n) {
      var m = typeof Symbol === 'function' && o[Symbol.iterator]
      if (!m) return o
      var i = m.call(o),
        r,
        ar = [],
        e
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
      } catch (error) {
        e = { error: error }
      } finally {
        try {
          if (r && !r.done && (m = i['return'])) m.call(i)
        } finally {
          if (e) throw e.error
        }
      }
      return ar
    }
  var __spreadArray$3 =
    (undefined && undefined.__spreadArray) ||
    function (to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i)
            ar[i] = from[i]
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from))
    }
  var _a
  var wellKnownSymbols = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map(function (key) {
        return Symbol[key]
      })
      .filter(function (value) {
        return typeof value === 'symbol'
      }),
  )
  var hasOwnProperty$2 = Object.prototype.hasOwnProperty
  function findObservable(target, key, value) {
    var observableObj = RawProxy.get(value)
    if (observableObj) {
      return observableObj
    }
    if (!isObservable(value) && isSupportObservable(value)) {
      return createObservable(target, key, value)
    }
    return value
  }
  function patchIterator(target, key, iterator, isEntries) {
    var originalNext = iterator.next
    iterator.next = function () {
      var _a = originalNext.call(iterator),
        done = _a.done,
        value = _a.value
      if (!done) {
        if (isEntries) {
          value[1] = findObservable(target, key, value[1])
        } else {
          value = findObservable(target, key, value)
        }
      }
      return { done: done, value: value }
    }
    return iterator
  }
  var instrumentations =
    ((_a = {
      has: function (key) {
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        bindTargetKeyWithCurrentReaction({ target: target, key: key, type: 'has' })
        return proto.has.apply(target, arguments)
      },
      get: function (key) {
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        bindTargetKeyWithCurrentReaction({ target: target, key: key, type: 'get' })
        return findObservable(target, key, proto.get.apply(target, arguments))
      },
      add: function (key) {
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        var hadKey = proto.has.call(target, key)
        // forward the operation before queueing reactions
        var result = proto.add.apply(target, arguments)
        if (!hadKey) {
          runReactionsFromTargetKey({ target: target, key: key, value: key, type: 'add' })
        }
        return result
      },
      set: function (key, value) {
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        var hadKey = proto.has.call(target, key)
        var oldValue = proto.get.call(target, key)
        // forward the operation before queueing reactions
        var result = proto.set.apply(target, arguments)
        if (!hadKey) {
          runReactionsFromTargetKey({
            target: target,
            key: key,
            value: value,
            type: 'add',
          })
        } else if (value !== oldValue) {
          runReactionsFromTargetKey({
            target: target,
            key: key,
            value: value,
            oldValue: oldValue,
            type: 'set',
          })
        }
        return result
      },
      delete: function (key) {
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        var hadKey = proto.has.call(target, key)
        var oldValue = proto.get ? proto.get.call(target, key) : undefined
        // forward the operation before queueing reactions
        var result = proto.delete.apply(target, arguments)
        if (hadKey) {
          runReactionsFromTargetKey({
            target: target,
            key: key,
            oldValue: oldValue,
            type: 'delete',
          })
        }
        return result
      },
      clear: function () {
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        var hadItems = target.size !== 0
        var oldTarget = target instanceof Map ? new Map(target) : new Set(target)
        // forward the operation before queueing reactions
        var result = proto.clear.apply(target, arguments)
        if (hadItems) {
          runReactionsFromTargetKey({
            target: target,
            oldTarget: oldTarget,
            type: 'clear',
          })
        }
        return result
      },
      forEach: function (cb) {
        var _a
        var args = []
        for (var _i = 1; _i < arguments.length; _i++) {
          args[_i - 1] = arguments[_i]
        }
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' })
        // swap out the raw values with their observable pairs
        // before passing them to the callback
        var wrappedCb = function (value, key) {
          var args = []
          for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i]
          }
          return cb.apply(
            void 0,
            __spreadArray$3(
              [findObservable(target, key, value), key],
              __read$3(args),
              false,
            ),
          )
        }
        return (_a = proto.forEach).call.apply(
          _a,
          __spreadArray$3([target, wrappedCb], __read$3(args), false),
        )
      },
      keys: function () {
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' })
        return proto.keys.apply(target, arguments)
      },
      values: function () {
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' })
        var iterator = proto.values.apply(target, arguments)
        return patchIterator(target, '', iterator, false)
      },
      entries: function () {
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' })
        var iterator = proto.entries.apply(target, arguments)
        return patchIterator(target, '', iterator, true)
      },
    }),
    (_a[Symbol.iterator] = function () {
      var target = ProxyRaw.get(this)
      var proto = Reflect.getPrototypeOf(this)
      bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' })
      var iterator = proto[Symbol.iterator].apply(target, arguments)
      return patchIterator(target, '', iterator, target instanceof Map)
    }),
    Object.defineProperty(_a, 'size', {
      get: function () {
        var target = ProxyRaw.get(this)
        var proto = Reflect.getPrototypeOf(this)
        bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' })
        return Reflect.get(proto, 'size', target)
      },
      enumerable: false,
      configurable: true,
    }),
    _a)
  var collectionHandlers = {
    get: function (target, key, receiver) {
      // instrument methods and property accessors to be reactive
      target = hasOwnProperty$2.call(instrumentations, key) ? instrumentations : target
      return Reflect.get(target, key, receiver)
    },
  }
  var baseHandlers = {
    get: function (target, key, receiver) {
      if (!key) return
      var result = target[key] // use Reflect.get is too slow
      if (typeof key === 'symbol' && wellKnownSymbols.has(key)) {
        return result
      }
      bindTargetKeyWithCurrentReaction({
        target: target,
        key: key,
        receiver: receiver,
        type: 'get',
      })
      var observableResult = RawProxy.get(result)
      if (observableResult) {
        return observableResult
      }
      if (!isObservable(result) && isSupportObservable(result)) {
        var descriptor = Reflect.getOwnPropertyDescriptor(target, key)
        if (
          !descriptor ||
          !(descriptor.writable === false && descriptor.configurable === false)
        ) {
          return createObservable(target, key, result)
        }
      }
      return result
    },
    has: function (target, key) {
      var result = Reflect.has(target, key)
      bindTargetKeyWithCurrentReaction({ target: target, key: key, type: 'has' })
      return result
    },
    ownKeys: function (target) {
      var keys = Reflect.ownKeys(target)
      bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' })
      return keys
    },
    set: function (target, key, value, receiver) {
      var hadKey = hasOwnProperty$2.call(target, key)
      var newValue = createObservable(target, key, value)
      var oldValue = target[key]
      target[key] = newValue // use Reflect.set is too slow
      if (!hadKey) {
        runReactionsFromTargetKey({
          target: target,
          key: key,
          value: newValue,
          oldValue: oldValue,
          receiver: receiver,
          type: 'add',
        })
      } else if (value !== oldValue) {
        runReactionsFromTargetKey({
          target: target,
          key: key,
          value: newValue,
          oldValue: oldValue,
          receiver: receiver,
          type: 'set',
        })
      }
      return true
    },
    deleteProperty: function (target, key) {
      var oldValue = target[key]
      delete target[key]
      runReactionsFromTargetKey({
        target: target,
        key: key,
        oldValue: oldValue,
        type: 'delete',
      })
      return true
    },
  }

  var createNormalProxy = function (target, shallow) {
    var proxy = new Proxy(target, baseHandlers)
    ProxyRaw.set(proxy, target)
    if (shallow) {
      RawShallowProxy.set(target, proxy)
    } else {
      RawProxy.set(target, proxy)
    }
    return proxy
  }
  var createCollectionProxy = function (target, shallow) {
    var proxy = new Proxy(target, collectionHandlers)
    ProxyRaw.set(proxy, target)
    if (shallow) {
      RawShallowProxy.set(target, proxy)
    } else {
      RawProxy.set(target, proxy)
    }
    return proxy
  }
  var createShallowProxy = function (target) {
    if (isNormalType(target)) return createNormalProxy(target, true)
    if (isCollectionType(target)) return createCollectionProxy(target, true)
    return target
  }
  var createObservable = function (target, key, value, shallow) {
    if (typeof value !== 'object') return value
    var raw = ProxyRaw.get(value)
    if (!!raw) {
      var node = getDataNode(raw)
      if (!node.target) node.target = target
      node.key = key
      return value
    }
    if (!isSupportObservable(value)) return value
    if (target) {
      var parentRaw = ProxyRaw.get(target) || target
      var isShallowParent = RawShallowProxy.get(parentRaw)
      if (isShallowParent) return value
    }
    buildDataTree(target, key, value)
    if (shallow) return createShallowProxy(value)
    if (isNormalType(value)) return createNormalProxy(value)
    if (isCollectionType(value)) return createCollectionProxy(value)
    return value
  }
  var createAnnotation = function (maker) {
    var annotation = function (target) {
      return maker({ value: target })
    }
    if (isFn(maker)) {
      annotation[MakeObservableSymbol] = maker
    }
    return annotation
  }
  var getObservableMaker = function (target) {
    if (target[MakeObservableSymbol]) {
      if (!target[MakeObservableSymbol][MakeObservableSymbol]) {
        return target[MakeObservableSymbol]
      }
      return getObservableMaker(target[MakeObservableSymbol])
    }
  }
  var createBoundaryFunction = function (start, end) {
    function boundary(fn) {
      var results
      try {
        start()
        if (isFn(fn)) {
          results = fn()
        }
      } finally {
        end()
      }
      return results
    }
    boundary.bound = createBindFunction(boundary)
    return boundary
  }
  var createBindFunction = function (boundary) {
    function bind(callback, context) {
      return function () {
        var args = []
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i]
        }
        return boundary(function () {
          return callback.apply(context, args)
        })
      }
    }
    return bind
  }
  var createBoundaryAnnotation = function (start, end) {
    var boundary = createBoundaryFunction(start, end)
    var annotation = createAnnotation(function (_a) {
      var target = _a.target,
        key = _a.key
      target[key] = boundary.bound(target[key], target)
      return target
    })
    boundary[MakeObservableSymbol] = annotation
    boundary.bound[MakeObservableSymbol] = annotation
    return boundary
  }

  var batch = createBoundaryAnnotation(batchStart, batchEnd)
  batch.scope = createBoundaryAnnotation(batchScopeStart, batchScopeEnd)
  batch.endpoint = function (callback) {
    if (!isFn(callback)) return
    if (BatchCount.value === 0) {
      callback()
    } else {
      BatchEndpoints.add(callback)
    }
  }

  var action = createBoundaryAnnotation(
    function () {
      batchStart()
      untrackStart()
    },
    function () {
      untrackEnd()
      batchEnd()
    },
  )
  action.scope = createBoundaryAnnotation(
    function () {
      batchScopeStart()
      untrackStart()
    },
    function () {
      untrackEnd()
      batchScopeEnd()
    },
  )

  var untracked = createBoundaryFunction(untrackStart, untrackEnd)

  var observable$1 = createAnnotation(function (_a) {
    var target = _a.target,
      key = _a.key,
      value = _a.value
    var store = {
      value: createObservable(target, key, target ? target[key] : value),
    }
    function get() {
      bindTargetKeyWithCurrentReaction({
        target: target,
        key: key,
        type: 'get',
      })
      return store.value
    }
    function set(value) {
      var oldValue = store.value
      value = createObservable(target, key, value)
      store.value = value
      if (oldValue === value) return
      runReactionsFromTargetKey({
        target: target,
        key: key,
        type: 'set',
        oldValue: oldValue,
        value: value,
      })
    }
    if (target) {
      Object.defineProperty(target, key, {
        set: set,
        get: get,
        enumerable: true,
        configurable: false,
      })
      return target
    }
    return store.value
  })

  var box = createAnnotation(function (_a) {
    var target = _a.target,
      key = _a.key,
      value = _a.value
    var store = {
      value: target ? target[key] : value,
    }
    var proxy = {
      set: set,
      get: get,
    }
    ProxyRaw.set(proxy, store)
    RawProxy.set(store, proxy)
    buildDataTree(target, key, store)
    function get() {
      bindTargetKeyWithCurrentReaction({
        target: store,
        key: key,
        type: 'get',
      })
      return store.value
    }
    function set(value) {
      var oldValue = store.value
      store.value = value
      if (oldValue !== value) {
        runReactionsFromTargetKey({
          target: store,
          key: key,
          type: 'set',
          oldValue: oldValue,
          value: value,
        })
      }
    }
    if (target) {
      Object.defineProperty(target, key, {
        value: proxy,
        enumerable: true,
        configurable: false,
        writable: false,
      })
      return target
    }
    return proxy
  })

  var ref = createAnnotation(function (_a) {
    var target = _a.target,
      key = _a.key,
      value = _a.value
    var store = {
      value: target ? target[key] : value,
    }
    var proxy = {}
    var context = target ? target : store
    var property = target ? key : 'value'
    function get() {
      bindTargetKeyWithCurrentReaction({
        target: context,
        key: property,
        type: 'get',
      })
      return store.value
    }
    function set(value) {
      var oldValue = store.value
      store.value = value
      if (oldValue !== value) {
        runReactionsFromTargetKey({
          target: context,
          key: property,
          type: 'set',
          oldValue: oldValue,
          value: value,
        })
      }
    }
    if (target) {
      Object.defineProperty(target, key, {
        get: get,
        set: set,
        enumerable: true,
      })
      return target
    } else {
      Object.defineProperty(proxy, 'value', {
        set: set,
        get: get,
      })
      buildDataTree(target, key, store)
      ProxyRaw.set(proxy, store)
      RawProxy.set(store, proxy)
    }
    return proxy
  })

  var shallow = createAnnotation(function (_a) {
    var target = _a.target,
      key = _a.key,
      value = _a.value
    var store = {
      value: createObservable(target, key, target ? target[key] : value, true),
    }
    function get() {
      bindTargetKeyWithCurrentReaction({
        target: target,
        key: key,
        type: 'get',
      })
      return store.value
    }
    function set(value) {
      var oldValue = store.value
      value = createObservable(target, key, value, true)
      store.value = value
      if (oldValue === value) return
      runReactionsFromTargetKey({
        target: target,
        key: key,
        type: 'set',
        oldValue: oldValue,
        value: value,
      })
    }
    if (target) {
      Object.defineProperty(target, key, {
        set: set,
        get: get,
        enumerable: true,
        configurable: false,
      })
      return target
    }
    return store.value
  })

  var getDescriptor = Object.getOwnPropertyDescriptor
  var getProto = Object.getPrototypeOf
  var ClassDescriptorMap = new WeakMap()
  function getPropertyDescriptor(obj, key) {
    if (!obj) return
    return getDescriptor(obj, key) || getPropertyDescriptor(getProto(obj), key)
  }
  function getPropertyDescriptorCache(obj, key) {
    var constructor = obj.constructor
    if (constructor === Object || constructor === Array)
      return getPropertyDescriptor(obj, key)
    var cache = ClassDescriptorMap.get(constructor) || {}
    var descriptor = cache[key]
    if (descriptor) return descriptor
    var newDesc = getPropertyDescriptor(obj, key)
    ClassDescriptorMap.set(constructor, cache)
    cache[key] = newDesc
    return newDesc
  }
  function getPrototypeDescriptor(target, key, value) {
    if (!target) {
      if (value) {
        if (isFn(value)) {
          return { get: value }
        } else {
          return value
        }
      }
      return {}
    }
    var descriptor = getPropertyDescriptorCache(target, key)
    if (descriptor) {
      return descriptor
    }
    return {}
  }
  var computed = createAnnotation(function (_a) {
    var target = _a.target,
      key = _a.key,
      value = _a.value
    var store = {}
    var proxy = {}
    var context = target ? target : store
    var property = target ? key : 'value'
    var descriptor = getPrototypeDescriptor(target, property, value)
    function compute() {
      var _a
      store.value =
        (_a = descriptor.get) === null || _a === void 0 ? void 0 : _a.call(context)
    }
    function reaction() {
      if (ReactionStack.indexOf(reaction) === -1) {
        releaseBindingReactions(reaction)
        try {
          ReactionStack.push(reaction)
          compute()
        } finally {
          ReactionStack.pop()
        }
      }
    }
    reaction._name = 'ComputedReaction'
    reaction._scheduler = function () {
      reaction._dirty = true
      runReactionsFromTargetKey({
        target: context,
        key: property,
        value: store.value,
        type: 'set',
      })
    }
    reaction._isComputed = true
    reaction._dirty = true
    reaction._context = context
    reaction._property = property
    function get() {
      if (hasRunningReaction()) {
        bindComputedReactions(reaction)
      }
      if (!isUntracking()) {
        //如果允许untracked过程中收集依赖，那么永远不会存在绑定，因为_dirty已经设置为false
        if (reaction._dirty) {
          reaction()
          reaction._dirty = false
        }
      } else {
        compute()
      }
      bindTargetKeyWithCurrentReaction({
        target: context,
        key: property,
        type: 'get',
      })
      return store.value
    }
    function set(value) {
      var _a
      try {
        batchStart()
        ;(_a = descriptor.set) === null || _a === void 0
          ? void 0
          : _a.call(context, value)
      } finally {
        batchEnd()
      }
    }
    if (target) {
      Object.defineProperty(target, key, {
        get: get,
        set: set,
        enumerable: true,
      })
      return target
    } else {
      Object.defineProperty(proxy, 'value', {
        set: set,
        get: get,
      })
      buildDataTree(target, key, store)
      ProxyRaw.set(proxy, store)
      RawProxy.set(store, proxy)
    }
    return proxy
  })

  function observable(target) {
    return createObservable(null, null, target)
  }
  observable.box = box
  observable.ref = ref
  observable.deep = observable$1
  observable.shallow = shallow
  observable.computed = computed
  observable[MakeObservableSymbol] = observable$1

  function define(target, annotations) {
    if (isObservable(target)) return target
    if (!isSupportObservable(target)) return target
    buildDataTree(undefined, undefined, target)
    ProxyRaw.set(target, target)
    RawProxy.set(target, target)
    for (var key in annotations) {
      var annotation = annotations[key]
      if (isAnnotation(annotation)) {
        getObservableMaker(annotation)({
          target: target,
          key: key,
        })
      }
    }
    return target
  }

  var __assign$4 =
    (undefined && undefined.__assign) ||
    function () {
      __assign$4 =
        Object.assign ||
        function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
          }
          return t
        }
      return __assign$4.apply(this, arguments)
    }
  var autorun = function (tracker, name) {
    if (name === void 0) {
      name = 'AutoRun'
    }
    var reaction = function () {
      if (!isFn(tracker)) return
      if (reaction._boundary > 0) return
      if (ReactionStack.indexOf(reaction) === -1) {
        releaseBindingReactions(reaction)
        try {
          batchStart()
          ReactionStack.push(reaction)
          tracker()
        } finally {
          ReactionStack.pop()
          reaction._boundary++
          batchEnd()
          reaction._boundary = 0
          reaction._memos.cursor = 0
          reaction._effects.cursor = 0
        }
      }
    }
    var cleanRefs = function () {
      reaction._memos = {
        queue: [],
        cursor: 0,
      }
      reaction._effects = {
        queue: [],
        cursor: 0,
      }
    }
    reaction._boundary = 0
    reaction._name = name
    cleanRefs()
    reaction()
    return function () {
      disposeBindingReactions(reaction)
      disposeEffects(reaction)
      cleanRefs()
    }
  }
  autorun.memo = function (callback, dependencies) {
    if (!isFn(callback)) return
    var current = ReactionStack[ReactionStack.length - 1]
    if (!current || !current._memos)
      throw new Error('autorun.memo must used in autorun function body.')
    var deps = toArray(dependencies || [])
    var id = current._memos.cursor++
    var old = current._memos.queue[id]
    if (!old || hasDepsChange(deps, old.deps)) {
      var value = callback()
      current._memos.queue[id] = {
        value: value,
        deps: deps,
      }
      return value
    }
    return old.value
  }
  autorun.effect = function (callback, dependencies) {
    if (!isFn(callback)) return
    var current = ReactionStack[ReactionStack.length - 1]
    if (!current || !current._effects)
      throw new Error('autorun.effect must used in autorun function body.')
    var effects = current._effects
    var deps = toArray(dependencies || [{}])
    var id = effects.cursor++
    var old = effects.queue[id]
    if (!old || hasDepsChange(deps, old.deps)) {
      Promise.resolve(0).then(function () {
        if (current._disposed) return
        var dispose = callback()
        if (isFn(dispose)) {
          effects.queue[id].dispose = dispose
        }
      })
      effects.queue[id] = {
        deps: deps,
      }
    }
  }
  var reaction = function (tracker, subscriber, options) {
    var realOptions = __assign$4({ name: 'Reaction' }, options)
    var value = {}
    var dirtyCheck = function () {
      if (isFn(realOptions.equals))
        return !realOptions.equals(value.oldValue, value.currentValue)
      return value.oldValue !== value.currentValue
    }
    var fireAction = function () {
      try {
        //如果untrack的话，会导致用户如果在scheduler里同步调用setState影响下次React渲染的依赖收集
        batchStart()
        if (isFn(subscriber)) subscriber(value.currentValue, value.oldValue)
      } finally {
        batchEnd()
      }
    }
    var reaction = function () {
      if (ReactionStack.indexOf(reaction) === -1) {
        releaseBindingReactions(reaction)
        try {
          ReactionStack.push(reaction)
          value.currentValue = tracker()
        } finally {
          ReactionStack.pop()
        }
      }
    }
    reaction._scheduler = function (looping) {
      looping()
      if (dirtyCheck()) fireAction()
      value.oldValue = value.currentValue
    }
    reaction._name = realOptions.name
    reaction()
    value.oldValue = value.currentValue
    if (realOptions.fireImmediately) {
      fireAction()
    }
    return function () {
      disposeBindingReactions(reaction)
    }
  }

  var observe = function (target, observer, deep) {
    if (deep === void 0) {
      deep = true
    }
    var addListener = function (target) {
      var raw = ProxyRaw.get(target) || target
      var node = getDataNode(raw)
      var listener = function (operation) {
        var targetRaw = ProxyRaw.get(operation.target) || operation.target
        var targetNode = getDataNode(targetRaw)
        if (deep) {
          if (node.contains(targetNode)) {
            observer(new DataChange(operation, targetNode))
            return
          }
        }
        if (
          node === targetNode ||
          (node.targetRaw === targetRaw && node.key === operation.key)
        ) {
          observer(new DataChange(operation, targetNode))
        }
      }
      if (node && isFn(observer)) {
        ObserverListeners.add(listener)
      }
      return function () {
        ObserverListeners.delete(listener)
      }
    }
    if (target && typeof target !== 'object')
      throw Error('Can not observe '.concat(typeof target, ' type.'))
    return addListener(target)
  }

  var REVA_ACTIONS_KEY = Symbol.for('__REVA_ACTIONS')
  var SchemaNestedMap = {
    parent: true,
    root: true,
    properties: true,
    patternProperties: true,
    additionalProperties: true,
    items: true,
    additionalItems: true,
    'x-linkages': true,
    'x-reactions': true,
  }
  var SchemaStateMap = {
    title: 'title',
    description: 'description',
    default: 'initialValue',
    enum: 'dataSource',
    readOnly: 'readOnly',
    writeOnly: 'editable',
    'x-content': 'content',
    'x-data': 'data',
    'x-value': 'value',
    'x-editable': 'editable',
    'x-disabled': 'disabled',
    'x-read-pretty': 'readPretty',
    'x-read-only': 'readOnly',
    'x-visible': 'visible',
    'x-hidden': 'hidden',
    'x-display': 'display',
    'x-pattern': 'pattern',
    'x-validator': 'validator',
    'x-decorator': 'decoratorType',
    'x-component': 'componentType',
    'x-decorator-props': 'decoratorProps',
    'x-component-props': 'componentProps',
  }
  var SchemaValidatorMap = {
    required: true,
    format: true,
    maxItems: true,
    minItems: true,
    maxLength: true,
    minLength: true,
    maximum: true,
    minimum: true,
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    pattern: true,
    const: true,
    multipleOf: true,
    maxProperties: true,
    minProperties: true,
    uniqueItems: true,
  }
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty
  var traverse = function (target, visitor) {
    var seenObjects = []
    var root = target
    var traverse = function (target, path) {
      if (path === void 0) {
        path = []
      }
      if (isPlainObj$1(target)) {
        var seenIndex = seenObjects.indexOf(target)
        if (seenIndex > -1) {
          return
        }
        var addIndex = seenObjects.length
        seenObjects.push(target)
        if (isNoNeedCompileObject(target) && root !== target) {
          visitor(target, path)
          return
        }
        each(target, function (value, key) {
          traverse(value, path.concat(key))
        })
        seenObjects.splice(addIndex, 1)
      } else {
        visitor(target, path)
      }
    }
    traverse(target)
  }
  var traverseSchema = function (schema, visitor) {
    if (schema['x-validator'] !== undefined) {
      visitor(schema['x-validator'], ['x-validator'])
    }
    var seenObjects = []
    var root = schema
    var traverse = function (target, path) {
      var _a
      if (path === void 0) {
        path = []
      }
      if (
        path[0] === 'x-compile-omitted' ||
        path[0] === 'x-validator' ||
        path[0] === 'version' ||
        path[0] === '_isJSONSchemaObject'
      )
        return
      if (String(path[0]).indexOf('x-') == -1 && isFn$2(target)) return
      if (SchemaNestedMap[path[0]]) return
      if (
        ((_a = schema['x-compile-omitted']) === null || _a === void 0
          ? void 0
          : _a.indexOf(path[0])) > -1
      ) {
        visitor(target, path, true)
        return
      }
      if (isPlainObj$1(target)) {
        if (path[0] === 'default' || path[0] === 'x-value') {
          visitor(target, path)
          return
        }
        var seenIndex = seenObjects.indexOf(target)
        if (seenIndex > -1) {
          return
        }
        var addIndex = seenObjects.length
        seenObjects.push(target)
        if (isNoNeedCompileObject(target) && root !== target) {
          visitor(target, path)
          return
        }
        each(target, function (value, key) {
          traverse(value, path.concat(key))
        })
        seenObjects.splice(addIndex, 1)
      } else {
        visitor(target, path)
      }
    }
    traverse(schema)
  }
  var isNoNeedCompileObject = function (source) {
    if ('$$typeof' in source && '_owner' in source) {
      return true
    }
    if (source['_isAMomentObject']) {
      return true
    }
    if (Schema.isSchemaInstance(source)) {
      return true
    }
    if (source[REVA_ACTIONS_KEY]) {
      return true
    }
    if (isFn$2(source['toJS'])) {
      return true
    }
    if (isFn$2(source['toJSON'])) {
      return true
    }
    if (isObservable(source)) {
      return true
    }
    return false
  }
  var createDataSource = function (source) {
    return toArr$1(source).map(function (item) {
      if (typeof item === 'object') {
        return item
      } else {
        return {
          label: item,
          value: item,
        }
      }
    })
  }
  var patchStateFormSchema = function (targetState, pattern, compiled) {
    untracked(function () {
      var _a
      var path = Path.parse(pattern)
      var segments = path.segments
      var key = segments[0]
      var isEnum = key === 'enum' && isArr$2(compiled)
      var schemaMapKey = SchemaStateMap[key]
      if (schemaMapKey) {
        Path.setIn(
          targetState,
          [schemaMapKey].concat(segments.slice(1)),
          isEnum ? createDataSource(compiled) : compiled,
        )
      } else {
        var isValidatorKey = SchemaValidatorMap[key]
        if (isValidatorKey) {
          ;(_a = targetState['setValidatorRule']) === null || _a === void 0
            ? void 0
            : _a.call(targetState, key, compiled)
        }
      }
    })
  }

  var ExpRE = /^\s*\{\{([\s\S]*)\}\}\s*$/
  var Registry = {
    silent: false,
    compile: function (expression, scope) {
      if (scope === void 0) {
        scope = {}
      }
      if (Registry.silent) {
        try {
          return new Function(
            '$root',
            'with($root) { return ('.concat(expression, '); }'),
          )(scope)
        } catch (_a) {}
      } else {
        return new Function('$root', 'with($root) { return ('.concat(expression, '); }'))(
          scope,
        )
      }
    },
  }
  var silent = function (value) {
    if (value === void 0) {
      value = true
    }
    Registry.silent = !!value
  }
  var registerCompiler = function (compiler) {
    if (isFn$2(compiler)) {
      Registry.compile = compiler
    }
  }
  var shallowCompile = function (source, scope) {
    if (isStr$1(source)) {
      var matched = source.match(ExpRE)
      if (!matched) return source
      return Registry.compile(matched[1], scope)
    }
    return source
  }
  var compile = function (source, scope) {
    var seenObjects = []
    var compile = function (source) {
      if (isStr$1(source)) {
        return shallowCompile(source, scope)
      } else if (isArr$2(source)) {
        return source.map(function (value) {
          return compile(value)
        })
      } else if (isPlainObj$1(source)) {
        if (isNoNeedCompileObject(source)) return source
        var seenIndex = seenObjects.indexOf(source)
        if (seenIndex > -1) {
          return source
        }
        var addIndex = seenObjects.length
        seenObjects.push(source)
        var results = reduce(
          source,
          function (buf, value, key) {
            buf[key] = compile(value)
            return buf
          },
          {},
        )
        seenObjects.splice(addIndex, 1)
        return results
      }
      return source
    }
    return compile(source)
  }
  var patchCompile = function (targetState, sourceState, scope) {
    traverse(sourceState, function (value, pattern) {
      var path = Path.parse(pattern)
      var compiled = compile(value, scope)
      var key = path.segments[0]
      if (compiled === undefined) return
      if (hasOwnProperty$1.call(targetState, key)) {
        untracked(function () {
          return Path.setIn(targetState, path, compiled)
        })
      }
    })
  }
  var patchSchemaCompile = function (targetState, sourceSchema, scope, demand) {
    if (demand === void 0) {
      demand = false
    }
    traverseSchema(sourceSchema, function (value, path, omitCompile) {
      var compiled = value
      var collected = hasCollected(function () {
        if (!omitCompile) {
          compiled = compile(value, scope)
        }
      })
      if (compiled === undefined) return
      if (demand) {
        if (collected || !targetState.initialized) {
          patchStateFormSchema(targetState, path, compiled)
        }
      } else {
        patchStateFormSchema(targetState, path, compiled)
      }
    })
  }

  var LifeCycle = /** @class */ (function () {
    function LifeCycle() {
      var params = []
      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i]
      }
      var _this = this
      this.buildListener = function (params) {
        return function (payload, ctx) {
          var _this = this
          for (var index = 0; index < params.length; index++) {
            var item = params[index]
            if (isFn$2(item)) {
              item.call(this, payload, ctx)
            } else if (isStr$1(item) && isFn$2(params[index + 1])) {
              if (item === payload.type) {
                params[index + 1].call(this, payload.payload, ctx)
              }
              index++
            } else {
              each(item, function (handler, type) {
                if (isFn$2(handler) && isStr$1(type)) {
                  if (type === payload.type) {
                    handler.call(_this, payload.payload, ctx)
                    return false
                  }
                }
              })
            }
          }
        }
      }
      this.notify = function (type, payload, ctx) {
        if (isStr$1(type)) {
          _this.listener.call(ctx, { type: type, payload: payload }, ctx)
        }
      }
      this.listener = this.buildListener(params)
    }
    return LifeCycle
  })()

  var __extends$4 =
    (undefined && undefined.__extends) ||
    (function () {
      var extendStatics = function (d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (d, b) {
              d.__proto__ = b
            }) ||
          function (d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
          }
        return extendStatics(d, b)
      }
      return function (d, b) {
        if (typeof b !== 'function' && b !== null)
          throw new TypeError(
            'Class extends value ' + String(b) + ' is not a constructor or null',
          )
        extendStatics(d, b)
        function __() {
          this.constructor = d
        }
        d.prototype =
          b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
      }
    })()
  var Heart = /** @class */ (function (_super) {
    __extends$4(Heart, _super)
    function Heart(_a) {
      var _b = _a === void 0 ? {} : _a,
        lifecycles = _b.lifecycles,
        context = _b.context
      var _this = _super.call(this) || this
      _this.lifecycles = []
      _this.outerLifecycles = new Map()
      _this.buildLifeCycles = function (lifecycles) {
        return lifecycles.reduce(function (buf, item) {
          if (item instanceof LifeCycle) {
            return buf.concat(item)
          } else {
            if (isArr$2(item)) {
              return _this.buildLifeCycles(item)
            } else if (typeof item === 'object') {
              _this.context = item
              return buf
            }
            return buf
          }
        }, [])
      }
      _this.addLifeCycles = function (id, lifecycles) {
        if (lifecycles === void 0) {
          lifecycles = []
        }
        var observers = _this.buildLifeCycles(lifecycles)
        if (observers.length) {
          _this.outerLifecycles.set(id, observers)
        }
      }
      _this.hasLifeCycles = function (id) {
        return _this.outerLifecycles.has(id)
      }
      _this.removeLifeCycles = function (id) {
        _this.outerLifecycles.delete(id)
      }
      _this.setLifeCycles = function (lifecycles) {
        if (lifecycles === void 0) {
          lifecycles = []
        }
        _this.lifecycles = _this.buildLifeCycles(lifecycles)
      }
      _this.publish = function (type, payload, context) {
        if (isStr$1(type)) {
          _this.lifecycles.forEach(function (lifecycle) {
            lifecycle.notify(type, payload, context || _this.context)
          })
          _this.outerLifecycles.forEach(function (lifecycles) {
            lifecycles.forEach(function (lifecycle) {
              lifecycle.notify(type, payload, context || _this.context)
            })
          })
          _this.notify({
            type: type,
            payload: payload,
          })
        }
      }
      _this.clear = function () {
        _this.lifecycles = []
        _this.outerLifecycles.clear()
        _this.unsubscribe()
      }
      _this.lifecycles = _this.buildLifeCycles(lifecycles || [])
      _this.context = context
      return _this
    }
    return Heart
  })(Subscribable)

  var isForm = function (node) {
    return node instanceof Form
  }
  var isField = function (node) {
    return node instanceof Field
  }
  var isGeneralField = function (node) {
    return node instanceof Field || node instanceof VoidField
  }
  var isArrayField = function (node) {
    return node instanceof ArrayField
  }
  var isObjectField = function (node) {
    return node instanceof ObjectField
  }
  var isVoidField = function (node) {
    return node instanceof VoidField
  }
  var isFormState = function (state) {
    if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
      return false
    return (state === null || state === void 0 ? void 0 : state.displayName) === 'Form'
  }
  var isFieldState = function (state) {
    if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
      return false
    return (state === null || state === void 0 ? void 0 : state.displayName) === 'Field'
  }
  var isArrayFieldState = function (state) {
    if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
      return false
    return (
      (state === null || state === void 0 ? void 0 : state.displayName) === 'ArrayField'
    )
  }
  var isDataField = function (node) {
    return isField(node) || isArrayField(node) || isObjectField(node)
  }
  var isObjectFieldState = function (state) {
    if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
      return false
    return (
      (state === null || state === void 0 ? void 0 : state.displayName) === 'ObjectField'
    )
  }
  var isQuery = function (query) {
    return query && query instanceof Query
  }

  var Graph = /** @class */ (function () {
    function Graph(form) {
      var _this = this
      this.getGraph = function () {
        var graph = {}
        graph[''] = _this.form.getState()
        each(_this.form.fields, function (field, identifier) {
          graph[identifier] = field.getState()
        })
        return graph
      }
      this.setGraph = function (graph) {
        var form = _this.form
        var createField = function (identifier, state) {
          var address = Path.parse(identifier)
          var name = address.segments[address.segments.length - 1]
          var basePath = address.parent()
          if (isFieldState(state)) {
            return _this.form.createField({ name: name, basePath: basePath })
          } else if (isArrayFieldState(state)) {
            return _this.form.createArrayField({ name: name, basePath: basePath })
          } else if (isObjectFieldState(state)) {
            return _this.form.createObjectField({ name: name, basePath: basePath })
          } else {
            return _this.form.createVoidField({ name: name, basePath: basePath })
          }
        }
        each(graph, function (state, address) {
          if (isFormState(state)) {
            form.setState(state)
          } else {
            var field = form.fields[address]
            if (field) {
              field.setState(state)
            } else {
              createField(address, state).setState(state)
            }
          }
        })
      }
      this.form = form
      define(this, {
        setGraph: batch,
      })
    }
    return Graph
  })()

  var isValidateResult = function (obj) {
    return !!obj['type'] && !!obj['message']
  }

  var getIn = Path.getIn
  var self$1 = globalThisPolyfill
  var defaultLanguage = 'en'
  var getBrowserlanguage = function () {
    /* istanbul ignore next */
    if (!self$1.navigator) {
      return defaultLanguage
    }
    return (
      self$1.navigator.browserlanguage || self$1.navigator.language || defaultLanguage
    )
  }
  var registry = {
    locales: {
      messages: {},
      language: getBrowserlanguage(),
    },
    formats: {},
    rules: {},
    template: null,
  }
  var getISOCode = function (language) {
    var isoCode = registry.locales.language
    var lang = lowerCase(language)
    if (registry.locales.messages[language]) {
      return language
    }
    each(registry.locales.messages, function (messages, key) {
      var target = lowerCase(key)
      if (target.indexOf(lang) > -1 || lang.indexOf(target) > -1) {
        isoCode = key
        return false
      }
    })
    return isoCode
  }
  var getLocaleByPath = function (path, lang) {
    if (lang === void 0) {
      lang = registry.locales.language
    }
    return getIn(registry.locales.messages, ''.concat(getISOCode(lang), '.').concat(path))
  }
  var getValidateLocale = function (path) {
    var message = getLocaleByPath(path)
    return (
      message || getLocaleByPath('pattern') || getLocaleByPath('pattern', defaultLanguage)
    )
  }
  var getValidateMessageTemplateEngine = function () {
    return registry.template
  }
  var getValidateFormats = function (key) {
    return key ? registry.formats[key] : registry.formats
  }
  var getValidateRules = function (key) {
    return key ? registry.rules[key] : registry.rules
  }
  var registerValidateLocale = function (locale) {
    registry.locales.messages = merge(registry.locales.messages, locale)
  }
  var registerValidateRules = function (rules) {
    each(rules, function (rule, key) {
      if (isFn$2(rule)) {
        registry.rules[key] = rule
      }
    })
  }
  var registerValidateFormats = function (formats) {
    each(formats, function (pattern, key) {
      if (isStr$1(pattern) || pattern instanceof RegExp) {
        registry.formats[key] = new RegExp(pattern)
      }
    })
  }

  var render = function (result, rules) {
    var message = result.message
    if (isStr$1(result.message)) {
      var template = getValidateMessageTemplateEngine()
      if (isFn$2(template)) {
        result.message = template(message, rules)
      }
      result.message = result.message.replace(
        /\{\{\s*([\w.]+)\s*\}\}/g,
        function (_, $0) {
          return Path.getIn(rules, $0)
        },
      )
    }
    return result
  }

  var __assign$3 =
    (undefined && undefined.__assign) ||
    function () {
      __assign$3 =
        Object.assign ||
        function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
          }
          return t
        }
      return __assign$3.apply(this, arguments)
    }
  var __awaiter$4 =
    (undefined && undefined.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P
          ? value
          : new P(function (resolve) {
              resolve(value)
            })
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value))
          } catch (e) {
            reject(e)
          }
        }
        function rejected(value) {
          try {
            step(generator['throw'](value))
          } catch (e) {
            reject(e)
          }
        }
        function step(result) {
          result.done
            ? resolve(result.value)
            : adopt(result.value).then(fulfilled, rejected)
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
      })
    }
  var __generator$4 =
    (undefined && undefined.__generator) ||
    function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1]
            return t[1]
          },
          trys: [],
          ops: [],
        },
        f,
        y,
        t,
        g
      return (
        (g = { next: verb(0), throw: verb(1), return: verb(2) }),
        typeof Symbol === 'function' &&
          (g[Symbol.iterator] = function () {
            return this
          }),
        g
      )
      function verb(n) {
        return function (v) {
          return step([n, v])
        }
      }
      function step(op) {
        if (f) throw new TypeError('Generator is already executing.')
        while (_)
          try {
            if (
              ((f = 1),
              y &&
                (t =
                  op[0] & 2
                    ? y['return']
                    : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
                !(t = t.call(y, op[1])).done)
            )
              return t
            if (((y = 0), t)) op = [op[0] & 2, t.value]
            switch (op[0]) {
              case 0:
              case 1:
                t = op
                break
              case 4:
                _.label++
                return { value: op[1], done: false }
              case 5:
                _.label++
                y = op[1]
                op = [0]
                continue
              case 7:
                op = _.ops.pop()
                _.trys.pop()
                continue
              default:
                if (
                  !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                  (op[0] === 6 || op[0] === 2)
                ) {
                  _ = 0
                  continue
                }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                  _.label = op[1]
                  break
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1]
                  t = op
                  break
                }
                if (t && _.label < t[2]) {
                  _.label = t[2]
                  _.ops.push(op)
                  break
                }
                if (t[2]) _.ops.pop()
                _.trys.pop()
                continue
            }
            op = body.call(thisArg, _)
          } catch (e) {
            op = [6, e]
            y = 0
          } finally {
            f = t = 0
          }
        if (op[0] & 5) throw op[1]
        return { value: op[0] ? op[1] : void 0, done: true }
      }
    }
  var getRuleMessage = function (rule, type) {
    if (rule.format) {
      return rule.message || getValidateLocale(rule.format)
    }
    return rule.message || getValidateLocale(type)
  }
  var parseValidatorDescription = function (description) {
    if (!description) return {}
    var rules = {}
    if (isStr$1(description)) {
      rules.format = description
    } else if (isFn$2(description)) {
      rules.validator = description
    } else {
      rules = Object.assign(rules, description)
    }
    return rules
  }
  var parseValidatorDescriptions = function (validator) {
    if (!validator) return []
    var array = isArr$2(validator) ? validator : [validator]
    return array.map(function (description) {
      return parseValidatorDescription(description)
    })
  }
  var parseValidatorRules = function (rules) {
    if (rules === void 0) {
      rules = {}
    }
    var getRulesKeys = function () {
      var keys = []
      if ('required' in rules) {
        keys.push('required')
      }
      for (var key in rules) {
        if (key === 'required' || key === 'validator') continue
        keys.push(key)
      }
      if ('validator' in rules) {
        keys.push('validator')
      }
      return keys
    }
    var getContext = function (context, value) {
      return __assign$3(__assign$3(__assign$3({}, rules), context), { value: value })
    }
    var createValidate = function (callback, message) {
      return function (value, context) {
        return __awaiter$4(void 0, void 0, void 0, function () {
          var context_, results, e_1
          return __generator$4(this, function (_a) {
            switch (_a.label) {
              case 0:
                context_ = getContext(context, value)
                _a.label = 1
              case 1:
                _a.trys.push([1, 3, , 4])
                return [
                  4 /*yield*/,
                  callback(
                    value,
                    __assign$3(__assign$3({}, rules), { message: message }),
                    context_,
                    function (message, scope) {
                      var _a
                      return (_a = render(
                        {
                          type: 'error',
                          message: message,
                        },
                        Object.assign(context_, scope),
                      )) === null || _a === void 0
                        ? void 0
                        : _a.message
                    },
                  ),
                ]
              case 2:
                results = _a.sent()
                if (isBool(results)) {
                  if (!results) {
                    return [
                      2 /*return*/,
                      render(
                        {
                          type: 'error',
                          message: message,
                        },
                        context_,
                      ),
                    ]
                  }
                  return [
                    2 /*return*/,
                    {
                      type: 'error',
                      message: undefined,
                    },
                  ]
                } else if (results) {
                  if (isValidateResult(results)) {
                    return [2 /*return*/, render(results, context_)]
                  }
                  return [
                    2 /*return*/,
                    render(
                      {
                        type: 'error',
                        message: results,
                      },
                      context_,
                    ),
                  ]
                }
                return [
                  2 /*return*/,
                  {
                    type: 'error',
                    message: undefined,
                  },
                ]
              case 3:
                e_1 = _a.sent()
                return [
                  2 /*return*/,
                  {
                    type: 'error',
                    message:
                      (e_1 === null || e_1 === void 0 ? void 0 : e_1.message) || e_1,
                  },
                ]
              case 4:
                return [2 /*return*/]
            }
          })
        })
      }
    }
    return getRulesKeys().reduce(function (buf, key) {
      var callback = getValidateRules(key)
      if (callback) {
        var validator = createValidate(callback, getRuleMessage(rules, key))
        return buf.concat(validator)
      }
      return buf
    }, [])
  }
  var parseValidator = function (validator, options) {
    if (options === void 0) {
      options = {}
    }
    if (!validator) return []
    var array = isArr$2(validator) ? validator : [validator]
    return array.reduce(function (buf, description) {
      var _a
      var rules = parseValidatorDescription(description)
      var triggerType =
        (_a = rules.triggerType) !== null && _a !== void 0 ? _a : 'onInput'
      if (
        (options === null || options === void 0 ? void 0 : options.triggerType) &&
        options.triggerType !== triggerType
      )
        return buf
      return rules ? buf.concat(parseValidatorRules(rules)) : buf
    }, [])
  }

  var locales = {
    en: {
      pattern: 'This field is invalid',
      invalid: 'This field is invalid',
      required: 'The field value is required',
      number: 'The field value is not a number',
      integer: 'The field value is not an integer number',
      url: 'The field value is a invalid url',
      email: 'The field value is not a email format',
      ipv6: 'The field value is not a ipv6 format',
      ipv4: 'The field value is not a ipv4 format',
      idcard: 'The field value is not an idcard format',
      qq: 'The field value is not a qq number format',
      phone: 'The field value is not a phone number format',
      money: 'The field value is not a currency format',
      zh: 'The field value is not a chinese string',
      date: 'The field value is not a valid date format',
      zip: 'The field value is not a zip format',
      len: 'The length or number of entries must be {{len}}',
      min: 'The length or number of entries must be at least {{min}}',
      minLength: 'The length or number of entries must be at least {{minLength}}',
      minItems: 'The length or number of entries must be at least {{minItems}}',
      maximum: 'The field value cannot be greater than {{maximum}}',
      exclusiveMaximum: 'The field value must be less than {{exclusiveMaximum}}',
      minimum: 'The field value cannot be less than {{minimum}}',
      exclusiveMinimum: 'The field value must be greater than {{exclusiveMinimum}}',
      max: 'The field length or number of entries must be at most {{max}}',
      maxLength: 'The field length or number of entries must be at most {{maxLength}}',
      maxItems: 'The field length or number of entries must be at most {{maxItems}}',
      whitespace: 'This field value cannot be blank string.',
      enum: 'The field value must be one of {{enum}}',
      const: 'The field value must be equal to {{const}}',
      multipleOf: 'The field value must be divisible by {{multipleOf}}',
      maxProperties:
        'The number of field properties cannot be greater than {{maxProperties}}',
      minProperties:
        'The number of field properties cannot be less than {{maxProperties}}',
      uniqueItems: 'Array elements are not unique',
    },
    zh: {
      pattern: '该字段不是一个合法的字段',
      invalid: '该字段不是一个合法的字段',
      required: '该字段是必填字段',
      number: '该字段不是合法的数字',
      integer: '该字段不是合法的整型数字',
      url: '该字段不是合法的url',
      email: '该字段不是合法的邮箱格式',
      ipv6: '该字段不是合法的ipv6格式',
      ipv4: '该字段不是合法的ipv4格式',
      idcard: '该字段不是合法的身份证格式',
      qq: '该字段不符合QQ号格式',
      phone: '该字段不是有效的手机号',
      money: '该字段不是有效货币格式',
      zh: '该字段不是合法的中文字符串',
      date: '该字段不是合法的日期格式',
      zip: '该字段不是合法的邮编格式',
      len: '长度或条目数必须为{{len}}',
      min: '长度或条目数不能小于{{min}}',
      minLength: '长度或条目数不能小于{{minLength}}',
      minItems: '长度或条目数不能小于{{minItems}}',
      max: '长度或条目数不能大于{{max}}',
      maxLength: '长度或条目数不能大于{{maxLength}}',
      maxItems: '长度或条目数不能大于{{maxItems}}',
      maximum: '数值不能大于{{maximum}}',
      exclusiveMaximum: '数值必须小于{{exclusiveMaximum}}',
      minimum: '数值不能小于{{minimum}}',
      exclusiveMinimum: '数值必须大于{{exclusiveMinimum}}',
      whitespace: '不能为纯空白字符串',
      enum: '字段值必须为{{enum}}其中一个',
      const: '字段值必须等于{{const}}',
      multipleOf: '字段值不能被{{multipleOf}}整除',
      maxProperties: '字段属性数量不能大于{{maxProperties}}',
      minProperties: '字段属性数量不能小于{{minProperties}}',
      uniqueItems: '数组元素不唯一',
    },
    'en-US': {
      pattern: 'This field is invalid',
      invalid: 'This field is invalid',
      required: 'The field value is required',
      number: 'The field value is not a number',
      integer: 'The field value is not an integer number',
      url: 'The field value is a invalid url',
      email: 'The field value is not a email format',
      ipv6: 'The field value is not a ipv6 format',
      ipv4: 'The field value is not a ipv4 format',
      idcard: 'The field value is not an idcard format',
      qq: 'The field value is not a qq number format',
      phone: 'The field value is not a phone number format',
      money: 'The field value is not a currency format',
      zh: 'The field value is not a chinese string',
      date: 'The field value is not a valid date format',
      zip: 'The field value is not a zip format',
      len: 'The length or number of entries must be {{len}}',
      min: 'The length or number of entries must be at least {{min}}',
      minLength: 'The length or number of entries must be at least {{minLength}}',
      minItems: 'The length or number of entries must be at least {{minItems}}',
      maximum: 'The field value cannot be greater than {{maximum}}',
      exclusiveMaximum: 'The field value must be less than {{exclusiveMaximum}}',
      minimum: 'The field value cannot be less than {{minimum}}',
      exclusiveMinimum: 'The field value must be greater than {{exclusiveMinimum}}',
      max: 'The field length or number of entries must be at most {{max}}',
      maxLength: 'The field length or number of entries must be at most {{maxLength}}',
      maxItems: 'The field length or number of entries must be at most {{maxItems}}',
      whitespace: 'This field value cannot be blank string.',
      enum: 'The field value must be one of {{enum}}',
      const: 'The field value must be equal to {{const}}',
      multipleOf: 'The field value must be divisible by {{multipleOf}}',
      maxProperties:
        'The number of field properties cannot be greater than {{maxProperties}}',
      minProperties:
        'The number of field properties cannot be less than {{maxProperties}}',
      uniqueItems: 'Array elements are not unique',
    },
    'zh-CN': {
      pattern: '该字段不是一个合法的字段',
      invalid: '该字段不是一个合法的字段',
      required: '该字段是必填字段',
      number: '该字段不是合法的数字',
      integer: '该字段不是合法的整型数字',
      url: '该字段不是合法的url',
      email: '该字段不是合法的邮箱格式',
      ipv6: '该字段不是合法的ipv6格式',
      ipv4: '该字段不是合法的ipv4格式',
      idcard: '该字段不是合法的身份证格式',
      qq: '该字段不符合QQ号格式',
      phone: '该字段不是有效的手机号',
      money: '该字段不是有效货币格式',
      zh: '该字段不是合法的中文字符串',
      date: '该字段不是合法的日期格式',
      zip: '该字段不是合法的邮编格式',
      len: '长度或条目数必须为{{len}}',
      min: '长度或条目数不能小于{{min}}',
      minLength: '长度或条目数不能小于{{minLength}}',
      minItems: '长度或条目数不能小于{{minItems}}',
      maxLength: '长度或条目数不能大于{{maxLength}}',
      maxItems: '长度或条目数不能大于{{maxItems}}',
      max: '长度或条目数不能大于{{max}}',
      maximum: '数值不能大于{{maximum}}',
      exclusiveMaximum: '数值必须小于{{exclusiveMaximum}}',
      minimum: '数值不能小于{{minimum}}',
      exclusiveMinimum: '数值必须大于{{exclusiveMinimum}}',
      whitespace: '不能为纯空白字符串',
      enum: '字段值必须为{{enum}}其中一个',
      const: '字段值必须等于{{const}}',
      multipleOf: '字段值不能被{{multipleOf}}整除',
      maxProperties: '字段属性数量不能大于{{maxProperties}}',
      minProperties: '字段属性数量不能小于{{minProperties}}',
      uniqueItems: '数组元素不唯一',
    },
    'zh-TW': {
      pattern: '該字段不是一個合法的字段',
      invalid: '該字段不是一個合法的字段',
      required: '該字段是必填字段',
      number: '該字段不是合法的數字',
      integer: '該字段不是合法的整型數字',
      url: '該字段不是合法的url',
      email: '該字段不是合法的郵箱格式',
      ipv6: '該字段不是合法的ipv6格式',
      ipv4: '該字段不是合法的ipv4格式',
      idcard: '該字段不是合法的身份證格式',
      qq: '該字段不符合QQ號格式',
      phone: '該字段不是有效的手機號',
      money: '該字段不是有效貨幣格式',
      zh: '該字段不是合法的中文字符串',
      date: '該字段不是合法的日期格式',
      zip: '該字段不是合法的郵編格式',
      len: '長度或條目數必須為{{len}}',
      min: '長度或條目數不能小於{{min}}',
      minItems: '長度或條目數不能小於{{minItems}}',
      minLength: '長度或條目數不能小於{{minLength}}',
      max: '長度或條目數不能大於{{max}}',
      maxItems: '長度或條目數不能大於{{maxItems}}',
      maxLength: '長度或條目數不能大於{{maxLength}}',
      maximum: '數值不能大於{{maximum}}',
      exclusiveMaximum: '數值必須小於{{exclusiveMaximum}}',
      minimum: '數值不能小於{{minimum}}',
      exclusiveMinimum: '數值必須大於{{exclusiveMinimum}}',
      whitespace: '不能為純空白字符串',
      enum: '字段值必須為{{enum}}其中一個',
      const: '字段值必須等於{{const}}',
      multipleOf: '字段值不能被{{multipleOf}}整除',
      maxProperties: '字段屬性數量不能大於{{maxProperties}}',
      minProperties: '字段屬性數量不能小於{{minProperties}}',
      uniqueItems: '數組元素不唯一',
    },
    ja: {
      url: 'このフィールドは無効なURLです',
      whitespace: 'このフィールドを空の文字列にすることはできません。',
      zh: 'このフィールドは中国語の文字列ではありません',
      zip: 'このフィールドはzip形式ではありません',
      date: 'このフィールドは有効な日付形式ではありません',
      email: 'このフィールドはメール形式ではありません',
      exclusiveMaximum: '値は{{exclusiveMaximum}}未満である必要があります',
      exclusiveMinimum: '値は{{exclusiveMinimum}}より大きい必要があります',
      idcard: 'このフィールドはIDカード形式ではありません',
      integer: 'このフィールドは整数ではありません',
      ipv4: 'このフィールドはIPv4形式ではありません',
      ipv6: 'このフィールドはIPv6形式ではありません',
      len: 'エントリの長さまたは数は{{len}}でなければなりません',
      max: 'エントリの長さまたは数は最大{{max}}でなければなりません',
      maxItems: 'エントリの長さまたは数は最大{{maxItems}}でなければなりません',
      maxLength: 'エントリの長さまたは数は最大{{maxLength}}でなければなりません',
      maximum: '値は{{最大}}を超えることはできません',
      min: 'エントリの長さまたは数は、少なくとも{{min}}である必要があります',
      minItems: 'エントリの長さまたは数は、少なくとも{{minItems}}である必要があります',
      minLength: 'エントリの長さまたは数は、少なくとも{{minLength}}である必要があります',
      minimum: '値は{{minimum}}以上にする必要があります',
      money: 'このフィールドは通貨形式ではありません',
      number: 'このフィールドは数値ではありません',
      pattern: 'このフィールドはどのパターンとも一致しません',
      invalid: 'このフィールドはどのパターンとも一致しません',
      phone: 'このフィールドは電話番号の形式ではありません',
      qq: 'このフィールドはqq数値形式ではありません',
      required: 'この項目は必須です',
      enum: 'フィールド値は{{enum}}のいずれかである必要があります',
      cons: 'フィールド値は{{const}}と等しくなければなりません',
      multipleOf: 'フィールド値を{{multipleOf}}で割り切れない',
      maxProperties:
        'フィールドプロパティの数は{{maxProperties}}を超えることはできません',
      minProperties:
        'フィールドプロパティの数は{{minProperties}}未満にすることはできません',
      uniqueItems: '配列要素は一意ではありません',
    },
  }

  var formats = {
    url: new RegExp(
      // protocol identifier
      '^(?:(?:(?:https?|ftp|rtmp):)?//)' +
        // user:pass authentication
        '(?:\\S+(?::\\S*)?@)?' +
        '(?:' +
        // IP address exclusion - private & local networks
        // Reference: https://www.arin.net/knowledge/address_filters.html
        // filter 10.*.*.* and 127.*.*.* addresses
        '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
        // filter 169.254.*.* and 192.168.*.*
        '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
        // filter 172.16.0.0 - 172.31.255.255
        // TODO: add test to validate that it invalidates address in 16-31 range
        '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broadcast addresses
        // (first & last IP address of each class)
        // filter 1. part for 1-223
        '(?:22[0-3]|2[01]\\d|[1-9]\\d?|1\\d\\d)' +
        // filter 2. and 3. part for 0-255
        '(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})){2}' +
        // filter 4. part for 1-254
        '(?:\\.(?:25[0-4]|2[0-4]\\d|1\\d\\d|[1-9]\\d?))' +
        '|' +
        // host name
        '(?:(?:[a-z\\u00a1-\\uffff0-9_]-*)*[a-z\\u00a1-\\uffff0-9_]+)' +
        // domain name
        '(?:\\.(?:[a-z\\u00a1-\\uffff0-9_]-*)*[a-z\\u00a1-\\uffff0-9_]+)*' +
        // TLD identifier
        '(?:\\.(?:[a-z\\u00a1-\\uffff_]{2,}))' +
        ')' +
        // port number
        '(?::\\d{2,5})?' +
        // resource path
        '(?:/?\\S*)?$',
    ),
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
    ipv4: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/,
    number: /^[+-]?\d+(\.\d+)?$/,
    integer: /^[+-]?\d+$/,
    qq: /^(\+?[1-9]\d*|0)$/,
    phone: /^\d{3}-\d{8}$|^\d{4}-\d{7}$|^\d{11}$/,
    idcard: /^\d{15}$|^\d{17}(\d|x|X)$/,
    money:
      /^([\u0024\u00A2\u00A3\u00A4\u20AC\u00A5\u20B1\u20B9\uFFE5]\s*)(\d+,?)+\.?\d*\s*$/,
    zh: /^[\u4e00-\u9fa5]+$/,
    date: /^[0-9]+[./-][0-9]+[./-][0-9]+\s*(?:[0-9]+\s*:\s*[0-9]+\s*:\s*[0-9]+)?$/,
    zip: /^[0-9]{6}$/,
  }

  var __assign$2 =
    (undefined && undefined.__assign) ||
    function () {
      __assign$2 =
        Object.assign ||
        function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
          }
          return t
        }
      return __assign$2.apply(this, arguments)
    }
  var __awaiter$3 =
    (undefined && undefined.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P
          ? value
          : new P(function (resolve) {
              resolve(value)
            })
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value))
          } catch (e) {
            reject(e)
          }
        }
        function rejected(value) {
          try {
            step(generator['throw'](value))
          } catch (e) {
            reject(e)
          }
        }
        function step(result) {
          result.done
            ? resolve(result.value)
            : adopt(result.value).then(fulfilled, rejected)
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
      })
    }
  var __generator$3 =
    (undefined && undefined.__generator) ||
    function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1]
            return t[1]
          },
          trys: [],
          ops: [],
        },
        f,
        y,
        t,
        g
      return (
        (g = { next: verb(0), throw: verb(1), return: verb(2) }),
        typeof Symbol === 'function' &&
          (g[Symbol.iterator] = function () {
            return this
          }),
        g
      )
      function verb(n) {
        return function (v) {
          return step([n, v])
        }
      }
      function step(op) {
        if (f) throw new TypeError('Generator is already executing.')
        while (_)
          try {
            if (
              ((f = 1),
              y &&
                (t =
                  op[0] & 2
                    ? y['return']
                    : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
                !(t = t.call(y, op[1])).done)
            )
              return t
            if (((y = 0), t)) op = [op[0] & 2, t.value]
            switch (op[0]) {
              case 0:
              case 1:
                t = op
                break
              case 4:
                _.label++
                return { value: op[1], done: false }
              case 5:
                _.label++
                y = op[1]
                op = [0]
                continue
              case 7:
                op = _.ops.pop()
                _.trys.pop()
                continue
              default:
                if (
                  !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                  (op[0] === 6 || op[0] === 2)
                ) {
                  _ = 0
                  continue
                }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                  _.label = op[1]
                  break
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1]
                  t = op
                  break
                }
                if (t && _.label < t[2]) {
                  _.label = t[2]
                  _.ops.push(op)
                  break
                }
                if (t[2]) _.ops.pop()
                _.trys.pop()
                continue
            }
            op = body.call(thisArg, _)
          } catch (e) {
            op = [6, e]
            y = 0
          } finally {
            f = t = 0
          }
        if (op[0] & 5) throw op[1]
        return { value: op[0] ? op[1] : void 0, done: true }
      }
    }
  var __read$2 =
    (undefined && undefined.__read) ||
    function (o, n) {
      var m = typeof Symbol === 'function' && o[Symbol.iterator]
      if (!m) return o
      var i = m.call(o),
        r,
        ar = [],
        e
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
      } catch (error) {
        e = { error: error }
      } finally {
        try {
          if (r && !r.done && (m = i['return'])) m.call(i)
        } finally {
          if (e) throw e.error
        }
      }
      return ar
    }
  var __spreadArray$2 =
    (undefined && undefined.__spreadArray) ||
    function (to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i)
            ar[i] = from[i]
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from))
    }
  var isValidateEmpty = function (value) {
    var _a
    if (isArr$2(value)) {
      for (var i = 0; i < value.length; i++) {
        if (isValid$3(value[i])) return false
      }
      return true
    } else {
      //compat to draft-js
      if (value === null || value === void 0 ? void 0 : value.getCurrentContent) {
        /* istanbul ignore next */
        return !((_a = value.getCurrentContent()) === null || _a === void 0
          ? void 0
          : _a.hasText())
      }
      return isEmpty(value)
    }
  }
  var getLength = function (value) {
    return isStr$1(value) ? stringLength(value) : value ? value.length : 0
  }
  var extendSameRules = function (rules, names) {
    each(names, function (realName, name) {
      rules[name] = function (value, rule) {
        var _a
        var args = []
        for (var _i = 2; _i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i]
        }
        return rules[realName].apply(
          rules,
          __spreadArray$2(
            [
              value,
              __assign$2(
                __assign$2({}, rule),
                ((_a = {}), (_a[realName] = rule[name]), _a),
              ),
            ],
            __read$2(args),
            false,
          ),
        )
      }
    })
  }
  var RULES = {
    format: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      if (rule.format) {
        var format = getValidateFormats(rule.format)
        if (format) {
          return !new RegExp(format).test(value) ? rule.message : ''
        }
      }
      return ''
    },
    required: function (value, rule) {
      if (rule.required === false) return ''
      return isValidateEmpty(value) ? rule.message : ''
    },
    max: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      var length = isNum$1(value) ? value : getLength(value)
      var max = Number(rule.max)
      return length > max ? rule.message : ''
    },
    min: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      var length = isNum$1(value) ? value : getLength(value)
      var min = Number(rule.min)
      return length < min ? rule.message : ''
    },
    exclusiveMaximum: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      var length = isNum$1(value) ? value : getLength(value)
      var max = Number(rule.exclusiveMaximum)
      return length >= max ? rule.message : ''
    },
    exclusiveMinimum: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      var length = isNum$1(value) ? value : getLength(value)
      var min = Number(rule.exclusiveMinimum)
      return length <= min ? rule.message : ''
    },
    len: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      var length = getLength(value)
      var len = Number(rule.len)
      return length !== len ? rule.message : ''
    },
    pattern: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      return !new RegExp(rule.pattern).test(value) ? rule.message : ''
    },
    validator: function (value, rule, context, format) {
      return __awaiter$3(this, void 0, void 0, function () {
        var response
        return __generator$3(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!isFn$2(rule.validator)) return [3 /*break*/, 2]
              return [
                4 /*yield*/,
                Promise.resolve(rule.validator(value, rule, context, format)),
              ]
            case 1:
              response = _a.sent()
              if (isBool(response)) {
                return [2 /*return*/, !response ? rule.message : '']
              } else {
                return [2 /*return*/, response]
              }
            case 2:
              /* istanbul ignore next */
              throw new Error("The rule's validator property must be a function.")
          }
        })
      })
    },
    whitespace: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      if (rule.whitespace) {
        return /^\s+$/.test(value) ? rule.message : ''
      }
    },
    enum: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      var enums = toArr$1(rule.enum)
      return enums.indexOf(value) === -1 ? rule.message : ''
    },
    const: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      return rule.const !== value ? rule.message : ''
    },
    multipleOf: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      return Number(value) % Number(rule.multipleOf) !== 0 ? rule.message : ''
    },
    uniqueItems: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      value = toArr$1(value)
      return value.some(function (item, index) {
        for (var i = 0; i < value.length; i++) {
          if (i !== index && !isEqual$1(value[i], item)) {
            return false
          }
        }
        return true
      })
        ? ''
        : rule.message
    },
    maxProperties: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      return Object.keys(value || {}).length <= Number(rule.maxProperties)
        ? ''
        : rule.message
    },
    minProperties: function (value, rule) {
      if (isValidateEmpty(value)) return ''
      return Object.keys(value || {}).length >= Number(rule.minProperties)
        ? ''
        : rule.message
    },
  }
  extendSameRules(RULES, {
    maximum: 'max',
    minimum: 'min',
    maxItems: 'max',
    minItems: 'min',
    maxLength: 'max',
    minLength: 'min',
  })

  var __awaiter$2 =
    (undefined && undefined.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P
          ? value
          : new P(function (resolve) {
              resolve(value)
            })
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value))
          } catch (e) {
            reject(e)
          }
        }
        function rejected(value) {
          try {
            step(generator['throw'](value))
          } catch (e) {
            reject(e)
          }
        }
        function step(result) {
          result.done
            ? resolve(result.value)
            : adopt(result.value).then(fulfilled, rejected)
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
      })
    }
  var __generator$2 =
    (undefined && undefined.__generator) ||
    function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1]
            return t[1]
          },
          trys: [],
          ops: [],
        },
        f,
        y,
        t,
        g
      return (
        (g = { next: verb(0), throw: verb(1), return: verb(2) }),
        typeof Symbol === 'function' &&
          (g[Symbol.iterator] = function () {
            return this
          }),
        g
      )
      function verb(n) {
        return function (v) {
          return step([n, v])
        }
      }
      function step(op) {
        if (f) throw new TypeError('Generator is already executing.')
        while (_)
          try {
            if (
              ((f = 1),
              y &&
                (t =
                  op[0] & 2
                    ? y['return']
                    : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
                !(t = t.call(y, op[1])).done)
            )
              return t
            if (((y = 0), t)) op = [op[0] & 2, t.value]
            switch (op[0]) {
              case 0:
              case 1:
                t = op
                break
              case 4:
                _.label++
                return { value: op[1], done: false }
              case 5:
                _.label++
                y = op[1]
                op = [0]
                continue
              case 7:
                op = _.ops.pop()
                _.trys.pop()
                continue
              default:
                if (
                  !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                  (op[0] === 6 || op[0] === 2)
                ) {
                  _ = 0
                  continue
                }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                  _.label = op[1]
                  break
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1]
                  t = op
                  break
                }
                if (t && _.label < t[2]) {
                  _.label = t[2]
                  _.ops.push(op)
                  break
                }
                if (t[2]) _.ops.pop()
                _.trys.pop()
                continue
            }
            op = body.call(thisArg, _)
          } catch (e) {
            op = [6, e]
            y = 0
          } finally {
            f = t = 0
          }
        if (op[0] & 5) throw op[1]
        return { value: op[0] ? op[1] : void 0, done: true }
      }
    }
  registerValidateRules(RULES)
  registerValidateLocale(locales)
  registerValidateFormats(formats)
  var validate = function (value, validator, options) {
    return __awaiter$2(void 0, void 0, void 0, function () {
      var validates, results, i, result, type, message
      return __generator$2(this, function (_a) {
        switch (_a.label) {
          case 0:
            validates = parseValidator(validator, options)
            results = {
              error: [],
              success: [],
              warning: [],
            }
            i = 0
            _a.label = 1
          case 1:
            if (!(i < validates.length)) return [3 /*break*/, 4]
            return [
              4 /*yield*/,
              validates[i](
                value,
                options === null || options === void 0 ? void 0 : options.context,
              ),
            ]
          case 2:
            result = _a.sent()
            ;(type = result.type), (message = result.message)
            results[type] = results[type] || []
            if (message) {
              results[type].push(message)
              if (options === null || options === void 0 ? void 0 : options.validateFirst)
                return [3 /*break*/, 4]
            }
            _a.label = 3
          case 3:
            i++
            return [3 /*break*/, 1]
          case 4:
            return [2 /*return*/, results]
        }
      })
    })
  }

  var LifeCycleTypes
  ;(function (LifeCycleTypes) {
    /**
     * Form LifeCycle
     **/
    LifeCycleTypes['ON_FORM_INIT'] = 'onFormInit'
    LifeCycleTypes['ON_FORM_MOUNT'] = 'onFormMount'
    LifeCycleTypes['ON_FORM_UNMOUNT'] = 'onFormUnmount'
    LifeCycleTypes['ON_FORM_INPUT_CHANGE'] = 'onFormInputChange'
    LifeCycleTypes['ON_FORM_VALUES_CHANGE'] = 'onFormValuesChange'
    LifeCycleTypes['ON_FORM_INITIAL_VALUES_CHANGE'] = 'onFormInitialValuesChange'
    LifeCycleTypes['ON_FORM_SUBMIT'] = 'onFormSubmit'
    LifeCycleTypes['ON_FORM_RESET'] = 'onFormReset'
    LifeCycleTypes['ON_FORM_SUBMIT_START'] = 'onFormSubmitStart'
    LifeCycleTypes['ON_FORM_SUBMITTING'] = 'onFormSubmitting'
    LifeCycleTypes['ON_FORM_SUBMIT_END'] = 'onFormSubmitEnd'
    LifeCycleTypes['ON_FORM_SUBMIT_VALIDATE_START'] = 'onFormSubmitValidateStart'
    LifeCycleTypes['ON_FORM_SUBMIT_VALIDATE_SUCCESS'] = 'onFormSubmitValidateSuccess'
    LifeCycleTypes['ON_FORM_SUBMIT_VALIDATE_FAILED'] = 'onFormSubmitValidateFailed'
    LifeCycleTypes['ON_FORM_SUBMIT_VALIDATE_END'] = 'onFormSubmitValidateEnd'
    LifeCycleTypes['ON_FORM_SUBMIT_SUCCESS'] = 'onFormSubmitSuccess'
    LifeCycleTypes['ON_FORM_SUBMIT_FAILED'] = 'onFormSubmitFailed'
    LifeCycleTypes['ON_FORM_VALIDATE_START'] = 'onFormValidateStart'
    LifeCycleTypes['ON_FORM_VALIDATING'] = 'onFormValidating'
    LifeCycleTypes['ON_FORM_VALIDATE_SUCCESS'] = 'onFormValidateSuccess'
    LifeCycleTypes['ON_FORM_VALIDATE_FAILED'] = 'onFormValidateFailed'
    LifeCycleTypes['ON_FORM_VALIDATE_END'] = 'onFormValidateEnd'
    LifeCycleTypes['ON_FORM_GRAPH_CHANGE'] = 'onFormGraphChange'
    LifeCycleTypes['ON_FORM_LOADING'] = 'onFormLoading'
    /**
     * Field LifeCycle
     **/
    LifeCycleTypes['ON_FIELD_INIT'] = 'onFieldInit'
    LifeCycleTypes['ON_FIELD_INPUT_VALUE_CHANGE'] = 'onFieldInputValueChange'
    LifeCycleTypes['ON_FIELD_VALUE_CHANGE'] = 'onFieldValueChange'
    LifeCycleTypes['ON_FIELD_INITIAL_VALUE_CHANGE'] = 'onFieldInitialValueChange'
    LifeCycleTypes['ON_FIELD_SUBMIT'] = 'onFieldSubmit'
    LifeCycleTypes['ON_FIELD_SUBMIT_START'] = 'onFieldSubmitStart'
    LifeCycleTypes['ON_FIELD_SUBMITTING'] = 'onFieldSubmitting'
    LifeCycleTypes['ON_FIELD_SUBMIT_END'] = 'onFieldSubmitEnd'
    LifeCycleTypes['ON_FIELD_SUBMIT_VALIDATE_START'] = 'onFieldSubmitValidateStart'
    LifeCycleTypes['ON_FIELD_SUBMIT_VALIDATE_SUCCESS'] = 'onFieldSubmitValidateSuccess'
    LifeCycleTypes['ON_FIELD_SUBMIT_VALIDATE_FAILED'] = 'onFieldSubmitValidateFailed'
    LifeCycleTypes['ON_FIELD_SUBMIT_VALIDATE_END'] = 'onFieldSubmitValidateEnd'
    LifeCycleTypes['ON_FIELD_SUBMIT_SUCCESS'] = 'onFieldSubmitSuccess'
    LifeCycleTypes['ON_FIELD_SUBMIT_FAILED'] = 'onFieldSubmitFailed'
    LifeCycleTypes['ON_FIELD_VALIDATE_START'] = 'onFieldValidateStart'
    LifeCycleTypes['ON_FIELD_VALIDATING'] = 'onFieldValidating'
    LifeCycleTypes['ON_FIELD_VALIDATE_SUCCESS'] = 'onFieldValidateSuccess'
    LifeCycleTypes['ON_FIELD_VALIDATE_FAILED'] = 'onFieldValidateFailed'
    LifeCycleTypes['ON_FIELD_VALIDATE_END'] = 'onFieldValidateEnd'
    LifeCycleTypes['ON_FIELD_LOADING'] = 'onFieldLoading'
    LifeCycleTypes['ON_FIELD_RESET'] = 'onFieldReset'
    LifeCycleTypes['ON_FIELD_MOUNT'] = 'onFieldMount'
    LifeCycleTypes['ON_FIELD_UNMOUNT'] = 'onFieldUnmount'
  })(LifeCycleTypes || (LifeCycleTypes = {}))

  var ReservedProperties = {
    form: true,
    parent: true,
    props: true,
    caches: true,
    requests: true,
    disposers: true,
    heart: true,
    graph: true,
    indexes: true,
    fields: true,
    lifecycles: true,
    componentType: true,
    componentProps: true,
    decoratorType: true,
    decoratorProps: true,
  }
  var ReadOnlyProperties = {
    address: true,
    path: true,
    valid: true,
    invalid: true,
    selfValid: true,
    selfInvalid: true,
    errors: true,
    successes: true,
    warnings: true,
    validateStatus: true,
  }
  var SELF_DISPLAY = 'selfDisplay'
  var SELF_PATTERN = 'selfPattern'
  var MutuallyExclusiveProperties = {
    pattern: SELF_PATTERN,
    editable: SELF_PATTERN,
    readOnly: SELF_PATTERN,
    readPretty: SELF_PATTERN,
    disabled: SELF_PATTERN,
    display: SELF_DISPLAY,
    hidden: SELF_DISPLAY,
    visible: SELF_DISPLAY,
  }
  var RESPONSE_REQUEST_DURATION = 100
  var GlobalState = {
    lifecycles: [],
    context: [],
    effectStart: false,
    effectEnd: false,
    initializing: false,
  }
  var NumberIndexReg = /^\.(\d+)/

  var __assign$1 =
    (undefined && undefined.__assign) ||
    function () {
      __assign$1 =
        Object.assign ||
        function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
          }
          return t
        }
      return __assign$1.apply(this, arguments)
    }
  var __awaiter$1 =
    (undefined && undefined.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P
          ? value
          : new P(function (resolve) {
              resolve(value)
            })
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value))
          } catch (e) {
            reject(e)
          }
        }
        function rejected(value) {
          try {
            step(generator['throw'](value))
          } catch (e) {
            reject(e)
          }
        }
        function step(result) {
          result.done
            ? resolve(result.value)
            : adopt(result.value).then(fulfilled, rejected)
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
      })
    }
  var __generator$1 =
    (undefined && undefined.__generator) ||
    function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1]
            return t[1]
          },
          trys: [],
          ops: [],
        },
        f,
        y,
        t,
        g
      return (
        (g = { next: verb(0), throw: verb(1), return: verb(2) }),
        typeof Symbol === 'function' &&
          (g[Symbol.iterator] = function () {
            return this
          }),
        g
      )
      function verb(n) {
        return function (v) {
          return step([n, v])
        }
      }
      function step(op) {
        if (f) throw new TypeError('Generator is already executing.')
        while (_)
          try {
            if (
              ((f = 1),
              y &&
                (t =
                  op[0] & 2
                    ? y['return']
                    : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
                !(t = t.call(y, op[1])).done)
            )
              return t
            if (((y = 0), t)) op = [op[0] & 2, t.value]
            switch (op[0]) {
              case 0:
              case 1:
                t = op
                break
              case 4:
                _.label++
                return { value: op[1], done: false }
              case 5:
                _.label++
                y = op[1]
                op = [0]
                continue
              case 7:
                op = _.ops.pop()
                _.trys.pop()
                continue
              default:
                if (
                  !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                  (op[0] === 6 || op[0] === 2)
                ) {
                  _ = 0
                  continue
                }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                  _.label = op[1]
                  break
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1]
                  t = op
                  break
                }
                if (t && _.label < t[2]) {
                  _.label = t[2]
                  _.ops.push(op)
                  break
                }
                if (t[2]) _.ops.pop()
                _.trys.pop()
                continue
            }
            op = body.call(thisArg, _)
          } catch (e) {
            op = [6, e]
            y = 0
          } finally {
            f = t = 0
          }
        if (op[0] & 5) throw op[1]
        return { value: op[0] ? op[1] : void 0, done: true }
      }
    }
  var hasOwnProperty = Object.prototype.hasOwnProperty
  var notify = function (target, formType, fieldType) {
    if (isForm(target)) {
      target.notify(formType)
    } else {
      target.notify(fieldType)
    }
  }
  var isHTMLInputEvent = function (event, stopPropagation) {
    var _a
    if (stopPropagation === void 0) {
      stopPropagation = true
    }
    if (event === null || event === void 0 ? void 0 : event.target) {
      if (
        typeof event.target === 'object' &&
        ('value' in event.target || 'checked' in event.target)
      )
        return true
      if (stopPropagation)
        (_a = event.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(event)
    }
    return false
  }
  var getValuesFromEvent = function (args) {
    return args.map(function (event) {
      if (event === null || event === void 0 ? void 0 : event.target) {
        if (isValid$3(event.target.value)) return event.target.value
        if (isValid$3(event.target.checked)) return event.target.checked
        return
      }
      return event
    })
  }
  var getTypedDefaultValue = function (field) {
    if (isArrayField(field)) return []
    if (isObjectField(field)) return {}
  }
  var buildFieldPath = function (field) {
    return buildDataPath(field.form.fields, field.address)
  }
  var buildDataPath = function (fields, pattern) {
    var prevArray = false
    var segments = pattern.segments
    var path = segments.reduce(function (path, key, index) {
      var currentPath = path.concat(key)
      var currentAddress = segments.slice(0, index + 1)
      var current = fields[currentAddress.join('.')]
      if (prevArray) {
        if (!isVoidField(current)) {
          prevArray = false
        }
        return path
      }
      if (index >= segments.length - 1) {
        return currentPath
      }
      if (isVoidField(current)) {
        var parentAddress = segments.slice(0, index)
        var parent_1 = fields[parentAddress.join('.')]
        if (isArrayField(parent_1) && isNumberLike$1(key)) {
          prevArray = true
          return currentPath
        }
        return path
      } else {
        prevArray = false
      }
      return currentPath
    }, [])
    return new Path(path)
  }
  var locateNode = function (field, address) {
    field.address = Path.parse(address)
    field.path = buildFieldPath(field)
    field.form.indexes[field.path.toString()] = field.address.toString()
    return field
  }
  var patchFieldStates = function (target, patches) {
    patches.forEach(function (_a) {
      var type = _a.type,
        address = _a.address,
        oldAddress = _a.oldAddress,
        payload = _a.payload
      if (type === 'remove') {
        destroy(target, address, false)
      } else if (type === 'update') {
        if (payload) {
          target[address] = payload
          if (target[oldAddress] === payload) {
            delete target[oldAddress]
          }
        }
        if (address && payload) {
          locateNode(payload, address)
        }
      }
    })
  }
  var destroy = function (target, address, removeValue) {
    if (removeValue === void 0) {
      removeValue = true
    }
    var field = target[address]
    field === null || field === void 0 ? void 0 : field.dispose()
    if (isDataField(field) && removeValue) {
      var form = field.form
      var path = field.path
      form.deleteValuesIn(path)
      form.deleteInitialValuesIn(path)
    }
    delete target[address]
  }
  var patchFormValues = function (form, path, source) {
    var update = function (path, source) {
      if (path.length) {
        form.setValuesIn(path, clone(source))
      } else {
        Object.assign(form.values, clone(source))
      }
    }
    var patch = function (source, path) {
      if (path === void 0) {
        path = []
      }
      var targetValue = form.getValuesIn(path)
      var targetField = form.query(path).take()
      var isUnVoidField = targetField && !isVoidField(targetField)
      if (isUnVoidField && targetField.display === 'none') {
        targetField.caches.value = clone(source)
        return
      }
      if (allowAssignDefaultValue(targetValue, source)) {
        update(path, source)
      } else {
        if (isEmpty(source)) return
        if (GlobalState.initializing) return
        if (isPlainObj$1(targetValue) && isPlainObj$1(source)) {
          each(source, function (value, key) {
            patch(value, path.concat(key))
          })
        } else {
          if (targetField) {
            if (isUnVoidField && !targetField.selfModified) {
              update(path, source)
            }
          } else if (form.initialized) {
            update(path, source)
          }
        }
      }
    }
    patch(source, path)
  }
  var matchFeedback = function (search, feedback) {
    if (!search || !feedback) return false
    if (search.type && search.type !== feedback.type) return false
    if (search.code && search.code !== feedback.code) return false
    if (search.path && feedback.path) {
      if (!Path.parse(search.path).match(feedback.path)) return false
    }
    if (search.address && feedback.address) {
      if (!Path.parse(search.address).match(feedback.address)) return false
    }
    if (search.triggerType && search.triggerType !== feedback.triggerType) return false
    return true
  }
  var queryFeedbacks = function (field, search) {
    return field.feedbacks.filter(function (feedback) {
      var _a, _b, _c
      if (!((_a = feedback.messages) === null || _a === void 0 ? void 0 : _a.length))
        return false
      return matchFeedback(
        search,
        __assign$1(__assign$1({}, feedback), {
          address:
            (_b = field.address) === null || _b === void 0 ? void 0 : _b.toString(),
          path: (_c = field.path) === null || _c === void 0 ? void 0 : _c.toString(),
        }),
      )
    })
  }
  var queryFeedbackMessages = function (field, search) {
    if (!field.feedbacks.length) return []
    return queryFeedbacks(field, search).reduce(function (buf, info) {
      return isEmpty(info.messages) ? buf : buf.concat(info.messages)
    }, [])
  }
  var updateFeedback = function (field, feedback) {
    if (!feedback) return
    return batch(function () {
      var _a, _b
      if (!field.feedbacks.length) {
        if (!((_a = feedback.messages) === null || _a === void 0 ? void 0 : _a.length)) {
          return
        }
        field.feedbacks = [feedback]
      } else {
        var searched_1 = queryFeedbacks(field, feedback)
        if (searched_1.length) {
          field.feedbacks = field.feedbacks.reduce(function (buf, item) {
            var _a
            if (searched_1.includes(item)) {
              if (
                (_a = feedback.messages) === null || _a === void 0 ? void 0 : _a.length
              ) {
                item.messages = feedback.messages
                return buf.concat(item)
              } else {
                return buf
              }
            } else {
              return buf.concat(item)
            }
          }, [])
          return
        } else if (
          (_b = feedback.messages) === null || _b === void 0 ? void 0 : _b.length
        ) {
          field.feedbacks = field.feedbacks.concat(feedback)
        }
      }
    })
  }
  var validateToFeedbacks = function (field, triggerType) {
    if (triggerType === void 0) {
      triggerType = 'onInput'
    }
    return __awaiter$1(void 0, void 0, void 0, function () {
      var results
      var _a
      return __generator$1(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              validate(field.value, field.validator, {
                triggerType: triggerType,
                validateFirst:
                  (_a = field.props.validateFirst) !== null && _a !== void 0
                    ? _a
                    : field.form.props.validateFirst,
                context: { field: field, form: field.form },
              }),
            ]
          case 1:
            results = _b.sent()
            batch(function () {
              each(results, function (messages, type) {
                field.setFeedback({
                  triggerType: triggerType,
                  type: type,
                  code: pascalCase('validate-'.concat(type)),
                  messages: messages,
                })
              })
            })
            return [2 /*return*/, results]
        }
      })
    })
  }
  var setValidatorRule = function (field, name, value) {
    var _a
    if (!isValid$3(value)) return
    var validators = parseValidatorDescriptions(field.validator)
    var hasRule = validators.some(function (desc) {
      return name in desc
    })
    var rule = ((_a = {}), (_a[name] = value), _a)
    if (hasRule) {
      field.validator = validators.map(function (desc) {
        if (isPlainObj$1(desc) && hasOwnProperty.call(desc, name)) {
          desc[name] = value
          return desc
        }
        return desc
      })
    } else {
      if (name === 'required') {
        field.validator = [rule].concat(validators)
      } else {
        field.validator = validators.concat(rule)
      }
    }
  }
  var spliceArrayState = function (field, props) {
    var _a = __assign$1({ startIndex: 0, deleteCount: 0, insertCount: 0 }, props),
      startIndex = _a.startIndex,
      deleteCount = _a.deleteCount,
      insertCount = _a.insertCount
    var address = field.address.toString()
    var addrLength = address.length
    var form = field.form
    var fields = form.fields
    var fieldPatches = []
    var offset = insertCount - deleteCount
    var isArrayChildren = function (identifier) {
      return identifier.indexOf(address) === 0 && identifier.length > addrLength
    }
    var isAfterNode = function (identifier) {
      var _a
      var afterStr = identifier.substring(addrLength)
      var number =
        (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1]
      if (number === undefined) return false
      var index = Number(number)
      return index > startIndex + deleteCount - 1
    }
    var isInsertNode = function (identifier) {
      var _a
      var afterStr = identifier.substring(addrLength)
      var number =
        (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1]
      if (number === undefined) return false
      var index = Number(number)
      return index >= startIndex && index < startIndex + insertCount
    }
    var isDeleteNode = function (identifier) {
      var _a
      var preStr = identifier.substring(0, addrLength)
      var afterStr = identifier.substring(addrLength)
      var number =
        (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1]
      if (number === undefined) return false
      var index = Number(number)
      return (
        (index > startIndex &&
          !fields[
            ''
              .concat(preStr)
              .concat(afterStr.replace(/^\.\d+/, '.'.concat(index + deleteCount)))
          ]) ||
        index === startIndex
      )
    }
    var moveIndex = function (identifier) {
      var _a
      if (offset === 0) return identifier
      var preStr = identifier.substring(0, addrLength)
      var afterStr = identifier.substring(addrLength)
      var number =
        (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1]
      if (number === undefined) return identifier
      var index = Number(number) + offset
      return ''.concat(preStr).concat(afterStr.replace(/^\.\d+/, '.'.concat(index)))
    }
    batch(function () {
      each(fields, function (field, identifier) {
        if (isArrayChildren(identifier)) {
          if (isAfterNode(identifier)) {
            var newIdentifier = moveIndex(identifier)
            fieldPatches.push({
              type: 'update',
              address: newIdentifier,
              oldAddress: identifier,
              payload: field,
            })
          }
          if (isInsertNode(identifier) || isDeleteNode(identifier)) {
            if (isDataField(field)) {
              form.deleteInitialValuesIn(field.path)
            }
            fieldPatches.push({ type: 'remove', address: identifier })
          }
        }
      })
      patchFieldStates(fields, fieldPatches)
    })
    field.form.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
  }
  var exchangeArrayState = function (field, props) {
    var _a = __assign$1({ fromIndex: 0, toIndex: 0 }, props),
      fromIndex = _a.fromIndex,
      toIndex = _a.toIndex
    var address = field.address.toString()
    var fields = field.form.fields
    var addrLength = address.length
    var fieldPatches = []
    var isArrayChildren = function (identifier) {
      return identifier.indexOf(address) === 0 && identifier.length > addrLength
    }
    var isDown = fromIndex < toIndex
    var isMoveNode = function (identifier) {
      var _a
      var afterStr = identifier.slice(address.length)
      var number =
        (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1]
      if (number === undefined) return false
      var index = Number(number)
      return isDown
        ? index > fromIndex && index <= toIndex
        : index < fromIndex && index >= toIndex
    }
    var isFromNode = function (identifier) {
      var _a
      var afterStr = identifier.substring(addrLength)
      var number =
        (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1]
      if (number === undefined) return false
      var index = Number(number)
      return index === fromIndex
    }
    var moveIndex = function (identifier) {
      var preStr = identifier.substring(0, addrLength)
      var afterStr = identifier.substring(addrLength)
      var number = afterStr.match(NumberIndexReg)[1]
      var current = Number(number)
      var index = current
      if (index === fromIndex) {
        index = toIndex
      } else {
        index += isDown ? -1 : 1
      }
      return ''.concat(preStr).concat(afterStr.replace(/^\.\d+/, '.'.concat(index)))
    }
    batch(function () {
      each(fields, function (field, identifier) {
        if (isArrayChildren(identifier)) {
          if (isMoveNode(identifier) || isFromNode(identifier)) {
            var newIdentifier = moveIndex(identifier)
            fieldPatches.push({
              type: 'update',
              address: newIdentifier,
              oldAddress: identifier,
              payload: field,
            })
            if (!fields[newIdentifier]) {
              fieldPatches.push({
                type: 'remove',
                address: identifier,
              })
            }
          }
        }
      })
      patchFieldStates(fields, fieldPatches)
    })
    field.form.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
  }
  var cleanupArrayChildren = function (field, start) {
    var address = field.address.toString()
    var fields = field.form.fields
    var isArrayChildren = function (identifier) {
      return identifier.indexOf(address) === 0 && identifier.length > address.length
    }
    var isNeedCleanup = function (identifier) {
      var _a
      var afterStr = identifier.slice(address.length)
      var numStr =
        (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1]
      if (numStr === undefined) return false
      var index = Number(numStr)
      return index >= start
    }
    batch(function () {
      each(fields, function (field, identifier) {
        if (isArrayChildren(identifier) && isNeedCleanup(identifier)) {
          field.destroy()
        }
      })
    })
  }
  var cleanupObjectChildren = function (field, keys) {
    if (keys.length === 0) return
    var address = field.address.toString()
    var fields = field.form.fields
    var isObjectChildren = function (identifier) {
      return identifier.indexOf(address) === 0 && identifier.length > address.length
    }
    var isNeedCleanup = function (identifier) {
      var _a
      var afterStr = identifier.slice(address.length)
      var key =
        (_a = afterStr.match(/^\.([^.]+)/)) === null || _a === void 0 ? void 0 : _a[1]
      if (key === undefined) return false
      return keys.includes(key)
    }
    batch(function () {
      each(fields, function (field, identifier) {
        if (isObjectChildren(identifier) && isNeedCleanup(identifier)) {
          field.destroy()
        }
      })
    })
  }
  var initFieldUpdate = batch.scope.bound(function (field) {
    var form = field.form
    var updates = Path.ensureIn(form, 'requests.updates', [])
    var indexes = Path.ensureIn(form, 'requests.updateIndexes', {})
    for (var index = 0; index < updates.length; index++) {
      var _a = updates[index],
        pattern = _a.pattern,
        callbacks = _a.callbacks
      var removed = false
      if (field.match(pattern)) {
        callbacks.forEach(function (callback) {
          field.setState(callback)
        })
        if (!pattern.isWildMatchPattern && !pattern.isMatchPattern) {
          updates.splice(index--, 1)
          removed = true
        }
      }
      if (!removed) {
        indexes[pattern.toString()] = index
      } else {
        delete indexes[pattern.toString()]
      }
    }
  })
  var subscribeUpdate = function (form, pattern, callback) {
    var updates = Path.ensureIn(form, 'requests.updates', [])
    var indexes = Path.ensureIn(form, 'requests.updateIndexes', {})
    var id = pattern.toString()
    var current = indexes[id]
    if (isValid$3(current)) {
      if (
        updates[current] &&
        !updates[current].callbacks.some(function (fn) {
          return fn.toString() === callback.toString() ? fn === callback : false
        })
      ) {
        updates[current].callbacks.push(callback)
      }
    } else {
      indexes[id] = updates.length
      updates.push({
        pattern: pattern,
        callbacks: [callback],
      })
    }
  }
  var deserialize = function (model, setter) {
    if (!model) return
    if (isFn$2(setter)) {
      setter(model)
    } else {
      for (var key in setter) {
        if (!hasOwnProperty.call(setter, key)) continue
        if (ReadOnlyProperties[key] || ReservedProperties[key]) continue
        var MutuallyExclusiveKey = MutuallyExclusiveProperties[key]
        if (
          MutuallyExclusiveKey &&
          hasOwnProperty.call(setter, MutuallyExclusiveKey) &&
          !isValid$3(setter[MutuallyExclusiveKey])
        )
          continue
        var value = setter[key]
        if (isFn$2(value)) continue
        model[key] = value
      }
    }
    return model
  }
  var serialize = function (model, getter) {
    if (isFn$2(getter)) {
      return getter(model)
    } else {
      var results = {}
      for (var key in model) {
        if (!hasOwnProperty.call(model, key)) continue
        if (ReservedProperties[key]) continue
        if (key === 'address' || key === 'path') {
          results[key] = model[key].toString()
          continue
        }
        var value = model[key]
        if (isFn$2(value)) continue
        results[key] = toJS(value)
      }
      return results
    }
  }
  var createChildrenFeedbackFilter = function (field) {
    var _a
    var identifier =
      (_a = field.address) === null || _a === void 0 ? void 0 : _a.toString()
    return function (_a) {
      var address = _a.address
      return address === identifier || address.indexOf(identifier + '.') === 0
    }
  }
  var createStateSetter = function (model) {
    return batch.bound(function (setter) {
      return deserialize(model, setter)
    })
  }
  var createStateGetter = function (model) {
    return function (getter) {
      return serialize(model, getter)
    }
  }
  var createBatchStateSetter = function (form) {
    return batch.bound(function (pattern, payload) {
      if (isQuery(pattern)) {
        pattern.forEach(function (field) {
          field.setState(payload)
        })
      } else if (isGeneralField(pattern)) {
        pattern.setState(payload)
      } else {
        var matchCount_1 = 0,
          path = Path.parse(pattern)
        form.query(path).forEach(function (field) {
          field.setState(payload)
          matchCount_1++
        })
        if (matchCount_1 === 0 || path.isWildMatchPattern) {
          subscribeUpdate(form, path, payload)
        }
      }
    })
  }
  var createBatchStateGetter = function (form) {
    return function (pattern, payload) {
      if (isQuery(pattern)) {
        return pattern.take(payload)
      } else if (isGeneralField(pattern)) {
        return pattern.getState(payload)
      } else {
        return form.query(pattern).take(function (field) {
          return field.getState(payload)
        })
      }
    }
  }
  var triggerFormInitialValuesChange = function (form, change) {
    var path = change.path
    if (Array.isArray(change.object) && change.key === 'length') return
    if (
      contains(form.initialValues, change.object) ||
      form.initialValues === change.value
    ) {
      if (change.type === 'add' || change.type === 'set') {
        patchFormValues(form, path.slice(1), change.value)
      }
      if (form.initialized) {
        form.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE)
      }
    }
  }
  var triggerFormValuesChange = function (form, change) {
    if (Array.isArray(change.object) && change.key === 'length') return
    if (
      (contains(form.values, change.object) || form.values === change.value) &&
      form.initialized
    ) {
      form.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE)
    }
  }
  var setValidating = function (target, validating) {
    clearTimeout(target.requests.validate)
    if (validating) {
      target.requests.validate = setTimeout(function () {
        batch(function () {
          target.validating = validating
          notify(
            target,
            LifeCycleTypes.ON_FORM_VALIDATING,
            LifeCycleTypes.ON_FIELD_VALIDATING,
          )
        })
      }, RESPONSE_REQUEST_DURATION)
      notify(
        target,
        LifeCycleTypes.ON_FORM_VALIDATE_START,
        LifeCycleTypes.ON_FIELD_VALIDATE_START,
      )
    } else {
      if (target.validating !== validating) {
        target.validating = validating
      }
      notify(
        target,
        LifeCycleTypes.ON_FORM_VALIDATE_END,
        LifeCycleTypes.ON_FIELD_VALIDATE_END,
      )
    }
  }
  var setSubmitting = function (target, submitting) {
    clearTimeout(target.requests.submit)
    if (submitting) {
      target.requests.submit = setTimeout(function () {
        batch(function () {
          target.submitting = submitting
          notify(
            target,
            LifeCycleTypes.ON_FORM_SUBMITTING,
            LifeCycleTypes.ON_FIELD_SUBMITTING,
          )
        })
      }, RESPONSE_REQUEST_DURATION)
      notify(
        target,
        LifeCycleTypes.ON_FORM_SUBMIT_START,
        LifeCycleTypes.ON_FIELD_SUBMIT_START,
      )
    } else {
      if (target.submitting !== submitting) {
        target.submitting = submitting
      }
      notify(
        target,
        LifeCycleTypes.ON_FORM_SUBMIT_END,
        LifeCycleTypes.ON_FIELD_SUBMIT_END,
      )
    }
  }
  var setLoading = function (target, loading) {
    clearTimeout(target.requests.loading)
    if (loading) {
      target.requests.loading = setTimeout(function () {
        batch(function () {
          target.loading = loading
          notify(target, LifeCycleTypes.ON_FORM_LOADING, LifeCycleTypes.ON_FIELD_LOADING)
        })
      }, RESPONSE_REQUEST_DURATION)
    } else if (target.loading !== loading) {
      target.loading = loading
    }
  }
  var batchSubmit = function (target, onSubmit) {
    return __awaiter$1(void 0, void 0, void 0, function () {
      var getValues, results, e_2
      return __generator$1(this, function (_a) {
        switch (_a.label) {
          case 0:
            getValues = function (target) {
              if (isForm(target)) {
                return toJS(target.values)
              }
              return toJS(target.value)
            }
            target.setSubmitting(true)
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            notify(
              target,
              LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START,
              LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_START,
            )
            return [4 /*yield*/, target.validate()]
          case 2:
            _a.sent()
            notify(
              target,
              LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS,
              LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_SUCCESS,
            )
            return [3 /*break*/, 4]
          case 3:
            _a.sent()
            notify(
              target,
              LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED,
              LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_FAILED,
            )
            return [3 /*break*/, 4]
          case 4:
            notify(
              target,
              LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_END,
              LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_END,
            )
            _a.label = 5
          case 5:
            _a.trys.push([5, 9, , 10])
            if (target.invalid) {
              throw target.errors
            }
            if (!isFn$2(onSubmit)) return [3 /*break*/, 7]
            return [4 /*yield*/, onSubmit(getValues(target))]
          case 6:
            results = _a.sent()
            return [3 /*break*/, 8]
          case 7:
            results = getValues(target)
            _a.label = 8
          case 8:
            notify(
              target,
              LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS,
              LifeCycleTypes.ON_FIELD_SUBMIT_SUCCESS,
            )
            return [3 /*break*/, 10]
          case 9:
            e_2 = _a.sent()
            target.setSubmitting(false)
            notify(
              target,
              LifeCycleTypes.ON_FORM_SUBMIT_FAILED,
              LifeCycleTypes.ON_FIELD_SUBMIT_FAILED,
            )
            notify(target, LifeCycleTypes.ON_FORM_SUBMIT, LifeCycleTypes.ON_FIELD_SUBMIT)
            throw e_2
          case 10:
            target.setSubmitting(false)
            notify(target, LifeCycleTypes.ON_FORM_SUBMIT, LifeCycleTypes.ON_FIELD_SUBMIT)
            return [2 /*return*/, results]
        }
      })
    })
  }
  var batchValidate = function (target, pattern, triggerType) {
    return __awaiter$1(void 0, void 0, void 0, function () {
      var tasks
      return __generator$1(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (isForm(target)) target.setValidating(true)
            else {
              if (target.pattern !== 'editable' || target.display !== 'visible')
                return [2 /*return*/]
            }
            tasks = []
            target.query(pattern).forEach(function (field) {
              if (!isVoidField(field)) {
                tasks.push(validateSelf(field, triggerType, field === target))
              }
            })
            return [4 /*yield*/, Promise.all(tasks)]
          case 1:
            _a.sent()
            if (isForm(target)) target.setValidating(false)
            if (target.invalid) {
              notify(
                target,
                LifeCycleTypes.ON_FORM_VALIDATE_FAILED,
                LifeCycleTypes.ON_FIELD_VALIDATE_FAILED,
              )
              throw target.errors
            }
            notify(
              target,
              LifeCycleTypes.ON_FORM_VALIDATE_SUCCESS,
              LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS,
            )
            return [2 /*return*/]
        }
      })
    })
  }
  var batchReset = function (target, pattern, options) {
    return __awaiter$1(void 0, void 0, void 0, function () {
      var tasks
      return __generator$1(this, function (_a) {
        switch (_a.label) {
          case 0:
            tasks = []
            target.query(pattern).forEach(function (field) {
              if (!isVoidField(field)) {
                tasks.push(resetSelf(field, options, target === field))
              }
            })
            if (isForm(target)) {
              target.modified = false
            }
            notify(target, LifeCycleTypes.ON_FORM_RESET, LifeCycleTypes.ON_FIELD_RESET)
            return [4 /*yield*/, Promise.all(tasks)]
          case 1:
            _a.sent()
            return [2 /*return*/]
        }
      })
    })
  }
  var validateSelf = batch.bound(function (target, triggerType, noEmit) {
    if (noEmit === void 0) {
      noEmit = false
    }
    return __awaiter$1(void 0, void 0, void 0, function () {
      var start, end, allTriggerTypes, results_1, i, payload, results
      return __generator$1(this, function (_a) {
        switch (_a.label) {
          case 0:
            start = function () {
              setValidating(target, true)
            }
            end = function () {
              setValidating(target, false)
              if (noEmit) return
              if (target.selfValid) {
                target.notify(LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS)
              } else {
                target.notify(LifeCycleTypes.ON_FIELD_VALIDATE_FAILED)
              }
            }
            if (target.pattern !== 'editable' || target.display !== 'visible')
              return [2 /*return*/, {}]
            start()
            if (!!triggerType) return [3 /*break*/, 5]
            allTriggerTypes = parseValidatorDescriptions(target.validator).reduce(
              function (types, desc) {
                return types.indexOf(desc.triggerType) > -1
                  ? types
                  : types.concat(desc.triggerType)
              },
              [],
            )
            results_1 = {}
            i = 0
            _a.label = 1
          case 1:
            if (!(i < allTriggerTypes.length)) return [3 /*break*/, 4]
            return [4 /*yield*/, validateToFeedbacks(target, allTriggerTypes[i])]
          case 2:
            payload = _a.sent()
            each(payload, function (result, key) {
              results_1[key] = results_1[key] || []
              results_1[key] = results_1[key].concat(result)
            })
            _a.label = 3
          case 3:
            i++
            return [3 /*break*/, 1]
          case 4:
            end()
            return [2 /*return*/, results_1]
          case 5:
            return [4 /*yield*/, validateToFeedbacks(target, triggerType)]
          case 6:
            results = _a.sent()
            end()
            return [2 /*return*/, results]
        }
      })
    })
  })
  var resetSelf = batch.bound(function (target, options, noEmit) {
    if (noEmit === void 0) {
      noEmit = false
    }
    return __awaiter$1(void 0, void 0, void 0, function () {
      var typedDefaultValue
      return __generator$1(this, function (_a) {
        switch (_a.label) {
          case 0:
            typedDefaultValue = getTypedDefaultValue(target)
            target.modified = false
            target.selfModified = false
            target.visited = false
            target.feedbacks = []
            target.inputValue = typedDefaultValue
            target.inputValues = []
            target.caches = {}
            if (!isUndef(target.value)) {
              if (options === null || options === void 0 ? void 0 : options.forceClear) {
                target.value = typedDefaultValue
              } else {
                target.value = toJS(
                  !isUndef(target.initialValue) ? target.initialValue : typedDefaultValue,
                )
              }
            }
            if (!noEmit) {
              target.notify(LifeCycleTypes.ON_FIELD_RESET)
            }
            if (!(options === null || options === void 0 ? void 0 : options.validate))
              return [3 /*break*/, 2]
            return [4 /*yield*/, validateSelf(target)]
          case 1:
            return [2 /*return*/, _a.sent()]
          case 2:
            return [2 /*return*/]
        }
      })
    })
  })
  var modifySelf = function (target) {
    if (target.selfModified) return
    target.selfModified = true
    target.modified = true
    var parent = target.parent
    while (parent) {
      if (isDataField(parent)) {
        if (parent.modified) return
        parent.modified = true
      }
      parent = parent.parent
    }
    target.form.modified = true
  }
  var getValidFormValues = function (values) {
    if (isObservable(values)) return values
    return clone(values || {})
  }
  var getValidFieldDefaultValue = function (value, initialValue) {
    if (allowAssignDefaultValue(value, initialValue)) return clone(initialValue)
    return value
  }
  var allowAssignDefaultValue = function (target, source) {
    var isEmptyTarget = target !== null && isEmpty(target)
    var isEmptySource = source !== null && isEmpty(source)
    var isValidTarget = !isUndef(target)
    var isValidSource = !isUndef(source)
    if (!isValidTarget) {
      if (isValidSource) {
        return true
      }
      return false
    }
    if (typeof target === typeof source) {
      if (target === '') return false
      if (target === 0) return false
    }
    if (isEmptyTarget) {
      if (isEmptySource) {
        return false
      } else {
        return true
      }
    }
    return false
  }
  var createReactions = function (field) {
    var reactions = toArr$1(field.props.reactions)
    field.form.addEffects(field, function () {
      reactions.forEach(function (reaction) {
        if (isFn$2(reaction)) {
          field.disposers.push(
            autorun(
              batch.scope.bound(function () {
                if (field.destroyed) return
                reaction(field)
              }),
            ),
          )
        }
      })
    })
  }
  var createReaction = function (tracker, scheduler) {
    return reaction(tracker, untracked.bound(scheduler))
  }
  var initializeStart = function () {
    GlobalState.initializing = true
  }
  var initializeEnd = function () {
    batch.endpoint(function () {
      GlobalState.initializing = false
    })
  }

  var output = function (field, taker) {
    if (!field) return
    if (isFn$2(taker)) {
      return taker(field, field.address)
    }
    return field
  }
  var takeMatchPattern = function (form, pattern) {
    var identifier = pattern.toString()
    var indexIdentifier = form.indexes[identifier]
    var absoluteField = form.fields[identifier]
    var indexField = form.fields[indexIdentifier]
    if (absoluteField) {
      return identifier
    } else if (indexField) {
      return indexIdentifier
    }
  }
  var Query = /** @class */ (function () {
    function Query(props) {
      var _this = this
      this.addresses = []
      this.pattern = Path.parse(props.pattern, props.base)
      this.form = props.form
      if (!this.pattern.isMatchPattern) {
        var matched = takeMatchPattern(
          this.form,
          this.pattern.haveRelativePattern
            ? buildDataPath(props.form.fields, this.pattern)
            : this.pattern,
        )
        if (matched) {
          this.addresses = [matched]
        }
      } else {
        each(this.form.fields, function (field, address) {
          if (field.match(_this.pattern)) {
            _this.addresses.push(address)
          }
        })
      }
    }
    Query.prototype.take = function (taker) {
      return output(this.form.fields[this.addresses[0]], taker)
    }
    Query.prototype.map = function (iterator) {
      var _this = this
      return this.addresses.map(function (address) {
        return output(_this.form.fields[address], iterator)
      })
    }
    Query.prototype.forEach = function (iterator) {
      var _this = this
      return this.addresses.forEach(function (address) {
        return output(_this.form.fields[address], iterator)
      })
    }
    Query.prototype.reduce = function (reducer, initial) {
      var _this = this
      return this.addresses.reduce(function (value, address) {
        return output(_this.form.fields[address], function (field, address) {
          return reducer(value, field, address)
        })
      }, initial)
    }
    Query.prototype.get = function (key) {
      var results = this.take()
      if (results) {
        return results[key]
      }
    }
    Query.prototype.getIn = function (pattern) {
      return Path.getIn(this.take(), pattern)
    }
    Query.prototype.value = function () {
      return this.get('value')
    }
    Query.prototype.initialValue = function () {
      return this.get('initialValue')
    }
    return Query
  })()

  var BaseField = /** @class */ (function () {
    function BaseField() {
      var _this = this
      this.disposers = []
      this.setTitle = function (title) {
        _this.title = title
      }
      this.setDescription = function (description) {
        _this.description = description
      }
      this.setDisplay = function (type) {
        _this.display = type
      }
      this.setPattern = function (type) {
        _this.pattern = type
      }
      this.setComponent = function (component, props) {
        if (component) {
          _this.componentType = component
        }
        if (props) {
          _this.componentProps = _this.componentProps || {}
          Object.assign(_this.componentProps, props)
        }
      }
      this.setComponentProps = function (props) {
        if (props) {
          _this.componentProps = _this.componentProps || {}
          Object.assign(_this.componentProps, props)
        }
      }
      this.setDecorator = function (component, props) {
        if (component) {
          _this.decoratorType = component
        }
        if (props) {
          _this.decoratorProps = _this.decoratorProps || {}
          Object.assign(_this.decoratorProps, props)
        }
      }
      this.setDecoratorProps = function (props) {
        if (props) {
          _this.decoratorProps = _this.decoratorProps || {}
          Object.assign(_this.decoratorProps, props)
        }
      }
      this.setData = function (data) {
        _this.data = data
      }
      this.setContent = function (content) {
        _this.content = content
      }
      this.onInit = function () {
        _this.initialized = true
        initFieldUpdate(_this)
        _this.notify(LifeCycleTypes.ON_FIELD_INIT)
      }
      this.onMount = function () {
        _this.mounted = true
        _this.unmounted = false
        _this.notify(LifeCycleTypes.ON_FIELD_MOUNT)
      }
      this.onUnmount = function () {
        _this.mounted = false
        _this.unmounted = true
        _this.notify(LifeCycleTypes.ON_FIELD_UNMOUNT)
      }
      this.query = function (pattern) {
        return new Query({
          pattern: pattern,
          base: _this.address,
          form: _this.form,
        })
      }
      this.notify = function (type, payload) {
        return _this.form.notify(
          type,
          payload !== null && payload !== void 0 ? payload : _this,
        )
      }
      this.dispose = function () {
        _this.disposers.forEach(function (dispose) {
          dispose()
        })
        _this.form.removeEffects(_this)
      }
      this.destroy = function (forceClear) {
        if (forceClear === void 0) {
          forceClear = true
        }
        destroy(_this.form.fields, _this.address.toString(), forceClear)
      }
      this.match = function (pattern) {
        return Path.parse(pattern).matchAliasGroup(_this.address, _this.path)
      }
    }
    BaseField.prototype.locate = function (address) {
      this.form.fields[address.toString()] = this
      locateNode(this, address)
    }
    Object.defineProperty(BaseField.prototype, 'indexes', {
      get: function () {
        return this.path.transform(/\d/, function () {
          var args = []
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i]
          }
          return args.map(function (index) {
            return Number(index)
          })
        })
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'index', {
      get: function () {
        return this.indexes[this.indexes.length - 1]
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'component', {
      get: function () {
        return [this.componentType, this.componentProps]
      },
      set: function (value) {
        var component = toArr$1(value)
        this.componentType = component[0]
        this.componentProps = component[1] || {}
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'decorator', {
      get: function () {
        return [this.decoratorType, this.decoratorProps]
      },
      set: function (value) {
        var decorator = toArr$1(value)
        this.decoratorType = decorator[0]
        this.decoratorProps = decorator[1] || {}
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'parent', {
      get: function () {
        var parent = this.address.parent()
        var identifier = parent.toString()
        while (!this.form.fields[identifier]) {
          parent = parent.parent()
          identifier = parent.toString()
          if (!identifier) return
        }
        return this.form.fields[identifier]
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'display', {
      get: function () {
        var _a
        var parentDisplay =
          (_a = this.parent) === null || _a === void 0 ? void 0 : _a.display
        if (parentDisplay && parentDisplay !== 'visible') {
          if (this.selfDisplay && this.selfDisplay !== 'visible') return this.selfDisplay
          return parentDisplay
        }
        if (isValid$3(this.selfDisplay)) return this.selfDisplay
        return parentDisplay || this.form.display || 'visible'
      },
      set: function (display) {
        this.selfDisplay = display
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'pattern', {
      get: function () {
        var _a
        var parentPattern =
          ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.pattern) ||
          this.form.pattern ||
          'editable'
        var selfPattern = this.selfPattern
        if (isValid$3(selfPattern)) {
          if (parentPattern === 'readPretty' && selfPattern !== 'editable') {
            return parentPattern
          }
          return selfPattern
        }
        return parentPattern
      },
      set: function (pattern) {
        this.selfPattern = pattern
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'editable', {
      get: function () {
        return this.pattern === 'editable'
      },
      set: function (editable) {
        if (!isValid$3(editable)) return
        if (editable) {
          this.pattern = 'editable'
        } else {
          this.pattern = 'readPretty'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'disabled', {
      get: function () {
        return this.pattern === 'disabled'
      },
      set: function (disabled) {
        if (!isValid$3(disabled)) return
        if (disabled) {
          this.pattern = 'disabled'
        } else {
          this.pattern = 'editable'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'readOnly', {
      get: function () {
        return this.pattern === 'readOnly'
      },
      set: function (readOnly) {
        if (!isValid$3(readOnly)) return
        if (readOnly) {
          this.pattern = 'readOnly'
        } else {
          this.pattern = 'editable'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'readPretty', {
      get: function () {
        return this.pattern === 'readPretty'
      },
      set: function (readPretty) {
        if (!isValid$3(readPretty)) return
        if (readPretty) {
          this.pattern = 'readPretty'
        } else {
          this.pattern = 'editable'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'hidden', {
      get: function () {
        return this.display === 'hidden'
      },
      set: function (hidden) {
        if (!isValid$3(hidden)) return
        if (hidden) {
          this.display = 'hidden'
        } else {
          this.display = 'visible'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'visible', {
      get: function () {
        return this.display === 'visible'
      },
      set: function (visible) {
        if (!isValid$3(visible)) return
        if (visible) {
          this.display = 'visible'
        } else {
          this.display = 'none'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(BaseField.prototype, 'destroyed', {
      get: function () {
        return !this.form.fields[this.address.toString()]
      },
      enumerable: false,
      configurable: true,
    })
    return BaseField
  })()

  var __extends$3 =
    (undefined && undefined.__extends) ||
    (function () {
      var extendStatics = function (d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (d, b) {
              d.__proto__ = b
            }) ||
          function (d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
          }
        return extendStatics(d, b)
      }
      return function (d, b) {
        if (typeof b !== 'function' && b !== null)
          throw new TypeError(
            'Class extends value ' + String(b) + ' is not a constructor or null',
          )
        extendStatics(d, b)
        function __() {
          this.constructor = d
        }
        d.prototype =
          b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
      }
    })()
  var __awaiter =
    (undefined && undefined.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P
          ? value
          : new P(function (resolve) {
              resolve(value)
            })
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value))
          } catch (e) {
            reject(e)
          }
        }
        function rejected(value) {
          try {
            step(generator['throw'](value))
          } catch (e) {
            reject(e)
          }
        }
        function step(result) {
          result.done
            ? resolve(result.value)
            : adopt(result.value).then(fulfilled, rejected)
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
      })
    }
  var __generator =
    (undefined && undefined.__generator) ||
    function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function () {
            if (t[0] & 1) throw t[1]
            return t[1]
          },
          trys: [],
          ops: [],
        },
        f,
        y,
        t,
        g
      return (
        (g = { next: verb(0), throw: verb(1), return: verb(2) }),
        typeof Symbol === 'function' &&
          (g[Symbol.iterator] = function () {
            return this
          }),
        g
      )
      function verb(n) {
        return function (v) {
          return step([n, v])
        }
      }
      function step(op) {
        if (f) throw new TypeError('Generator is already executing.')
        while (_)
          try {
            if (
              ((f = 1),
              y &&
                (t =
                  op[0] & 2
                    ? y['return']
                    : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
                !(t = t.call(y, op[1])).done)
            )
              return t
            if (((y = 0), t)) op = [op[0] & 2, t.value]
            switch (op[0]) {
              case 0:
              case 1:
                t = op
                break
              case 4:
                _.label++
                return { value: op[1], done: false }
              case 5:
                _.label++
                y = op[1]
                op = [0]
                continue
              case 7:
                op = _.ops.pop()
                _.trys.pop()
                continue
              default:
                if (
                  !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                  (op[0] === 6 || op[0] === 2)
                ) {
                  _ = 0
                  continue
                }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                  _.label = op[1]
                  break
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1]
                  t = op
                  break
                }
                if (t && _.label < t[2]) {
                  _.label = t[2]
                  _.ops.push(op)
                  break
                }
                if (t[2]) _.ops.pop()
                _.trys.pop()
                continue
            }
            op = body.call(thisArg, _)
          } catch (e) {
            op = [6, e]
            y = 0
          } finally {
            f = t = 0
          }
        if (op[0] & 5) throw op[1]
        return { value: op[0] ? op[1] : void 0, done: true }
      }
    }
  var Field = /** @class */ (function (_super) {
    __extends$3(Field, _super)
    function Field(address, props, form, designable) {
      var _this = _super.call(this) || this
      _this.displayName = 'Field'
      _this.caches = {}
      _this.requests = {}
      _this.setDataSource = function (dataSource) {
        _this.dataSource = dataSource
      }
      _this.setFeedback = function (feedback) {
        updateFeedback(_this, feedback)
      }
      _this.setSelfErrors = function (messages) {
        _this.selfErrors = messages
      }
      _this.setSelfWarnings = function (messages) {
        _this.selfWarnings = messages
      }
      _this.setSelfSuccesses = function (messages) {
        _this.selfSuccesses = messages
      }
      _this.setValidator = function (validator) {
        _this.validator = validator
      }
      _this.setValidatorRule = function (name, value) {
        setValidatorRule(_this, name, value)
      }
      _this.setRequired = function (required) {
        _this.required = required
      }
      _this.setValue = function (value) {
        _this.value = value
      }
      _this.setInitialValue = function (initialValue) {
        _this.initialValue = initialValue
      }
      _this.setLoading = function (loading) {
        setLoading(_this, loading)
      }
      _this.setValidating = function (validating) {
        setValidating(_this, validating)
      }
      _this.setSubmitting = function (submitting) {
        setSubmitting(_this, submitting)
      }
      _this.setState = createStateSetter(_this)
      _this.getState = createStateGetter(_this)
      _this.onInput = function () {
        var args = []
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i]
        }
        return __awaiter(_this, void 0, void 0, function () {
          var getValues, values, value
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                getValues = function (args) {
                  var _a
                  if ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.target) {
                    if (!isHTMLInputEvent(args[0])) return args
                  }
                  return getValuesFromEvent(args)
                }
                values = getValues(args)
                value = values[0]
                this.caches.inputting = true
                this.inputValue = value
                this.inputValues = values
                this.value = value
                this.modify()
                this.notify(LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE)
                this.notify(LifeCycleTypes.ON_FORM_INPUT_CHANGE, this.form)
                return [4 /*yield*/, validateSelf(this, 'onInput')]
              case 1:
                _a.sent()
                this.caches.inputting = false
                return [2 /*return*/]
            }
          })
        })
      }
      _this.onFocus = function () {
        var args = []
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i]
        }
        return __awaiter(_this, void 0, void 0, function () {
          var _a
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.target) {
                  if (!isHTMLInputEvent(args[0], false)) return [2 /*return*/]
                }
                this.active = true
                this.visited = true
                return [4 /*yield*/, validateSelf(this, 'onFocus')]
              case 1:
                _b.sent()
                return [2 /*return*/]
            }
          })
        })
      }
      _this.onBlur = function () {
        var args = []
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i]
        }
        return __awaiter(_this, void 0, void 0, function () {
          var _a
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                if ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.target) {
                  if (!isHTMLInputEvent(args[0], false)) return [2 /*return*/]
                }
                this.active = false
                return [4 /*yield*/, validateSelf(this, 'onBlur')]
              case 1:
                _b.sent()
                return [2 /*return*/]
            }
          })
        })
      }
      _this.validate = function (triggerType) {
        return batchValidate(_this, ''.concat(_this.address, '.**'), triggerType)
      }
      _this.submit = function (onSubmit) {
        return batchSubmit(_this, onSubmit)
      }
      _this.reset = function (options) {
        return batchReset(_this, ''.concat(_this.address, '.**'), options)
      }
      _this.queryFeedbacks = function (search) {
        return queryFeedbacks(_this, search)
      }
      _this.modify = function () {
        return modifySelf(_this)
      }
      _this.form = form
      _this.props = props
      _this.designable = designable
      initializeStart()
      _this.locate(address)
      _this.initialize()
      _this.makeObservable()
      _this.makeReactive()
      _this.onInit()
      initializeEnd()
      return _this
    }
    Field.prototype.initialize = function () {
      this.initialized = false
      this.loading = false
      this.validating = false
      this.submitting = false
      this.selfModified = false
      this.active = false
      this.visited = false
      this.mounted = false
      this.unmounted = false
      this.inputValues = []
      this.inputValue = null
      this.feedbacks = []
      this.title = this.props.title
      this.description = this.props.description
      this.display = this.props.display
      this.pattern = this.props.pattern
      this.editable = this.props.editable
      this.disabled = this.props.disabled
      this.readOnly = this.props.readOnly
      this.readPretty = this.props.readPretty
      this.visible = this.props.visible
      this.hidden = this.props.hidden
      this.dataSource = this.props.dataSource
      this.validator = this.props.validator
      this.required = this.props.required
      this.content = this.props.content
      this.value = getValidFieldDefaultValue(this.props.value, this.props.initialValue)
      this.initialValue = this.props.initialValue
      this.data = this.props.data
      this.decorator = toArr$1(this.props.decorator)
      this.component = toArr$1(this.props.component)
    }
    Field.prototype.makeObservable = function () {
      if (this.designable) return
      define(this, {
        path: observable.ref,
        title: observable.ref,
        description: observable.ref,
        dataSource: observable.ref,
        selfDisplay: observable.ref,
        selfPattern: observable.ref,
        loading: observable.ref,
        validating: observable.ref,
        submitting: observable.ref,
        selfModified: observable.ref,
        modified: observable.ref,
        active: observable.ref,
        visited: observable.ref,
        initialized: observable.ref,
        mounted: observable.ref,
        unmounted: observable.ref,
        inputValue: observable.ref,
        inputValues: observable.ref,
        decoratorType: observable.ref,
        componentType: observable.ref,
        content: observable.ref,
        feedbacks: observable.ref,
        decoratorProps: observable,
        componentProps: observable,
        validator: observable.shallow,
        data: observable.shallow,
        component: observable.computed,
        decorator: observable.computed,
        errors: observable.computed,
        warnings: observable.computed,
        successes: observable.computed,
        valid: observable.computed,
        invalid: observable.computed,
        selfErrors: observable.computed,
        selfWarnings: observable.computed,
        selfSuccesses: observable.computed,
        selfValid: observable.computed,
        selfInvalid: observable.computed,
        validateStatus: observable.computed,
        value: observable.computed,
        initialValue: observable.computed,
        display: observable.computed,
        pattern: observable.computed,
        required: observable.computed,
        hidden: observable.computed,
        visible: observable.computed,
        disabled: observable.computed,
        readOnly: observable.computed,
        readPretty: observable.computed,
        editable: observable.computed,
        indexes: observable.computed,
        setDisplay: action,
        setTitle: action,
        setDescription: action,
        setDataSource: action,
        setValue: action,
        setPattern: action,
        setInitialValue: action,
        setLoading: action,
        setValidating: action,
        setFeedback: action,
        setSelfErrors: action,
        setSelfWarnings: action,
        setSelfSuccesses: action,
        setValidator: action,
        setRequired: action,
        setComponent: action,
        setComponentProps: action,
        setDecorator: action,
        setDecoratorProps: action,
        setData: action,
        setContent: action,
        validate: action,
        reset: action,
        onInit: batch,
        onInput: batch,
        onMount: batch,
        onUnmount: batch,
        onFocus: batch,
        onBlur: batch,
      })
    }
    Field.prototype.makeReactive = function () {
      var _this = this
      if (this.designable) return
      this.disposers.push(
        createReaction(
          function () {
            return _this.value
          },
          function (value) {
            _this.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE)
            if (isValid$3(value) && _this.selfModified && !_this.caches.inputting) {
              validateSelf(_this)
            }
          },
        ),
        createReaction(
          function () {
            return _this.initialValue
          },
          function () {
            _this.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE)
          },
        ),
        createReaction(
          function () {
            return _this.display
          },
          function (display) {
            var _a
            var value = _this.value
            if (display === 'visible') {
              if (isEmpty(value)) {
                _this.setValue(_this.caches.value)
                _this.caches.value = undefined
              }
            } else {
              _this.caches.value =
                (_a = toJS(value)) !== null && _a !== void 0
                  ? _a
                  : toJS(_this.initialValue)
              if (display === 'none') {
                _this.form.deleteValuesIn(_this.path)
              }
            }
            if (display === 'none' || display === 'hidden') {
              _this.setFeedback({
                type: 'error',
                messages: [],
              })
            }
          },
        ),
        createReaction(
          function () {
            return _this.pattern
          },
          function (pattern) {
            if (pattern !== 'editable') {
              _this.setFeedback({
                type: 'error',
                messages: [],
              })
            }
          },
        ),
      )
      createReactions(this)
    }
    Object.defineProperty(Field.prototype, 'selfErrors', {
      get: function () {
        return queryFeedbackMessages(this, {
          type: 'error',
        })
      },
      set: function (messages) {
        this.setFeedback({
          type: 'error',
          code: 'EffectError',
          messages: messages,
        })
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'errors', {
      get: function () {
        return this.form.errors.filter(createChildrenFeedbackFilter(this))
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'selfWarnings', {
      get: function () {
        return queryFeedbackMessages(this, {
          type: 'warning',
        })
      },
      set: function (messages) {
        this.setFeedback({
          type: 'warning',
          code: 'EffectWarning',
          messages: messages,
        })
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'warnings', {
      get: function () {
        return this.form.warnings.filter(createChildrenFeedbackFilter(this))
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'selfSuccesses', {
      get: function () {
        return queryFeedbackMessages(this, {
          type: 'success',
        })
      },
      set: function (messages) {
        this.setFeedback({
          type: 'success',
          code: 'EffectSuccess',
          messages: messages,
        })
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'successes', {
      get: function () {
        return this.form.successes.filter(createChildrenFeedbackFilter(this))
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'selfValid', {
      get: function () {
        return !this.selfErrors.length
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'valid', {
      get: function () {
        return !this.errors.length
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'selfInvalid', {
      get: function () {
        return !this.selfValid
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'invalid', {
      get: function () {
        return !this.valid
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'value', {
      get: function () {
        return this.form.getValuesIn(this.path)
      },
      set: function (value) {
        if (this.destroyed) return
        if (!this.initialized) {
          if (this.display === 'none') {
            this.caches.value = value
            return
          }
          if (!allowAssignDefaultValue(this.value, value) && !this.designable) {
            return
          }
        }
        this.form.setValuesIn(this.path, value)
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'initialValue', {
      get: function () {
        return this.form.getInitialValuesIn(this.path)
      },
      set: function (initialValue) {
        if (this.destroyed) return
        if (!this.initialized) {
          if (
            !allowAssignDefaultValue(this.initialValue, initialValue) &&
            !this.designable
          ) {
            return
          }
        }
        this.form.setInitialValuesIn(this.path, initialValue)
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'required', {
      get: function () {
        var validators = isArr$2(this.validator)
          ? this.validator
          : parseValidatorDescriptions(this.validator)
        return validators.some(function (desc) {
          return !!(desc === null || desc === void 0 ? void 0 : desc['required'])
        })
      },
      set: function (required) {
        if (this.required === required) return
        this.setValidatorRule('required', required)
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Field.prototype, 'validateStatus', {
      get: function () {
        if (this.validating) return 'validating'
        if (this.selfInvalid) return 'error'
        if (this.selfWarnings.length) return 'warning'
        if (this.selfSuccesses.length) return 'success'
      },
      enumerable: false,
      configurable: true,
    })
    return Field
  })(BaseField)

  var __read$1 =
    (undefined && undefined.__read) ||
    function (o, n) {
      var m = typeof Symbol === 'function' && o[Symbol.iterator]
      if (!m) return o
      var i = m.call(o),
        r,
        ar = [],
        e
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
      } catch (error) {
        e = { error: error }
      } finally {
        try {
          if (r && !r.done && (m = i['return'])) m.call(i)
        } finally {
          if (e) throw e.error
        }
      }
      return ar
    }
  var __spreadArray$1 =
    (undefined && undefined.__spreadArray) ||
    function (to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i)
            ar[i] = from[i]
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from))
    }
  var createEffectHook = function (type, callback) {
    return function () {
      var args = []
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
      }
      if (GlobalState.effectStart) {
        GlobalState.lifecycles.push(
          new LifeCycle(type, function (payload, ctx) {
            if (isFn$2(callback)) {
              callback
                .apply(
                  void 0,
                  __spreadArray$1([payload, ctx], __read$1(GlobalState.context), false),
                )
                .apply(void 0, __spreadArray$1([], __read$1(args), false))
            }
          }),
        )
      } else {
        throw new Error('Effect hooks cannot be used in asynchronous function body')
      }
    }
  }
  var createEffectContext = function (defaultValue) {
    var index
    return {
      provide: function (value) {
        if (GlobalState.effectStart) {
          index = GlobalState.context.length
          GlobalState.context[index] = isValid$3(value) ? value : defaultValue
        } else {
          throw new Error('Provide method cannot be used in asynchronous function body')
        }
      },
      consume: function () {
        if (!GlobalState.effectStart) {
          throw new Error('Consume method cannot be used in asynchronous function body')
        }
        return GlobalState.context[index]
      },
    }
  }
  var FormEffectContext = createEffectContext()
  var useEffectForm = FormEffectContext.consume
  var runEffects = function (context) {
    var args = []
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i]
    }
    GlobalState.lifecycles = []
    GlobalState.context = []
    GlobalState.effectStart = true
    GlobalState.effectEnd = false
    if (isForm(context)) {
      FormEffectContext.provide(context)
    }
    args.forEach(function (effects) {
      if (isFn$2(effects)) {
        effects(context)
      }
    })
    GlobalState.context = []
    GlobalState.effectStart = false
    GlobalState.effectEnd = true
    return GlobalState.lifecycles
  }

  var __extends$2 =
    (undefined && undefined.__extends) ||
    (function () {
      var extendStatics = function (d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (d, b) {
              d.__proto__ = b
            }) ||
          function (d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
          }
        return extendStatics(d, b)
      }
      return function (d, b) {
        if (typeof b !== 'function' && b !== null)
          throw new TypeError(
            'Class extends value ' + String(b) + ' is not a constructor or null',
          )
        extendStatics(d, b)
        function __() {
          this.constructor = d
        }
        d.prototype =
          b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
      }
    })()
  var __read =
    (undefined && undefined.__read) ||
    function (o, n) {
      var m = typeof Symbol === 'function' && o[Symbol.iterator]
      if (!m) return o
      var i = m.call(o),
        r,
        ar = [],
        e
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
      } catch (error) {
        e = { error: error }
      } finally {
        try {
          if (r && !r.done && (m = i['return'])) m.call(i)
        } finally {
          if (e) throw e.error
        }
      }
      return ar
    }
  var __spreadArray =
    (undefined && undefined.__spreadArray) ||
    function (to, from, pack) {
      if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i)
            ar[i] = from[i]
          }
        }
      return to.concat(ar || Array.prototype.slice.call(from))
    }
  var ArrayField = /** @class */ (function (_super) {
    __extends$2(ArrayField, _super)
    function ArrayField(address, props, form, designable) {
      var _this = _super.call(this, address, props, form, designable) || this
      _this.displayName = 'ArrayField'
      _this.push = function () {
        var items = []
        for (var _i = 0; _i < arguments.length; _i++) {
          items[_i] = arguments[_i]
        }
        return action(function () {
          var _a
          if (!isArr$2(_this.value)) {
            _this.value = []
          }
          ;(_a = _this.value).push.apply(_a, __spreadArray([], __read(items), false))
          return _this.onInput(_this.value)
        })
      }
      _this.pop = function () {
        if (!isArr$2(_this.value)) return
        return action(function () {
          var index = _this.value.length - 1
          spliceArrayState(_this, {
            startIndex: index,
            deleteCount: 1,
          })
          _this.value.pop()
          return _this.onInput(_this.value)
        })
      }
      _this.insert = function (index) {
        var items = []
        for (var _i = 1; _i < arguments.length; _i++) {
          items[_i - 1] = arguments[_i]
        }
        return action(function () {
          var _a
          if (!isArr$2(_this.value)) {
            _this.value = []
          }
          spliceArrayState(_this, {
            startIndex: index,
            insertCount: items.length,
          })
          ;(_a = _this.value).splice.apply(
            _a,
            __spreadArray([index, 0], __read(items), false),
          )
          return _this.onInput(_this.value)
        })
      }
      _this.remove = function (index) {
        if (!isArr$2(_this.value)) return
        return action(function () {
          spliceArrayState(_this, {
            startIndex: index,
            deleteCount: 1,
          })
          _this.value.splice(index, 1)
          return _this.onInput(_this.value)
        })
      }
      _this.shift = function () {
        if (!isArr$2(_this.value)) return
        return action(function () {
          _this.value.shift()
          return _this.onInput(_this.value)
        })
      }
      _this.unshift = function () {
        var items = []
        for (var _i = 0; _i < arguments.length; _i++) {
          items[_i] = arguments[_i]
        }
        return action(function () {
          var _a
          if (!isArr$2(_this.value)) {
            _this.value = []
          }
          spliceArrayState(_this, {
            startIndex: 0,
            insertCount: items.length,
          })
          ;(_a = _this.value).unshift.apply(_a, __spreadArray([], __read(items), false))
          return _this.onInput(_this.value)
        })
      }
      _this.move = function (fromIndex, toIndex) {
        if (!isArr$2(_this.value)) return
        if (fromIndex === toIndex) return
        return action(function () {
          var fromItem = _this.value[fromIndex]
          _this.value.splice(fromIndex, 1)
          _this.value.splice(toIndex, 0, fromItem)
          exchangeArrayState(_this, {
            fromIndex: fromIndex,
            toIndex: toIndex,
          })
          return _this.onInput(_this.value)
        })
      }
      _this.moveUp = function (index) {
        if (!isArr$2(_this.value)) return
        return _this.move(index, index - 1 < 0 ? _this.value.length - 1 : index - 1)
      }
      _this.moveDown = function (index) {
        if (!isArr$2(_this.value)) return
        return _this.move(index, index + 1 >= _this.value.length ? 0 : index + 1)
      }
      _this.makeAutoCleanable()
      return _this
    }
    ArrayField.prototype.makeAutoCleanable = function () {
      var _this = this
      this.disposers.push(
        reaction(
          function () {
            var _a
            return (_a = _this.value) === null || _a === void 0 ? void 0 : _a.length
          },
          function (newLength, oldLength) {
            if (oldLength && !newLength) {
              cleanupArrayChildren(_this, 0)
            } else if (newLength < oldLength) {
              cleanupArrayChildren(_this, newLength)
            }
          },
        ),
      )
    }
    return ArrayField
  })(Field)

  var __extends$1 =
    (undefined && undefined.__extends) ||
    (function () {
      var extendStatics = function (d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (d, b) {
              d.__proto__ = b
            }) ||
          function (d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
          }
        return extendStatics(d, b)
      }
      return function (d, b) {
        if (typeof b !== 'function' && b !== null)
          throw new TypeError(
            'Class extends value ' + String(b) + ' is not a constructor or null',
          )
        extendStatics(d, b)
        function __() {
          this.constructor = d
        }
        d.prototype =
          b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
      }
    })()
  var ObjectField = /** @class */ (function (_super) {
    __extends$1(ObjectField, _super)
    function ObjectField(address, props, form, designable) {
      var _this = _super.call(this, address, props, form, designable) || this
      _this.displayName = 'ObjectField'
      _this.additionalProperties = []
      _this.addProperty = function (key, value) {
        _this.form.setValuesIn(_this.path.concat(key), value)
        _this.additionalProperties.push(key)
        return _this.onInput(_this.value)
      }
      _this.removeProperty = function (key) {
        _this.form.deleteValuesIn(_this.path.concat(key))
        _this.additionalProperties.splice(_this.additionalProperties.indexOf(key), 1)
        return _this.onInput(_this.value)
      }
      _this.existProperty = function (key) {
        return _this.form.existValuesIn(_this.path.concat(key))
      }
      _this.makeAutoCleanable()
      return _this
    }
    ObjectField.prototype.makeAutoCleanable = function () {
      var _this = this
      this.disposers.push(
        reaction(
          function () {
            return Object.keys(_this.value || {})
          },
          function (newKeys) {
            var filterKeys = _this.additionalProperties.filter(function (key) {
              return !newKeys.includes(key)
            })
            cleanupObjectChildren(_this, filterKeys)
          },
        ),
      )
    }
    return ObjectField
  })(Field)

  var __extends =
    (undefined && undefined.__extends) ||
    (function () {
      var extendStatics = function (d, b) {
        extendStatics =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function (d, b) {
              d.__proto__ = b
            }) ||
          function (d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
          }
        return extendStatics(d, b)
      }
      return function (d, b) {
        if (typeof b !== 'function' && b !== null)
          throw new TypeError(
            'Class extends value ' + String(b) + ' is not a constructor or null',
          )
        extendStatics(d, b)
        function __() {
          this.constructor = d
        }
        d.prototype =
          b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
      }
    })()
  var VoidField = /** @class */ (function (_super) {
    __extends(VoidField, _super)
    function VoidField(address, props, form, designable) {
      var _this = _super.call(this) || this
      _this.displayName = 'VoidField'
      _this.setState = createStateSetter(_this)
      _this.getState = createStateGetter(_this)
      _this.form = form
      _this.props = props
      _this.designable = designable
      initializeStart()
      _this.locate(address)
      _this.initialize()
      _this.makeObservable()
      _this.makeReactive()
      _this.onInit()
      initializeEnd()
      return _this
    }
    VoidField.prototype.initialize = function () {
      this.mounted = false
      this.unmounted = false
      this.initialized = false
      this.title = this.props.title
      this.description = this.props.description
      this.pattern = this.props.pattern
      this.display = this.props.display
      this.hidden = this.props.hidden
      this.editable = this.props.editable
      this.disabled = this.props.disabled
      this.readOnly = this.props.readOnly
      this.readPretty = this.props.readPretty
      this.visible = this.props.visible
      this.content = this.props.content
      this.data = this.props.data
      this.decorator = toArr$1(this.props.decorator)
      this.component = toArr$1(this.props.component)
    }
    VoidField.prototype.makeObservable = function () {
      if (this.designable) return
      define(this, {
        path: observable.ref,
        title: observable.ref,
        description: observable.ref,
        selfDisplay: observable.ref,
        selfPattern: observable.ref,
        initialized: observable.ref,
        mounted: observable.ref,
        unmounted: observable.ref,
        decoratorType: observable.ref,
        componentType: observable.ref,
        content: observable.ref,
        data: observable.shallow,
        decoratorProps: observable,
        componentProps: observable,
        display: observable.computed,
        pattern: observable.computed,
        hidden: observable.computed,
        visible: observable.computed,
        disabled: observable.computed,
        readOnly: observable.computed,
        readPretty: observable.computed,
        editable: observable.computed,
        component: observable.computed,
        decorator: observable.computed,
        indexes: observable.computed,
        setTitle: action,
        setDescription: action,
        setDisplay: action,
        setPattern: action,
        setComponent: action,
        setComponentProps: action,
        setDecorator: action,
        setDecoratorProps: action,
        setData: action,
        setContent: action,
        onInit: batch,
        onMount: batch,
        onUnmount: batch,
      })
    }
    VoidField.prototype.makeReactive = function () {
      if (this.designable) return
      createReactions(this)
    }
    return VoidField
  })(BaseField)

  var __assign =
    (undefined && undefined.__assign) ||
    function () {
      __assign =
        Object.assign ||
        function (t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
          }
          return t
        }
      return __assign.apply(this, arguments)
    }
  var DEV_TOOLS_HOOK = '__FORMILY_DEV_TOOLS_HOOK__'
  var Form = /** @class */ (function () {
    function Form(props) {
      var _this = this
      this.displayName = 'Form'
      this.fields = {}
      this.requests = {}
      this.indexes = {}
      this.disposers = []
      /** 创建字段 **/
      this.createField = function (props) {
        var address = Path.parse(props.basePath).concat(props.name)
        var identifier = address.toString()
        if (!identifier) return
        if (!_this.fields[identifier] || _this.props.designable) {
          batch(function () {
            new Field(address, props, _this, _this.props.designable)
          })
          _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
        }
        return _this.fields[identifier]
      }
      this.createArrayField = function (props) {
        var address = Path.parse(props.basePath).concat(props.name)
        var identifier = address.toString()
        if (!identifier) return
        if (!_this.fields[identifier] || _this.props.designable) {
          batch(function () {
            new ArrayField(
              address,
              __assign(__assign({}, props), {
                value: isArr$2(props.value) ? props.value : [],
              }),
              _this,
              _this.props.designable,
            )
          })
          _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
        }
        return _this.fields[identifier]
      }
      this.createObjectField = function (props) {
        var address = Path.parse(props.basePath).concat(props.name)
        var identifier = address.toString()
        if (!identifier) return
        if (!_this.fields[identifier] || _this.props.designable) {
          batch(function () {
            new ObjectField(
              address,
              __assign(__assign({}, props), {
                value: isObj$1(props.value) ? props.value : {},
              }),
              _this,
              _this.props.designable,
            )
          })
          _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
        }
        return _this.fields[identifier]
      }
      this.createVoidField = function (props) {
        var address = Path.parse(props.basePath).concat(props.name)
        var identifier = address.toString()
        if (!identifier) return
        if (!_this.fields[identifier] || _this.props.designable) {
          batch(function () {
            new VoidField(address, props, _this, _this.props.designable)
          })
          _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
        }
        return _this.fields[identifier]
      }
      /** 状态操作模型 **/
      this.setValues = function (values, strategy) {
        if (strategy === void 0) {
          strategy = 'merge'
        }
        if (!isPlainObj$1(values)) return
        if (strategy === 'merge' || strategy === 'deepMerge') {
          _this.values = merge(_this.values, values, {
            arrayMerge: function (target, source) {
              return source
            },
          })
        } else if (strategy === 'shallowMerge') {
          _this.values = Object.assign(_this.values, values)
        } else {
          _this.values = values
        }
      }
      this.setInitialValues = function (initialValues, strategy) {
        if (strategy === void 0) {
          strategy = 'merge'
        }
        if (!isPlainObj$1(initialValues)) return
        if (strategy === 'merge' || strategy === 'deepMerge') {
          _this.initialValues = merge(_this.initialValues, initialValues, {
            arrayMerge: function (target, source) {
              return source
            },
          })
        } else if (strategy === 'shallowMerge') {
          _this.initialValues = Object.assign(_this.initialValues, initialValues)
        } else {
          _this.initialValues = initialValues
        }
      }
      this.setValuesIn = function (pattern, value) {
        Path.setIn(_this.values, pattern, value)
      }
      this.deleteValuesIn = function (pattern) {
        Path.deleteIn(_this.values, pattern)
      }
      this.existValuesIn = function (pattern) {
        return Path.existIn(_this.values, pattern)
      }
      this.getValuesIn = function (pattern) {
        return Path.getIn(_this.values, pattern)
      }
      this.setInitialValuesIn = function (pattern, initialValue) {
        Path.setIn(_this.initialValues, pattern, initialValue)
      }
      this.deleteInitialValuesIn = function (pattern) {
        Path.deleteIn(_this.initialValues, pattern)
      }
      this.existInitialValuesIn = function (pattern) {
        return Path.existIn(_this.initialValues, pattern)
      }
      this.getInitialValuesIn = function (pattern) {
        return Path.getIn(_this.initialValues, pattern)
      }
      this.setLoading = function (loading) {
        setLoading(_this, loading)
      }
      this.setSubmitting = function (submitting) {
        setSubmitting(_this, submitting)
      }
      this.setValidating = function (validating) {
        setValidating(_this, validating)
      }
      this.setDisplay = function (display) {
        _this.display = display
      }
      this.setPattern = function (pattern) {
        _this.pattern = pattern
      }
      this.addEffects = function (id, effects) {
        if (!_this.heart.hasLifeCycles(id)) {
          _this.heart.addLifeCycles(id, runEffects(_this, effects))
        }
      }
      this.removeEffects = function (id) {
        _this.heart.removeLifeCycles(id)
      }
      this.setEffects = function (effects) {
        _this.heart.setLifeCycles(runEffects(_this, effects))
      }
      this.clearErrors = function (pattern) {
        if (pattern === void 0) {
          pattern = '*'
        }
        _this.query(pattern).forEach(function (field) {
          if (!isVoidField(field)) {
            field.setFeedback({
              type: 'error',
              messages: [],
            })
          }
        })
      }
      this.clearWarnings = function (pattern) {
        if (pattern === void 0) {
          pattern = '*'
        }
        _this.query(pattern).forEach(function (field) {
          if (!isVoidField(field)) {
            field.setFeedback({
              type: 'warning',
              messages: [],
            })
          }
        })
      }
      this.clearSuccesses = function (pattern) {
        if (pattern === void 0) {
          pattern = '*'
        }
        _this.query(pattern).forEach(function (field) {
          if (!isVoidField(field)) {
            field.setFeedback({
              type: 'success',
              messages: [],
            })
          }
        })
      }
      this.query = function (pattern) {
        return new Query({
          pattern: pattern,
          base: '',
          form: _this,
        })
      }
      this.queryFeedbacks = function (search) {
        return _this
          .query(search.address || search.path || '*')
          .reduce(function (messages, field) {
            if (isVoidField(field)) return messages
            return messages.concat(
              field
                .queryFeedbacks(search)
                .map(function (feedback) {
                  return __assign(__assign({}, feedback), {
                    address: field.address.toString(),
                    path: field.path.toString(),
                  })
                })
                .filter(function (feedback) {
                  return feedback.messages.length > 0
                }),
            )
          }, [])
      }
      this.notify = function (type, payload) {
        _this.heart.publish(
          type,
          payload !== null && payload !== void 0 ? payload : _this,
        )
      }
      this.subscribe = function (subscriber) {
        return _this.heart.subscribe(subscriber)
      }
      this.unsubscribe = function (id) {
        _this.heart.unsubscribe(id)
      }
      /**事件钩子**/
      this.onInit = function () {
        _this.initialized = true
        _this.notify(LifeCycleTypes.ON_FORM_INIT)
      }
      this.onMount = function () {
        _this.mounted = true
        _this.notify(LifeCycleTypes.ON_FORM_MOUNT)
        if (globalThisPolyfill[DEV_TOOLS_HOOK] && !_this.props.designable) {
          globalThisPolyfill[DEV_TOOLS_HOOK].inject(_this.id, _this)
        }
      }
      this.onUnmount = function () {
        _this.notify(LifeCycleTypes.ON_FORM_UNMOUNT)
        _this.query('*').forEach(function (field) {
          return field.destroy(false)
        })
        _this.disposers.forEach(function (dispose) {
          return dispose()
        })
        _this.unmounted = true
        _this.indexes = {}
        _this.heart.clear()
        if (globalThisPolyfill[DEV_TOOLS_HOOK] && !_this.props.designable) {
          globalThisPolyfill[DEV_TOOLS_HOOK].unmount(_this.id)
        }
      }
      this.setState = createStateSetter(this)
      this.getState = createStateGetter(this)
      this.setFormState = createStateSetter(this)
      this.getFormState = createStateGetter(this)
      this.setFieldState = createBatchStateSetter(this)
      this.getFieldState = createBatchStateGetter(this)
      this.getFormGraph = function () {
        return _this.graph.getGraph()
      }
      this.setFormGraph = function (graph) {
        _this.graph.setGraph(graph)
      }
      this.clearFormGraph = function (pattern, forceClear) {
        if (pattern === void 0) {
          pattern = '*'
        }
        if (forceClear === void 0) {
          forceClear = true
        }
        _this.query(pattern).forEach(function (field) {
          field.destroy(forceClear)
        })
      }
      this.validate = function (pattern) {
        if (pattern === void 0) {
          pattern = '*'
        }
        return batchValidate(_this, pattern)
      }
      this.submit = function (onSubmit) {
        return batchSubmit(_this, onSubmit)
      }
      this.reset = function (pattern, options) {
        if (pattern === void 0) {
          pattern = '*'
        }
        return batchReset(_this, pattern, options)
      }
      this.initialize(props)
      this.makeObservable()
      this.makeReactive()
      this.makeValues()
      this.onInit()
    }
    Form.prototype.initialize = function (props) {
      this.id = uid()
      this.props = __assign({}, props)
      this.initialized = false
      this.submitting = false
      this.validating = false
      this.loading = false
      this.modified = false
      this.mounted = false
      this.unmounted = false
      this.display = this.props.display || 'visible'
      this.pattern = this.props.pattern || 'editable'
      this.editable = this.props.editable
      this.disabled = this.props.disabled
      this.readOnly = this.props.readOnly
      this.readPretty = this.props.readPretty
      this.visible = this.props.visible
      this.hidden = this.props.hidden
      this.graph = new Graph(this)
      this.heart = new Heart({
        lifecycles: this.lifecycles,
        context: this,
      })
    }
    Form.prototype.makeValues = function () {
      this.values = getValidFormValues(this.props.values)
      this.initialValues = getValidFormValues(this.props.initialValues)
    }
    Form.prototype.makeObservable = function () {
      define(this, {
        fields: observable.shallow,
        initialized: observable.ref,
        validating: observable.ref,
        submitting: observable.ref,
        loading: observable.ref,
        modified: observable.ref,
        pattern: observable.ref,
        display: observable.ref,
        mounted: observable.ref,
        unmounted: observable.ref,
        values: observable,
        initialValues: observable,
        valid: observable.computed,
        invalid: observable.computed,
        errors: observable.computed,
        warnings: observable.computed,
        successes: observable.computed,
        hidden: observable.computed,
        visible: observable.computed,
        editable: observable.computed,
        readOnly: observable.computed,
        readPretty: observable.computed,
        disabled: observable.computed,
        setValues: action,
        setValuesIn: action,
        setInitialValues: action,
        setInitialValuesIn: action,
        setPattern: action,
        setDisplay: action,
        setState: action,
        deleteInitialValuesIn: action,
        deleteValuesIn: action,
        setSubmitting: action,
        setValidating: action,
        setFormGraph: action,
        clearFormGraph: action,
        reset: action,
        submit: action,
        validate: action,
        onMount: batch,
        onUnmount: batch,
        onInit: batch,
      })
    }
    Form.prototype.makeReactive = function () {
      var _this = this
      this.disposers.push(
        observe(
          this,
          function (change) {
            triggerFormInitialValuesChange(_this, change)
            triggerFormValuesChange(_this, change)
          },
          true,
        ),
      )
    }
    Object.defineProperty(Form.prototype, 'valid', {
      get: function () {
        return !this.invalid
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'invalid', {
      get: function () {
        return this.errors.length > 0
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'errors', {
      get: function () {
        return this.queryFeedbacks({
          type: 'error',
        })
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'warnings', {
      get: function () {
        return this.queryFeedbacks({
          type: 'warning',
        })
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'successes', {
      get: function () {
        return this.queryFeedbacks({
          type: 'success',
        })
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'lifecycles', {
      get: function () {
        return runEffects(this, this.props.effects)
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'hidden', {
      get: function () {
        return this.display === 'hidden'
      },
      set: function (hidden) {
        if (!isValid$3(hidden)) return
        if (hidden) {
          this.display = 'hidden'
        } else {
          this.display = 'visible'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'visible', {
      get: function () {
        return this.display === 'visible'
      },
      set: function (visible) {
        if (!isValid$3(visible)) return
        if (visible) {
          this.display = 'visible'
        } else {
          this.display = 'none'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'editable', {
      get: function () {
        return this.pattern === 'editable'
      },
      set: function (editable) {
        if (!isValid$3(editable)) return
        if (editable) {
          this.pattern = 'editable'
        } else {
          this.pattern = 'readPretty'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'readOnly', {
      get: function () {
        return this.pattern === 'readOnly'
      },
      set: function (readOnly) {
        if (!isValid$3(readOnly)) return
        if (readOnly) {
          this.pattern = 'readOnly'
        } else {
          this.pattern = 'editable'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'disabled', {
      get: function () {
        return this.pattern === 'disabled'
      },
      set: function (disabled) {
        if (!isValid$3(disabled)) return
        if (disabled) {
          this.pattern = 'disabled'
        } else {
          this.pattern = 'editable'
        }
      },
      enumerable: false,
      configurable: true,
    })
    Object.defineProperty(Form.prototype, 'readPretty', {
      get: function () {
        return this.pattern === 'readPretty'
      },
      set: function (readPretty) {
        if (!isValid$3(readPretty)) return
        if (readPretty) {
          this.pattern = 'readPretty'
        } else {
          this.pattern = 'editable'
        }
      },
      enumerable: false,
      configurable: true,
    })
    return Form
  })()

  var createForm = function (options) {
    return new Form(options)
  }

  function createFormEffect(type) {
    return createEffectHook(type, function (form) {
      return function (callback) {
        batch(function () {
          callback(form)
        })
      }
    })
  }
  createFormEffect(LifeCycleTypes.ON_FORM_INIT)
  createFormEffect(LifeCycleTypes.ON_FORM_MOUNT)
  createFormEffect(LifeCycleTypes.ON_FORM_UNMOUNT)
  createFormEffect(LifeCycleTypes.ON_FORM_VALUES_CHANGE)
  createFormEffect(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE)
  createFormEffect(LifeCycleTypes.ON_FORM_INPUT_CHANGE)
  createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT)
  createFormEffect(LifeCycleTypes.ON_FORM_RESET)
  createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_START)
  createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_END)
  createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS)
  createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_FAILED)
  createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START)
  createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS)
  createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED)
  createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_END)
  createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_START)
  createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_SUCCESS)
  createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_FAILED)
  createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_END)
  createFormEffect(LifeCycleTypes.ON_FORM_GRAPH_CHANGE)
  createFormEffect(LifeCycleTypes.ON_FORM_LOADING)

  function createFieldEffect(type) {
    return createEffectHook(type, function (field, form) {
      return function (pattern, callback) {
        if (Path.parse(pattern).matchAliasGroup(field.address, field.path)) {
          batch(function () {
            callback(field, form)
          })
        }
      }
    })
  }
  var _onFieldInit = createFieldEffect(LifeCycleTypes.ON_FIELD_INIT)
  var onFieldMount = createFieldEffect(LifeCycleTypes.ON_FIELD_MOUNT)
  var onFieldUnmount = createFieldEffect(LifeCycleTypes.ON_FIELD_UNMOUNT)
  var onFieldValueChange = createFieldEffect(LifeCycleTypes.ON_FIELD_VALUE_CHANGE)
  var onFieldInitialValueChange = createFieldEffect(
    LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE,
  )
  var onFieldInputValueChange = createFieldEffect(
    LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE,
  )
  var onFieldValidateStart = createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_START)
  var onFieldValidateEnd = createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_END)
  createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATING)
  var onFieldValidateFailed = createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_FAILED)
  var onFieldValidateSuccess = createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS)
  createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT)
  createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_START)
  createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_END)
  createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_START)
  createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_END)
  createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_SUCCESS)
  createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_FAILED)
  createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_SUCCESS)
  createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_FAILED)
  createFieldEffect(LifeCycleTypes.ON_FIELD_RESET)
  createFieldEffect(LifeCycleTypes.ON_FIELD_LOADING)
  function onFieldInit(pattern, callback) {
    var form = useEffectForm()
    var count = form.query(pattern).reduce(function (count, field) {
      callback(field, form)
      return count + 1
    }, 0)
    if (count === 0) {
      _onFieldInit(pattern, callback)
    }
  }

  var FieldEffects = {
    onFieldInit: onFieldInit,
    onFieldMount: onFieldMount,
    onFieldUnmount: onFieldUnmount,
    onFieldValueChange: onFieldValueChange,
    onFieldInputValueChange: onFieldInputValueChange,
    onFieldInitialValueChange: onFieldInitialValueChange,
    onFieldValidateStart: onFieldValidateStart,
    onFieldValidateEnd: onFieldValidateEnd,
    onFieldValidateFailed: onFieldValidateFailed,
    onFieldValidateSuccess: onFieldValidateSuccess,
  }
  var DefaultFieldEffects = ['onFieldInit', 'onFieldValueChange']
  var getDependencyValue = function (field, pattern, property) {
    var _a = __read$5(String(pattern).split(/\s*#\s*/), 2),
      target = _a[0],
      path = _a[1]
    return field.query(target).getIn(path || property || 'value')
  }
  var getDependencies = function (field, dependencies) {
    if (isArr$2(dependencies)) {
      var results_1 = []
      dependencies.forEach(function (pattern) {
        if (isStr$1(pattern)) {
          results_1.push(getDependencyValue(field, pattern))
        } else if (isPlainObj$1(pattern)) {
          if (pattern.name && pattern.source) {
            results_1[pattern.name] = getDependencyValue(
              field,
              pattern.source,
              pattern.property,
            )
          }
        }
      })
      return results_1
    } else if (isPlainObj$1(dependencies)) {
      return reduce(
        dependencies,
        function (buf, pattern, key) {
          buf[key] = getDependencyValue(field, pattern)
          return buf
        },
        {},
      )
    }
    return []
  }
  var setSchemaFieldState = function (options, demand) {
    if (demand === void 0) {
      demand = false
    }
    var _a = options || {},
      request = _a.request,
      target = _a.target,
      runner = _a.runner,
      field = _a.field,
      scope = _a.scope
    if (!request) return
    if (target) {
      if (request.state) {
        field.form.setFieldState(target, function (state) {
          return patchCompile(
            state,
            request.state,
            lazyMerge(scope, {
              $target: state,
            }),
          )
        })
      }
      if (request.schema) {
        field.form.setFieldState(target, function (state) {
          return patchSchemaCompile(
            state,
            request.schema,
            lazyMerge(scope, {
              $target: state,
            }),
            demand,
          )
        })
      }
      if (isStr$1(runner) && runner) {
        field.form.setFieldState(target, function (state) {
          shallowCompile(
            '{{function(){'.concat(runner, '}}}'),
            lazyMerge(scope, {
              $target: state,
            }),
          )()
        })
      }
    } else {
      if (request.state) {
        field.setState(function (state) {
          return patchCompile(state, request.state, scope)
        })
      }
      if (request.schema) {
        field.setState(function (state) {
          return patchSchemaCompile(state, request.schema, scope, demand)
        })
      }
      if (isStr$1(runner) && runner) {
        shallowCompile('{{function(){'.concat(runner, '}}}'), scope)()
      }
    }
  }
  var getBaseScope = function (field, options) {
    if (options === void 0) {
      options = {}
    }
    var $observable = function (target, deps) {
      return autorun.memo(function () {
        return observable(target)
      }, deps)
    }
    var $props = function (props) {
      return field.setComponentProps(props)
    }
    var $effect = autorun.effect
    var $memo = autorun.memo
    var $self = field
    var $form = field.form
    var $values = field.form.values
    return lazyMerge(options.scope, {
      $form: $form,
      $self: $self,
      $observable: $observable,
      $effect: $effect,
      $memo: $memo,
      $props: $props,
      $values: $values,
    })
  }
  var getBaseReactions = function (schema, options) {
    return function (field) {
      setSchemaFieldState(
        {
          field: field,
          request: { schema: schema },
          scope: getBaseScope(field, options),
        },
        true,
      )
    }
  }
  var getUserReactions = function (schema, options) {
    var reactions = toArr$1(schema['x-reactions'])
    return reactions.map(function (unCompiled) {
      return function (field) {
        var baseScope = getBaseScope(field, options)
        var reaction = shallowCompile(unCompiled, baseScope)
        if (!reaction) return
        if (isFn$2(reaction)) {
          return reaction(field, baseScope)
        }
        var when = reaction.when,
          fulfill = reaction.fulfill,
          otherwise = reaction.otherwise,
          target = reaction.target,
          effects = reaction.effects
        var run = function () {
          var $deps = getDependencies(field, reaction.dependencies)
          var $dependencies = $deps
          var scope = lazyMerge(baseScope, {
            $target: null,
            $deps: $deps,
            $dependencies: $dependencies,
          })
          var compiledWhen = shallowCompile(when, scope)
          var condition = when ? compiledWhen : true
          var request = condition ? fulfill : otherwise
          var runner = condition
            ? fulfill === null || fulfill === void 0
              ? void 0
              : fulfill.run
            : otherwise === null || otherwise === void 0
            ? void 0
            : otherwise.run
          setSchemaFieldState({
            field: field,
            target: target,
            request: request,
            runner: runner,
            scope: scope,
          })
        }
        if (target) {
          reaction.effects = (
            effects === null || effects === void 0 ? void 0 : effects.length
          )
            ? effects
            : DefaultFieldEffects
        }
        if (reaction.effects) {
          autorun.memo(function () {
            untracked(function () {
              each(reaction.effects, function (type) {
                if (FieldEffects[type]) {
                  FieldEffects[type](field.address, run)
                }
              })
            })
          }, [])
        } else {
          run()
        }
      }
    })
  }
  var transformFieldProps = function (schema, options) {
    return {
      name: schema.name,
      reactions: [getBaseReactions(schema, options)].concat(
        getUserReactions(schema, options),
      ),
    }
  }

  var patches = []
  var polyfills = {}
  var reducePatches = function (schema) {
    return patches.reduce(function (buf, patch) {
      return patch(buf)
    }, __assign$7({}, schema))
  }
  var registerPatches = function () {
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    args.forEach(function (patch) {
      if (isFn$2(patch)) {
        patches.push(patch)
      }
    })
  }
  var registerPolyfills = function (version, patch) {
    if (version && isFn$2(patch)) {
      polyfills[version] = polyfills[version] || []
      polyfills[version].push(patch)
    }
  }
  var enablePolyfills = function (versions) {
    if (isArr$2(versions)) {
      versions.forEach(function (version) {
        if (isArr$2(polyfills[version])) {
          polyfills[version].forEach(function (patch) {
            registerPatches(patch)
          })
        }
      })
    }
  }

  var VOID_COMPONENTS = [
    'card',
    'block',
    'grid-col',
    'grid-row',
    'grid',
    'layout',
    'step',
    'tab',
    'text-box',
  ]
  var TYPE_DEFAULT_COMPONENTS = {}
  var transformCondition = function (condition) {
    if (isStr$1(condition)) {
      return condition.replace(/\$value/, '$self.value')
    }
  }
  var transformXLinkage = function (linkages) {
    if (isArr$2(linkages)) {
      return linkages.reduce(function (buf, item) {
        if (!item) return buf
        if (item.type === 'value:visible') {
          return buf.concat({
            target: item.target,
            when: transformCondition(item.condition),
            fulfill: {
              state: {
                visible: true,
              },
            },
            otherwise: {
              state: {
                visible: false,
              },
            },
          })
        } else if (item.type === 'value:schema') {
          return buf.concat({
            target: item.target,
            when: transformCondition(item.condition),
            fulfill: {
              schema: SpecificationV1Polyfill(
                __assign$7({ version: '1.0' }, item.schema),
              ),
            },
            otherwise: {
              schema: SpecificationV1Polyfill(
                __assign$7({ version: '1.0' }, item.otherwise),
              ),
            },
          })
        } else if (item.type === 'value:state') {
          return buf.concat({
            target: item.target,
            when: transformCondition(item.condition),
            fulfill: {
              state: item.state,
            },
            otherwise: {
              state: item.otherwise,
            },
          })
        }
      }, [])
    }
    return []
  }
  var SpecificationV1Polyfill = function (schema) {
    if (isValid$3(schema['editable'])) {
      schema['x-editable'] = schema['x-editable'] || schema['editable']
      delete schema['editable']
    }
    if (isValid$3(schema['visible'])) {
      schema['x-visible'] = schema['x-visible'] || schema['visible']
      delete schema['visible']
    }
    if (isValid$3(schema['display'])) {
      schema['x-display'] =
        schema['x-display'] || (schema['display'] ? 'visible' : 'hidden')
      delete schema['display']
    }
    if (isValid$3(schema['x-props'])) {
      schema['x-decorator-props'] = schema['x-decorator-props'] || schema['x-props']
      delete schema['display']
    }
    if (schema['x-linkages']) {
      schema['x-reactions'] = toArr$1(schema['x-reactions']).concat(
        transformXLinkage(schema['x-linkages']),
      )
      delete schema['x-linkages']
    }
    if (schema['x-component']) {
      if (
        VOID_COMPONENTS.some(function (component) {
          return lowerCase(component) === lowerCase(schema['x-component'])
        })
      ) {
        schema['type'] = 'void'
      }
    } else {
      if (TYPE_DEFAULT_COMPONENTS[schema['type']]) {
        schema['x-component'] = TYPE_DEFAULT_COMPONENTS[schema['type']]
      }
    }
    if (
      !schema['x-decorator'] &&
      schema['type'] !== 'void' &&
      schema['type'] !== 'object'
    ) {
      schema['x-decorator'] = schema['x-decorator'] || 'FormItem'
    }
    if (schema['x-rules']) {
      schema['x-validator'] = []
        .concat(schema['x-validator'] || [])
        .concat(schema['x-rules'])
    }
    return schema
  }
  registerPolyfills('1.0', SpecificationV1Polyfill)
  var registerVoidComponents = function (components) {
    VOID_COMPONENTS.push.apply(VOID_COMPONENTS, __spreadArray$5([], __read$5(components)))
  }
  var registerTypeDefaultComponents = function (maps) {
    Object.assign(TYPE_DEFAULT_COMPONENTS, maps)
  }

  var Schema = /** @class */ (function () {
    function Schema(json, parent) {
      var _this = this
      this._isJSONSchemaObject = true
      this.version = '2.0'
      this.addProperty = function (key, schema) {
        _this.properties = _this.properties || {}
        _this.properties[key] = new Schema(schema, _this)
        _this.properties[key].name = key
        return _this.properties[key]
      }
      this.removeProperty = function (key) {
        var schema = _this.properties[key]
        delete _this.properties[key]
        return schema
      }
      this.setProperties = function (properties) {
        for (var key in properties) {
          _this.addProperty(key, properties[key])
        }
        return _this
      }
      this.addPatternProperty = function (key, schema) {
        if (!schema) return
        _this.patternProperties = _this.patternProperties || {}
        _this.patternProperties[key] = new Schema(schema, _this)
        _this.patternProperties[key].name = key
        return _this.patternProperties[key]
      }
      this.removePatternProperty = function (key) {
        var schema = _this.patternProperties[key]
        delete _this.patternProperties[key]
        return schema
      }
      this.setPatternProperties = function (properties) {
        if (!properties) return _this
        for (var key in properties) {
          _this.addPatternProperty(key, properties[key])
        }
        return _this
      }
      this.setAdditionalProperties = function (properties) {
        if (!properties) return
        _this.additionalProperties = new Schema(properties)
        return _this.additionalProperties
      }
      this.setItems = function (schema) {
        if (!schema) return
        if (Array.isArray(schema)) {
          _this.items = schema.map(function (item) {
            return new Schema(item, _this)
          })
        } else {
          _this.items = new Schema(schema, _this)
        }
        return _this.items
      }
      this.setAdditionalItems = function (items) {
        if (!items) return
        _this.additionalItems = new Schema(items, _this)
        return _this.additionalItems
      }
      this.findDefinitions = function (ref) {
        if (!ref || !_this.root || !isStr$1(ref)) return
        if (ref.indexOf('#/') !== 0) return
        return Path.getIn(_this.root, ref.substring(2).split('/'))
      }
      this.mapProperties = function (callback) {
        return Schema.getOrderProperties(_this).map(function (_a, index) {
          var schema = _a.schema,
            key = _a.key
          return callback(schema, key, index)
        })
      }
      this.mapPatternProperties = function (callback) {
        return Schema.getOrderProperties(_this, 'patternProperties').map(function (
          _a,
          index,
        ) {
          var schema = _a.schema,
            key = _a.key
          return callback(schema, key, index)
        })
      }
      this.reduceProperties = function (callback, predicate) {
        var results = predicate
        Schema.getOrderProperties(_this, 'properties').forEach(function (_a, index) {
          var schema = _a.schema,
            key = _a.key
          results = callback(results, schema, key, index)
        })
        return results
      }
      this.reducePatternProperties = function (callback, predicate) {
        var results = predicate
        Schema.getOrderProperties(_this, 'patternProperties').forEach(function (
          _a,
          index,
        ) {
          var schema = _a.schema,
            key = _a.key
          results = callback(results, schema, key, index)
        })
        return results
      }
      this.compile = function (scope) {
        var schema = new Schema({}, _this.parent)
        each(_this, function (value, key) {
          if (isFn$2(value) && !key.includes('x-')) return
          if (key === 'parent' || key === 'root') return
          if (!SchemaNestedMap[key]) {
            schema[key] = value ? compile(value, scope) : value
          } else {
            schema[key] = value ? shallowCompile(value, scope) : value
          }
        })
        return schema
      }
      this.fromJSON = function (json) {
        if (!json) return _this
        if (Schema.isSchemaInstance(json)) return json
        each(reducePatches(json), function (value, key) {
          if (isFn$2(value) && !key.includes('x-')) return
          if (key === 'properties') {
            _this.setProperties(value)
          } else if (key === 'patternProperties') {
            _this.setPatternProperties(value)
          } else if (key === 'additionalProperties') {
            _this.setAdditionalProperties(value)
          } else if (key === 'items') {
            _this.setItems(value)
          } else if (key === 'additionalItems') {
            _this.setAdditionalItems(value)
          } else if (key === '$ref') {
            _this.fromJSON(_this.findDefinitions(value))
          } else {
            _this[key] = value
          }
        })
        return _this
      }
      this.toJSON = function (recursion) {
        if (recursion === void 0) {
          recursion = true
        }
        var results = {}
        each(_this, function (value, key) {
          var _a, _b
          if (
            (isFn$2(value) && !key.includes('x-')) ||
            key === 'parent' ||
            key === 'root'
          )
            return
          if (key === 'properties' || key === 'patternProperties') {
            if (!recursion) return
            results[key] = map(value, function (item) {
              var _a
              return (_a = item === null || item === void 0 ? void 0 : item.toJSON) ===
                null || _a === void 0
                ? void 0
                : _a.call(item)
            })
          } else if (key === 'additionalProperties' || key === 'additionalItems') {
            if (!recursion) return
            results[key] =
              (_a = value === null || value === void 0 ? void 0 : value.toJSON) ===
                null || _a === void 0
                ? void 0
                : _a.call(value)
          } else if (key === 'items') {
            if (!recursion) return
            if (Array.isArray(value)) {
              results[key] = value.map(function (item) {
                var _a
                return (_a = item === null || item === void 0 ? void 0 : item.toJSON) ===
                  null || _a === void 0
                  ? void 0
                  : _a.call(item)
              })
            } else {
              results[key] =
                (_b = value === null || value === void 0 ? void 0 : value.toJSON) ===
                  null || _b === void 0
                  ? void 0
                  : _b.call(value)
            }
          } else {
            results[key] = value
          }
        })
        return results
      }
      this.toFieldProps = function (options) {
        return transformFieldProps(_this, options)
      }
      if (parent) {
        this.parent = parent
        this.root = parent.root
      } else {
        this.root = this
      }
      return this.fromJSON(json)
    }
    Schema.getOrderProperties = function (schema, propertiesName) {
      if (schema === void 0) {
        schema = {}
      }
      if (propertiesName === void 0) {
        propertiesName = 'properties'
      }
      var orderProperties = []
      var unorderProperties = []
      for (var key in schema[propertiesName]) {
        var item = schema[propertiesName][key]
        var index = item['x-index']
        if (!isNaN(index)) {
          orderProperties[index] = { schema: item, key: key }
        } else {
          unorderProperties.push({ schema: item, key: key })
        }
      }
      return orderProperties.concat(unorderProperties).filter(function (item) {
        return !!item
      })
    }
    Schema.compile = function (expression, scope) {
      return compile(expression, scope)
    }
    Schema.shallowCompile = function (expression, scope) {
      return shallowCompile(expression, scope)
    }
    Schema.isSchemaInstance = function (value) {
      return instOf(value, Schema)
    }
    Schema.registerCompiler = registerCompiler
    Schema.registerPatches = registerPatches
    Schema.registerVoidComponents = registerVoidComponents
    Schema.registerTypeDefaultComponents = registerTypeDefaultComponents
    Schema.registerPolyfills = registerPolyfills
    Schema.enablePolyfills = enablePolyfills
    Schema.silent = silent
    return Schema
  })()

  function recursiveField(form, schema, basePath, name) {
    var fieldSchema = new Schema(schema)
    var fieldProps = fieldSchema.toFieldProps()
    function recursiveProperties(propBasePath) {
      fieldSchema.mapProperties(function (propSchema, propName) {
        recursiveField(form, propSchema, propBasePath, propName)
      })
    }
    if (name === undefined || name === null) {
      recursiveProperties(basePath)
      return
    }
    if (schema.type === 'object') {
      var field = form.createObjectField(
        __assign$7(__assign$7({}, fieldProps), { name: name, basePath: basePath }),
      )
      recursiveProperties(field.address.toString())
    } else if (schema.type === 'array') {
      var field = form.createArrayField(
        __assign$7(__assign$7({}, fieldProps), { name: name, basePath: basePath }),
      )
      var fieldAddress_1 = field.address.toString()
      var fieldValues = form.getValuesIn(fieldAddress_1)
      fieldValues.forEach(function (value, index) {
        if (schema.items) {
          var itemsSchema = Array.isArray(schema.items)
            ? schema.items[index] || schema.items[0]
            : schema.items
          recursiveField(form, itemsSchema, fieldAddress_1, index)
        }
      })
    } else if (schema.type === 'void') {
      var field = form.createVoidField(
        __assign$7(__assign$7({}, fieldProps), { name: name, basePath: basePath }),
      )
      recursiveProperties(field.address.toString())
    } else {
      form.createField(
        __assign$7(__assign$7({}, fieldProps), { name: name, basePath: basePath }),
      )
    }
  }
  var validateOnServer = function (schema, values) {
    var form = createForm({
      values: values,
    })
    recursiveField(form, schema)
    return form.validate()
  }

  exports.Schema = Schema
  exports.validateOnServer = validateOnServer

  Object.defineProperty(exports, '__esModule', { value: true })
})
//# sourceMappingURL=formily.json-schema.umd.development.js.map
