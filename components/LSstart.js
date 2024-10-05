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
        { file: 'calc_li', name: '大爷', test: () => cfg.calcLi },
        { file: 'calc_liangshiN', name: 'liangshipro 前瞻', test: () => cfg.calcLiangN },
        { file: 'calc_liangshiK', name: 'liangshicalc 开发' , test: () => cfg.calcLiangK },
        //    { file: 'calc_liangshiJ', name: 'liangshicalc 极简' , test: () => cfg.calcLiangJ },
        { file: 'calc_liangshiP', name: 'liangshipro 进阶', test: () => cfg.calcLiangP },
        { file: 'calc_liangshiQ', name: 'liangshicalc 超全', test: () => cfg.calcLiangQ },
        { file: 'calc_liangshiT', name: 'liangshicalc 队伍', test: () => cfg.calcLiangT },
        { file: 'calc_liangshi', name: 'liangshicalc 基础', test: () => cfg.calcLiang },
        { file: 'calc_auto', name: 'miao-plugin 组团', test: () => Common.cfg('teamCalc') },
        { file: 'calc', name: 'miao-plugin 单人' }
      ]
      // 兼容处理星铁主角的情况
      let tbReg = /^(星|穹)·/
      if (tbReg.test(name)) name = name.replace(tbReg, '开拓者')

      for (let ds of dmgFile) {
        let path = `${_path}/plugins/miao-plugin/resources/liangshi-${game}/character/${name}/${ds.file}.js`
        if (cfg.calcLiang || cfg.calcLiangQ) {
          path = `${_path}/plugins/liangshi-calc/damage/liangshi-${game}/${name}/${ds.file}.js`
          if (!fs.existsSync(path)) {
            path = `${_path}/plugins/miao-plugin/resources/meta-${game}/character/${name}/${ds.file}.js`
          }
        }
        if (cfg.calcLiangP) {
          path = `/plugins/liangshi-calc/damage/liangshipro-${game}/${name}/${ds.file}.js`
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
  }
}

export default LSstart
