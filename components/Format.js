import lodash from 'lodash'
import Elem from './common/Elem.js'
import { Cfg } from '../components/index.js'

let Format = {
  ...Elem,
  int: function (d) {
    return parseInt(d)
  },
  comma: function (num, fix = 0) {
    num = parseFloat((num * 1).toFixed(fix))
    let [integer, decimal] = String.prototype.split.call(num, '.')
    let re = new RegExp(`\\d(?=(\\d{${Cfg.get('commaGroup', 3)}})+$)`, 'g')
    integer = integer.replace(re, '$&,') // 正则先行断言 = /\d(?=(\d{3})+$)/g
    return `${integer}${fix > 0 ? '.' + (decimal || lodash.repeat('0', fix)) : ''}`
  },
  pct: function (num, fix = 1) {
    return (num * 1).toFixed(fix) + '%'
  },
  percent: function (num, fix = 1) {
    return Format.pct(num * 100, fix)
  },
  number: function (num, fix = 3) {
    return (num * 1).toFixed(fix)
  }
}

export default Format
