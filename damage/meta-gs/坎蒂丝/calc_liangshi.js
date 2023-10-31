export const details = [{
  title: '苍鹭庇卫护盾吸收',
  dmg: ({ attr, calc, talent }, { shield }) =>
    shield(calc(attr.hp) * talent.e['护盾吸收量2'][0] / 100 + talent.e['护盾吸收量2'][1])
}, {
  title: '蓄力苍鹭庇卫伤害',
  dmg: ({ calc, attr, talent }, { basic }) => basic(calc(attr.hp) * talent.e['蓄力完成伤害'] / 100, 'e')
}, {
  title: '蓄力苍鹭庇卫蒸发',
  dmg: ({ calc, attr, talent }, { basic }) => basic(calc(attr.hp) * talent.e['蓄力完成伤害'] / 100, 'e', 'vaporize')
}, {
  title: '灰鸰衒潮伤害',
  dmg: ({ calc, attr, talent }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
},{
  title: '水波冲击伤害',
  dmg: ({ calc, attr, talent }, { basic }) => basic(calc(attr.hp) * talent.q['水波冲击伤害'] / 100, 'q')
},{
  title: '水波冲击蒸发伤害',
  dmg: ({ calc, attr, talent }, { basic }) => basic(calc(attr.hp) * talent.q['水波冲击伤害'] / 100, 'q', 'vaporize')
},{
  title: 'Q提升普攻伤害',
  dmg: ({ attr, calc }) => {
    return {
      avg: 20 + Math.floor(calc(attr.hp) / 1000) * 0.5,
      unit: '%'
    }
  }
}]

export const defDmgIdx = 5
export const mainAttr = 'hp,atk,cpct,cdmg'

export const buffs = [{
  title: '坎蒂丝2命：E命中敌人提升20%生命值',
  cons: 2,
  data: {
    hpPct: 20
  }
}, {
  title: '坎蒂丝天赋：Q伤害加成基于生命值上限提升[_a]%',
  data: {
    _a: ({ attr, calc }) => Math.floor(calc(attr.hp) / 1000) * 0.5
  }
},
 {title: '9.23最后修改：如有问题可联系1142607614反馈'}
 ]
