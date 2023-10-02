export const details = [{
  check: ({ cons }) => cons < 1,
  title: '重击单段伤害 零层',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.a['重击·衡平推裁持续伤害'] / 100 , 'a2')
}, {
  title: '重击单段伤害 一层',
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * 1.1, 'a2')
}, {
  title: '重击单段伤害 二层',
  params: { bs: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * 1.25, 'a2')
}, {
  check: ({ cons }) => cons >= 1,
  title: '重击单段伤害 三层',
  params: { bs: true , zbs: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(talent.a['重击·衡平推裁持续伤害'] * calc(attr.hp) / 100 * 1.6, 'a2')
}, {
  title: '重击蓄力 3秒',
  params: { bs: true , zbs: true },
  dmg: ({ talent, calc, attr , cons }, { basic }) => {
  const a2Multi = cons >= 1 ? 1.6 : 1.25
  return basic(a2Multi * calc(attr.hp) * talent.a['重击·衡平推裁持续伤害'] / 100 * 8 , 'a2')
  }
}, {
  title: '泪水啊，我必偿还伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
}, {
  title: '潮水啊，我已归来伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
}, {
  title: 'Q水爆伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['水瀑伤害'] / 100, 'q')
}, {
  title: 'Q总伤害',
  dmg: ({ talent, attr, calc }, { basic }) => {
    const td = talent.q['技能伤害'] + talent.q['水瀑伤害'] * 2
    return basic(td * calc(attr.hp) / 100, 'q')
  }
}, {
  title: '满水滴一轮重击总伤害',
  params: { bs: true , zbs: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    const count = cons >= 6 ? 30 : 8
    const td = talent.a['重击·衡平推裁持续伤害'] * count
    const extraTd = cons >= 6 ? 20 * 6 : 0
    return basic((td + extraTd) * calc(attr.hp) / 100, 'a2')
    const a2Multi = cons >= 1 ? 1.6 : 1.25
    return basic(a2Multi * (td + extraTd) * calc(attr.hp) / 100, 'a2')
  }
}]

export const defDmgIdx = 4
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'



export const buffs = [{
  title: '那维莱特天赋2：基于生命值超过30%的部分提升至多[dmg]%水伤加成',
  data: {
    dmg: 30
  }
}, {
  title: '那维莱特2命：基础重击爆伤提升14%',
  cons: 2,
  data: {
    a2Cdmg: 14
  }
}, {
  title: '那维莱特2命：触发元素反应一层重击爆伤额外提升14%',
  cons: 2,
  data: {
    a2Cdmg: ({ params }) => params.bs ? 14 : 0
  }
}, {
  title: '那维莱特2命：触发元素反应二层重击爆伤额外提升14%',
  cons: 2,
  data: {
   a2Cdmg: ({ params }) => params.zbs ? 14 : 0
  }
},{title: '10.3最后修改：如有问题可联系1142607614反馈'}
]