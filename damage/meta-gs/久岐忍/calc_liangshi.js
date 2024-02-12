export const details = [{
  title: '超绽放伤害',
  dmg: ({ calc, attr }, { reaction }) => {
    return reaction('hyperBloom')
  }
},{
  title: 'E释放伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: 'E每跳伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['越祓草轮伤害'], 'e')
},  {
  title: 'E每跳超激化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['越祓草轮伤害'], 'e', '超激化')
},{
  title: 'E每跳治疗',
  dmg: ({ talent, calc, attr }, { heal }) => {
    let ec = talent.e['越祓草轮治疗量2']
    return heal(calc(attr.hp) * ec[0] / 100 + ec[1] * 1 + calc(attr.mastery) * 0.75)
  }
}, {
  title: 'Q每跳伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['单次伤害'] * calc(attr.hp) / 100, 'q')
}]

export const defParams = { soda: 1 }
export const defDmgIdx = 2
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [{
  title: '久岐忍天赋1：生命低于50%时提高治疗加成15%',
  data: {
    heal: 15
  }
}, {
  title: '久岐忍天赋2：基于元素精通提高治疗量[healNum]，伤害[ePlus]',
  data: {
    healNum: ({ attr, calc }) => calc(attr.mastery) * 0.75,
    ePlus: ({ attr, calc }) => calc(attr.mastery) * 0.25
  }
},
 {title: '3.1最后修改：如有问题请输入 #伤害计算反馈'}
]
