import CharCfg from '../../miao-plugin/models/character/CharCfg.js'
import ProfileDmg from '../../miao-plugin/models/ProfileDmg.js'
import Common from '../../miao-plugin/components/Common.js'
import _CharCfg from '../replace/CharCfg.js'
import LSconfig from './LSconfig.js'
import fs from 'node:fs'

const cfg = LSconfig.getConfig('user', 'config')

const LSstart = {
  start(set = false) {
    if (!cfg.calcLiang && !set) return
    if (!this._dmgRulePath) {
      this._dmgRulePath = ProfileDmg.dmgRulePath
      this._getCalcRule = CharCfg.getCalcRule
      this._getArtisCfg = CharCfg.getArtisCfg
    }
    ProfileDmg.dmgRulePath = (name, game = 'gs') => {
      const _path = process.cwd()
      let dmgFile = [
        { file: 'calc_user', name: '自定义伤害' },
        { file: 'calc_li', name: 'liangshicalc 大爷', test: () => cfg.calcLi },
        //    { file: 'calc_liangshiK', name: 'liangshicalc 开发' , test: () => Common.cfg('calcLiangK') },
        //    { file: 'calc_liangshiT', name: 'liangshicalc 组队' , test: () => Common.cfg('calcLiangT') },
        //    { file: 'calc_liangshiJ', name: 'liangshicalc 极简' , test: () => Common.cfg('calcLiangJ') },
        { file: 'calc_liangshiQ', name: 'liangshicalc 超全', test: () => cfg.calcLiangQ },
        { file: 'calc_liangshi', name: 'liangshicalc 基础', test: () => cfg.calcLiang },
        { file: 'calc_auto', name: '组团伤害', test: () => Common.cfg('teamCalc') },
        { file: 'calc', name: '喵喵' }
      ]
      for (let ds of dmgFile) {
        let path = `${_path}/plugins/miao-plugin/resources/meta-${game}/character/${name}/${ds.file}.js`
        if (cfg.calcLiang || cfg.calcLiangQ) {
          path = `${_path}/plugins/liangshi-calc/damage/meta-${game}/${name}/${ds.file}.js`
          if (!fs.existsSync(path)) {
            path = `${_path}/plugins/miao-plugin/resources/meta-${game}/character/${name}/${ds.file}.js`
          }
        }
        if (ds.test && !ds.test()) {
          continue
        }
        if (fs.existsSync(path)) {
          return { path, createdBy: ds.name }
        }
      }
      return false
    }
    CharCfg.getCalcRule = _CharCfg.getCalcRule
    CharCfg.getArtisCfg = _CharCfg.getArtisCfg
  },
  stop() {
    if (this._dmgRulePath && this._getCalcRule && this._getArtisCfg) {
      ProfileDmg.dmgRulePath = this._dmgRulePath
      CharCfg.getCalcRule = this._getCalcRule
      CharCfg.getArtisCfg = this._getArtisCfg
    }
  }
}

export default LSstart