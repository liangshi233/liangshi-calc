export const details = [{
  title: '重击蓄力·诉论心证伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.a['重击·衡平推裁持续伤害'] / 100, 'a2')
}, {
  title: '泪水啊，我必偿还伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
}, {
  title: '泪水啊，我必偿还蒸发',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
}, {
  title: '潮水啊，我已归来伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
}, {
  title: '潮水啊，我已归来蒸发',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
}, {
  title: 'Q水爆伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['水瀑伤害'] / 100, 'q')
}, {
  title: 'Q水爆蒸发',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['水瀑伤害'] / 100, 'q', 'vaporize')
}]

export const defDmgIdx = 5
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'



export const buffs = [{
  passive: 1,
  title: '那维莱特天赋1：触发元素反应3层重击伤害提升至160%',
  data: {
    a2Multi: 60
  }
}, {
  passive: 2,
  title: '那维莱特天赋2：基于生命值超过30%的部分提升至多[dmg]%水伤加成',
  data: {
    dmg: 30
  }
}, {
  title: '那维莱特2命：触发元素反应3层重击爆伤提升42%',
  cons: 2,
  data: {
    a2Cdmg: 42
  }
},
 {title: '8.16最后修改：如有问题可联系1142607614反馈'}
]
