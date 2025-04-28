import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [
  {
    title: '普攻伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
  }, {
    title: '0负面战技伤害',
    params: { debuff: 0, e: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: '3负面战技伤害',
    params: { debuff: 3, e: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: '6负面战技伤害',
    params: { debuff: 6, e: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: '终结技伤害',
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: '0负面天赋追加伤害',
    params: { debuff: 0 },
    dmg: ({ talent }, dmg) => dmg(talent.t['追加攻击伤害'], 't')
  }, {
    title: '3负面天赋追加伤害',
    params: { debuff: 3 },
    dmg: ({ talent, cons, params }, dmg) => {
      let cons2 = cons * 1 >= 2 ? (0.2 * params.debuff) : 0
      let tdmg = talent.t['追加攻击伤害'] + cons2
      return dmg(tdmg, 't')
    }
  }, {
    title: '6负面天赋追加伤害',
    params: { debuff: 6 },
    dmg: ({ talent, cons, params }, dmg) => {
      let cons2 = cons * 1 >= 2 ? (0.2 * params.debuff) : 0
      let tdmg = talent.t['追加攻击伤害'] + cons2
      return dmg(tdmg, 't')
    }
  }
]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { debuff: 5, technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
  {
    check: ({ params }) => params.technique >= 1,
    title: '真理医生秘技：[****] 处于特殊领域内的敌人进入战斗后，使敌方每个单体目标速度降低[_enemySpeed]%。',
    data: {
      _enemySpeed: 15
    }
  }, {
    check: ({ params }) => params.e === true,
    title: '真理医生行迹：[归纳] 施放战技时,目标有[_debuff]个负面效果,暴击率提高[eCpct]%,暴击伤害提高[eCdmg]%',
    tree: 1,
    data: {
      _debuff: ({ params }) => params.debuff,
      eCpct: ({ params }) => Math.min(params.debuff * 2.5, 15),
      eCdmg: ({ params }) => Math.min(params.debuff * 5, 30)
    }
  }, {
    title: '真理医生行迹：[推理] 造成伤害时,目标有[_debuff]个负面效果,造成的伤害提高[dmg]%',
    tree: 2,
    data: {
      _debuff: ({ params }) => params.debuff,
      dmg: ({ params }) => (params.debuff >= 3 ? (Math.min(params.debuff * 10, 50)) : 0)
    }
  }, {
    check: ({ params }) => params.e === true,
    title: '真理医生1魂：[倨傲生****] 行迹【归纳】的叠加层数上限提高,使施放战技时暴击率提高[eCpct]%,暴击伤害提高[eCdmg]%',
    cons: 1,
    data: {
      eCpct: 2.5 * 4,
      eCdmg: 5 * 4
    }
  }, {
    title: '真理医生2魂：[显微而阐幽] 天赋的追加攻击击中目标时，额外造成虚数属性附加伤害',
    cons: 2
  }, {
    title: '真理医生4魂：[盲目造****] 触发天赋时，额外恢复[_energyevery]点能量。',
    cons: 4,
    data: {
      _energyevery: 15
    }
  }, {
    title: '真理医生6魂：[永恒****] 天赋的追加攻击造成的伤害提高[tDmg]%',
    cons: 6,
    data: {
      tDmg: 50
    }
  },
  { title: '1.31最后修改：[12.28重置]' }
]
