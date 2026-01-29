import CharCfg from '../../miao-plugin/models/character/CharCfg.js'
import ProfileDmg from '../../miao-plugin/models/ProfileDmg.js'
import Common from '../../miao-plugin/components/Common.js'
import _CharCfg from '../replace/CharCfg.js'
import LSconfig from './LSconfig.js'
import fs from 'node:fs'

const cfg = LSconfig.getConfig('user', 'config')

const LSstart = {
  init () {
    ProfileDmg.dmgRulePath = (name, game = 'gs') => {
      const _path = process.cwd()
      let dmgFile = [
        { file: 'calc_user', name: '自定义伤害' },
        { file: 'calc_develop', name: 'liangshicalc 开发' , test: () => cfg.calcLiangK },
        { file: 'calc_complete', name: 'liangshicalc 超全', test: () => cfg.calcLiangQ },
        { file: 'calc_team', name: 'liangshicalc 队伍', test: () => cfg.calcLiangT },
        { file: 'calc_concise', name: 'liangshicalc 极简' , test: () => cfg.calcLiangJ },
        { file: 'calc_basic', name: 'liangshicalc', test: () => cfg.calcLiang },
        { file: 'calc_auto', name: 'miao-plugin 组团', test: () => Common?.cfg('teamCalc') },
        { file: 'calc', name: 'miao-plugin' }
      ]
      // 兼容处理星铁主角的情况
      let newName = name
      let tbReg = /^(星|穹)·/
      if (tbReg.test(newName)) newName = newName.replace(tbReg, '开拓者')
      let calcmodel = cfg.calcmodel
      for (let ds of dmgFile) {
        let path = `${_path}/plugins/miao-plugin/resources/meta-${game}/character/${name}/${ds.file}.js`
        if ((cfg.calcLiang || cfg.calcLiangQ || cfg.calcLiangJ || cfg.calcLiangT || cfg.calcLiangN || cfg.calcLiangK) && !cfg.GsDisabled) {
            path = `${_path}/plugins/liangshi-calc/damage/${calcmodel}-${game}/${newName}/${ds.file}.js`
          if (!fs.existsSync(path)) {
            path = `${_path}/plugins/liangshi-calc/damage/liangshi-${game}/${newName}/${ds.file}.js`
          }
          if (!fs.existsSync(path)) {
            path = `${_path}/plugins/miao-plugin/resources/meta-${game}/character/${name}/${ds.file}.js`
          }
        }
        if (game == "sr" && cfg.SrDisabled) {
          path = `${_path}/plugins/miao-plugin/resources/meta-sr/character/${name}/${ds.file}.js`
        }
        if (ds.test && !ds.test()) {
          continue
        }
        if (fs.existsSync(path)) {
          return { path, createdBy: ds.name }
        }
      }
      let path = `${_path}/plugins/liangshi-calc/damage/${calcmodel}-${game}/calc_basic.js`
      if (fs.existsSync(path)) {
        return { path, createdBy: `${calcmodel} 通用` }
      } else {
        path = `${_path}/plugins/liangshi-calc/damage/calc_basic_${game}.js`
        if (fs.existsSync(path)) {
          return { path, createdBy: "liangshicalc 通用" }
        } else {
          return false
        }
      }
      return false
    }
    CharCfg.getCalcRule = _CharCfg.getCalcRule
    CharCfg.getArtisCfg = _CharCfg.getArtisCfg
  }
}

export default LSstart
