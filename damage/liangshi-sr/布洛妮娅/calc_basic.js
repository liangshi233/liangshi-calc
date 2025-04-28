import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技Buff加伤',
  dmg: ({ talent }) => {
    return {
      avg: Format.percent(talent.e['伤害提高']),
      type: 'text'
    }
  }
}, {
  title: '终结技Buff攻击力提高',
  dmg: ({ talent }) => {
    return {
      avg: Format.percent(talent.q['攻击力提高']),
      type: 'text'
    }
  }
}, {
  title: '终结技Buff爆伤提高',
  dmgKey: 'dmg',
  dmg: ({ attr, calc, talent }) => {
    return {
      avg: Format.percent(calc(attr.cdmg) * talent.q['百分比暴伤'] / 100 + talent.q['固定暴伤']),
      type: 'text'
    }
  }
}]

export const defDmgKey = 'dmg'
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
  {
    check: ({ params }) => params.technique >= 1,
    title: '布洛妮娅秘技：[在旗帜下] 战斗开始时我方全体攻击力提高[atkPct]%。',
    data: {
      atkPct: 15
    }
  }, {
    title: '行迹-号令：普通攻击暴击率提高至[aCpct]%',
    tree: 1,
    data: {
      aCpct: 100
    }
  }, {
    title: '行迹-****：布洛妮娅在场时，我方全体造成的伤害提高10%',
    check: ({ trees }) => trees[103],
    data: {
      dmg: 10
    }
  },
  { title: '2.23最后修改：如有问题请输入 #伤害计算反馈' }
]
