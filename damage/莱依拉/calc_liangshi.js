export const details = [{
  title: '满层E护盾量',
  dmg: ({ attr, calc, talent }, { shield }) =>
    shield(calc(attr.hp) * talent.e['护盾基础吸收量2'][0] / 100 + talent.e['护盾基础吸收量2'][1])
}, {
  title: '护盾展开伤害',
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '单个飞星伤害',
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['飞星伤害'], 'e')
}, {
  title: '单个飞星融化伤害',
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['飞星伤害'], 'e', 'melt')
}, {
  title: '星光弹伤害',
  dmg: ({ attr, calc, talent }, { basic }) => basic(calc(attr.hp) * talent.q['星光弹伤害'] / 100)
}, {
  title: '星光弹融化伤害',
  dmg: ({ attr, calc, talent }, { basic }) => basic(calc(attr.hp) * talent.q['星光弹伤害'] / 100, 'q', 'melt')
}]

export const defDmgIdx = 0
export const mainAttr = 'hp,atk,cpct,cdmg'

export const buffs = [{
  title: '莱依拉1命：安眠帷幕护盾的伤害吸收量提高20%',
  cons: 1,
  data: {
    shield: 20
  }
}, {
  title: '莱依拉6命：飞星与星光弹造成的伤害提升40%',
  cons: 6,
  data: {
    eDmg: 40,
    qDmg: 40
  }
}, {
  title: '莱依拉天赋1：满层护盾强效提升24%',
  data: {
    shield: 24
  }
}, {
  title: '莱依拉天赋2：飞星造成的伤害值基于生命值提高[ePlus]',
  data: {
    ePlus: ({ attr, calc }) => calc(attr.hp) * 0.015
  }
},
 {title: '4.4最后修改：如有问题可联系1142607614反馈'}
]
