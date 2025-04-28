import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技主目标伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['单体伤害'], 'e')
}, {
  title: '战技相邻目标伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['相邻目标伤害'], 'e')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '天赋追击单次伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['追加攻击单次伤害'], 't')
}, {
  check: ({ cons }) => cons >= 2,
  title: '2魂追加生命恢复',
  dmg: ({ attr, calc }, { heal }) => heal(calc(attr.hp) * 5 / 100)
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
  {
    check: ({ params }) => params.technique >= 1,
    title: '雪衣秘技：[****] 进入战斗后对敌方全体造成量子属性伤害。'
  }, {
    title: '雪衣技能：[天罚贯身] 通过削减韧性,终结技造成的伤害提高[qDmg]%',
    data: {
      qDmg: ({ talent }) => talent.q['伤害提高上限']
    }
  }, {
    title: '雪衣行迹：[慢捻抹复挑] 使自身造成的伤害提高[dmg]%',
    sort: 9,
    tree: 1,
    data: {
      dmg: ({ calc, attr }) => Math.min(240, calc(attr.stance))
    }
  }, {
    title: '雪衣行迹：[摧锋轴承] 如果敌方目标当前韧性大于等于其自身韧性上限的50%，施放终结技时造成的伤害提高[dmg]%',
    tree: 2,
    data: {
      qDmg: 10
    }
  }, {
    title: '雪衣1魂：[缚心魔] 天赋的追加攻击造成的伤害提高[tDmg]%',
    cons: 1,
    data: {
      tDmg: 20
    }
  }, {
    title: '雪衣4魂：[断业根] 施放终结技时,击破特攻提高[stance]%',
    cons: 4,
    data: {
      stance: 40
    }
  },
  { title: '1.5最后修改：[12.28重置] 增加排名规则' }
]
