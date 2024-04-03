import { Data, LSconfig } from '#liangshi'
//import Base from '../Base.js'
import lodash from 'lodash'
import fs from 'node:fs'

const cfgL = LSconfig.getConfig('user', 'config')

let game = 'gs'; //星铁的评分似乎没有人做,看后续有没有人有需求再弄吧
let charPath = `${process.cwd()}/plugins/miao-plugin/resources/meta-${game}/character`;
if (cfgL.artisLiang || cfgL.artisLiangZ) {
  charPath = `${process.cwd()}/plugins/liangshi-calc/damage/meta-${game}`;
}

let cfgMap = {
  char: {},
  async init() {
    let chars = fs.readdirSync(charPath)
    for (let char of chars) {
      cfgMap.char[char] = {}
      let curr = cfgMap.char[char]
      // 评分规则
      if (cfgMap.exists(char, 'artis_user')) {
        curr.artis = await cfgMap.getCfg(char, 'artis_user', 'default')
      } else if (cfgMap.exists(char, 'artis_li') && cfgL.artisLi) {
        curr.artis = await cfgMap.getCfg(char, 'artis_li', 'default')
      } else if (cfgMap.exists(char, 'artis_liangshiZ') && cfgL.artisLiangZ) {
        curr.artis = await cfgMap.getCfg(char, 'artis_liangshiZ', 'default')
      } else if (cfgMap.exists(char, 'artis_liangshi') && cfgL.artisLiang) {
        curr.artis = await cfgMap.getCfg(char, 'artis_liangshi', 'default')
      } else if (cfgMap.exists(char, 'artis')) {
        curr.artis = await cfgMap.getCfg(char, 'artis', 'default')
      }
      // 伤害计算
      if (cfgMap.exists(char, 'calc_user')) {
        curr.calc = await cfgMap.getCfg(char, 'calc_user')
        //      } else if (cfgMap.exists(char, 'calc_liangshiK') && Common.cfg('calcLiangK')) {
        //        curr.calc = await cfgMap.getCfg(char, 'calc_liangshiK')
      } else if (cfgMap.exists(char, 'calc_li') && cfgL.calcLi) {
        curr.calc = await cfgMap.getCfg(char, 'calc_li')
      } else if (cfgMap.exists(char, 'calc_liangshiQ') && cfgL.calcLiangQ) {
        curr.calc = await cfgMap.getCfg(char, 'calc_liangshiQ')
        //      } else if (cfgMap.exists(char, 'calc_liangshiJ') && Common.cfg('calcLiangJ')) {
        //        curr.calc = await cfgMap.getCfg(char, 'calc_liangshiJ')
        //      } else if (cfgMap.exists(char, 'calc_liangshiT') && Common.cfg('calcLiangT')) {
        //        curr.calc = await cfgMap.getCfg(char, 'calc_liangshiT')
      } else if (cfgMap.exists(char, 'calc_liangshi') && cfgL.calcLiang) {
        curr.calc = await cfgMap.getCfg(char, 'calc_liangshi')
      } else if (cfgMap.exists(char, 'calc')) {
        curr.calc = await cfgMap.getCfg(char, 'calc')
      }
    }
  },
  exists(char, file) {
    return fs.existsSync(`${charPath}/${char}/${file}.js`)
  },
  async getCfg(char, file, module = '', game = 'gs') {
    let cfg = await Data.importModule(`resources/meta-${game}/character/${char}/${file}.js`, 'miao')
    if (cfgL.artisLiang || cfgL.artisLiangZ) {
      cfg = await Data.importModule(`damage/meta-${game}/${char}/${file}.js`)
    }
    if (module) {
      return cfg[module]
    }
    return cfg
  }
}
await cfgMap.init()

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
    return cfgMap.char[char.isTraveler ? '旅行者' : char.name]?.artis || false
  }
}
export default CharCfg
