import { Data, LSconfig } from '#liangshi'
import { miaoPath, rootPath } from '../../miao-plugin/tools/path.js'
import lodash from 'lodash'
import fs from 'node:fs'

const cfgL = LSconfig.getConfig('user', 'config')
let calcmodel = cfgL.calcmodel

let cfgMap = {
  char: {},
  game: 'gs',
  async init (game = 'gs') {
    this.game = game
    let chars = fs.readdirSync(`${miaoPath}/resources/meta-${game}/character`)
    if (cfgL.calcLiang || cfgL.artisLiang) {
      if (!fs.existsSync(`${rootPath}/plugins/liangshi-calc/damage/${calcmodel}-${game}`)) {
       if (!fs.existsSync(`${rootPath}/plugins/liangshi-calc/damage/liangshi-${game}`)) {
        chars = fs.readdirSync(`${miaoPath}/resources/meta-${game}/character`)
       } else {
        chars = fs.readdirSync(`${rootPath}/plugins/liangshi-calc/damage/liangshi-${game}`)
       }
      } else {
       chars = fs.readdirSync(`${rootPath}/plugins/liangshi-calc/damage/${calcmodel}-${game}`)
      }
    }
    for (let char of chars) {
      cfgMap.char[char] = {}
      let curr = cfgMap.char[char]
      // 评分规则
      if (cfgMap.exists(char, 'artis_user', 'miao')) {
        curr.artis = await cfgMap.getCfg(char, 'artis_user', 'default')
      } else if (cfgMap.exists(char, 'artis_adaptive') && cfgL.artisLiangZ) {
        curr.artis = await cfgMap.getCfg(char, 'artis_adaptive', 'default')
      } else if (cfgMap.exists(char, 'artis_basic') && cfgL.artisLiang) {
        curr.artis = await cfgMap.getCfg(char, 'artis_basic', 'default')
      } else if (cfgMap.exists(char, 'artis', 'miao')) {
        curr.artis = await cfgMap.getCfg(char, 'artis', 'default')
      }
      // 伤害计算
      if (cfgMap.exists(char, 'calc_user', 'miao')) {
        curr.calc = await cfgMap.getCfg(char, 'calc_user')
      } else if (cfgMap.exists(char, 'calc_develop') && cfg.calcLiangK) {
        curr.calc = await cfgMap.getCfg(char, 'calc_develop')
      } else if (cfgMap.exists(char, 'calc_complete') && cfgL.calcLiangQ) {
        curr.calc = await cfgMap.getCfg(char, 'calc_complete')
      } else if (cfgMap.exists(char, 'calc_concise') && cfgL.calcLiangJ) {
        curr.calc = await cfgMap.getCfg(char, 'calc_concise')
      } else if (cfgMap.exists(char, 'calc_team') && cfgL.calcLiangT) {
        curr.calc = await cfgMap.getCfg(char, 'calc_team')
      } else if (cfgMap.exists(char, 'calc_basic') && cfgL.calcLiang) {
        curr.calc = await cfgMap.getCfg(char, 'calc_basic')
      } else if (cfgMap.exists(char, 'calc', 'miao')) {
        curr.calc = await cfgMap.getCfg(char, 'calc')
      }
    }
  },
  exists(char, file, path = '') {
    if (path) return fs.existsSync(`${miaoPath}/resources/meta-${this.game}/character/${char}/${file}.js`)
    return fs.existsSync(`${rootPath}/plugins/liangshi-calc/damage/liangshi-${this.game}/${char}/${file}.js`)
  },
  async getCfg(char, file, module = '') {
    let cfg = await Data.importModule(`resources/meta-${this.game}/character/${char}/${file}.js`, 'miao');
    if (module && cfgL.artisLiang) {
      if (!fs.existsSync(`${rootPath}/plugins/liangshi-calc/damage/${calcmodel}-${this.game}`)) {
       cfg = await Data.importModule(`damage/liangshi-${this.game}/${char}/${file}.js`)
      } else {
       cfg = await Data.importModule(`damage/${calcmodel}-${this.game}/${char}/${file}.js`)
      }
    }
    if (module) return cfg[module]
    return cfg
  }
}
await cfgMap.init('gs')
let cfgMapGs = { ...cfgMap }
await cfgMap.init('sr')
let cfgMapSr = { ...cfgMap }

/**
 * 角色相关配置
 */
let CharCfg = {
  // 获取角色伤害计算相关配置
  getCalcRule(char) {
    let cfg = cfgMap.char[char.isTraveler ? `旅行者/${char.elem}` : char.name]?.calc
    if (!cfg || lodash.isEmpty(cfg)) {
      return false
    }
    return {
      details: cfg.details || false, // 计算详情
      buffs: cfg.buffs || [], // 角色buff
      defParams: cfg.defParams || {}, // 默认参数，一般为空
      defDmgIdx: cfg.defDmgIdx || -1, // 默认详情index
      defDmgKey: cfg.defDmgKey || '',
      mainAttr: cfg.mainAttr || 'atk,cpct,cdmg', // 伤害属性
      enemyName: cfg.enemyName || '小宝' // 敌人名称
    }
  },
  getArtisCfg(char) {
    if (char.game !== 'sr') {
      let charName = char.isTraveler ? "旅行者" : char.name
      return cfgMapGs.char[charName]?.artis || false
    } else {
      return cfgMapSr.char[char.name]?.artis || false
    }
  }
}
export default CharCfg