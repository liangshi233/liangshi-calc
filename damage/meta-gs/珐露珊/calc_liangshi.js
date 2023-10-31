export const details = [{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
}, {
  title: '非想风天伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '风压坍陷伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['风压坍陷风涡伤害'], 'e')
}, {
  title: '开Q提供风系伤害',
  dmg: ({ attr }) => {
    return {
      avg: (attr.atk.base || 0) * 0.32
    }
  }
}, {
  title: '非想风天减抗后抟风秘道伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '扩散反应伤害',
  dmg: ({}, { reaction }) => reaction('swirl')
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [{
  title: '珐露珊6命：Q提升暴击伤害40%',
  cons: 6,
  data: {
    cdmg: 40
  }
}, {
  title: '诡风之祸：降低敌人风抗[kx]%',
  data: {
    kx: ({ talent }) => talent.q['风元素抗性降低']
  }
}, {
  title: '祈风之赐：获得风伤加成[dmg]%',
  data: {
    dmg: ({ talent }) => talent.q['风元素伤害加成']
  }
},
 {title: '4.4最后修改：如有问题可联系1142607614反馈'}
 ]
