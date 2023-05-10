export const details = [ {
  title: '护心铠启动伤害',
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.e['技能伤害'] * calc(attr.def) / 100 + (attr.e.plus || 0)
    return basic(ret, 'e')
  }
},{
  title: '护心铠盾量',
  dmg: ({ talent, calc, attr }, { shield }) =>
    shield((talent.e['吸收量2'][0] * calc(attr.def) / 100 + talent.e['吸收量2'][1] * 1) * 1.5)
}, {
  title: '护心铠单次治疗',
  dmg: ({ talent, calc, attr }, { heal }) =>
    heal(talent.e['治疗量2'][0] * calc(attr.def) / 100 + talent.e['治疗量2'][1] * 1)
}, {
  title: '开Q尾刀',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
}, {
  title: '开Q重击',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2')
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,def,cpct,cdmg'

export const buffs = [{
  title: '元素爆发：诺艾尔开Q基于防御力提高攻击力[atkPlus]',
  data: {
    atkPlus: ({ attr, calc, talent }) => talent.q['攻击力提高'] * calc(attr.def) / 100
  }
}, {
  title: '诺艾尔6命：诺艾尔开Q基于防御力提高攻击力[atkPlus]',
  cons: 6,
  data: {
    atkPlus: ({ attr, calc, talent }) => calc(attr.def) * 0.5
  }
},
 {title: '4.4最后修改：如有问题可联系1142607614反馈'}
]
