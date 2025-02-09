import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '重击循环伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2', 'phy')
}, {
  title: '热情拂扫伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['挥舞伤害'], 'e')
}, {
  title: '热情拂扫蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.e['挥舞伤害'], 'e', 'vaporize')
}, {
  title: '热情拂扫融化',
  dmg: ({ talent }, dmg) => dmg(talent.e['挥舞伤害'], 'e', 'melt')
}, {
  title: '热情拂扫冲击波伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['持续伤害'], 'e')
}, {
  title: '热情拂扫冲击波蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.e['持续伤害'], 'e', 'vaporize')
}, {
  title: '热情拂扫冲击波融化',
  dmg: ({ talent }, dmg) => dmg(talent.e['持续伤害'], 'e', 'melt')
}, {
  title: '三级护盾量',
  dmg: ({ talent, calc, attr }, { shield }) =>
    shield(talent.e['三级护盾吸收量2'][0] * calc(attr.def) / 100 + talent.e['三级护盾吸收量2'][1] * 1)
}, {
  title: '叛逆刮弦释放伤害',
  params: { qbj: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'phy')
}, {
  title: '叛逆刮弦持续伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['火元素持续伤害'], 'q')
}]

export const defDmgIdx = 7
export const mainAttr = 'atk,def,cpct,cdmg'
export const enemyName = '魔偶/女士/雷神/丘丘'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '辛焱天赋2：处于护盾下物理伤害提高15%',
    data: {
      phy: 15
    }
  }, {
    title: '辛焱2命：Q的暴击率提升100%',
    cons: 2,
    data: {
      qCpct: ({ params, talent }) => params.qbj ? 100 : 0
    }
  }, {
    title: '辛焱4命：E造成伤害使敌人物理抗性降低15%',
    cons: 4,
    data: {
      phyKx: 15
    }
  },
  { title: '9.23最后修改：如有问题请输入 #伤害计算反馈' }
]
