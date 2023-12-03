export const details = [{
  title: '白玉萝卜伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['白玉萝卜伤害'], 'e')
}, {
  title: '白玉萝卜-蔓激化',
  dmg: ({ talent }, dmg) => dmg(talent.e['白玉萝卜伤害'], 'e', '蔓激化')
},{
  title: '桂子仙机白玉萝卜伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q')
},{
  title: '桂子仙机萝卜-蔓激化',
  dmg: ({ talent }, dmg) => dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q', '蔓激化')
},{
  title: '玉颗珊珊月中落伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '白玉萝卜每跳治疗',
  dmg: ({ talent, calc, attr }, { heal }) =>
    heal(talent.e['白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.e['白玉萝卜治疗量2'][1])
}, {
  title: '桂子仙机萝卜每跳治疗',
  dmg: ({ talent, calc, attr }, { heal }) =>
    heal(talent.q['桂子仙机白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.q['桂子仙机白玉萝卜治疗量2'][1])
}, {
  title: '萝卜炸裂天赋治疗',
  dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.hp) * 0.8 / 100)
}, {
  title: '6命大萝卜治疗',
  cons: 6,
  dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.hp) * 7.5 / 100)
}]

export const defParams = { soda: 1 }
export const defDmgIdx = 6
export const mainAttr = 'atk,hp,cpct,cdmg,mastery'

export const buffs = [{
  title: '瑶瑶1命：萝卜炸裂获得15%草伤加成',
  cons: 1,
  data: {
    dmg: 15
  }
}, {
  title: '瑶瑶4命：释放E或Q后，提升元素精通[mastery]点',
  cons: 4,
  data: {
    mastery: ({ calc, attr }) => calc(attr.hp) * 0.3 / 100
  }
},
 {title: '4.4最后修改：如有问题可联系1142607614反馈'}
 ]
